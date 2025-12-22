import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTheme } from "../features/themeSlice";
import { Loader2Icon } from "lucide-react";
import { useUser, SignIn, useAuth, CreateOrganization } from "@clerk/clerk-react";
import { fetchWorkspaces } from "../features/workspaceSlice";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading = false, workspaces = [] } = useSelector((state) => state.workspace || {});

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  // Initial load of workspaces
  useEffect(() => {
    if (isLoaded && user && workspaces.length === 0) {
      dispatch(fetchWorkspaces({ getToken }));
    }
  }, [isLoaded, user]);

  // Wait for Clerk to finish loading session
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <Loader2Icon className="w-7 h-7 animate-spin" />
      </div>
    );
  }

  // Not signed in: show SignIn
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <SignIn />
      </div>
    );
  }

  // Signed in but still no workspaces: show CreateOrganization
  if (user && workspaces.length === 0 ) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CreateOrganization />
      </div>
    );
  }

  // Main layout
  return (
    <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen">
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
