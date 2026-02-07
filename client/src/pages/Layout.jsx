import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTheme } from "../features/themeSlice";
import { Loader2Icon } from "lucide-react";
import { useUser, SignIn, useAuth, CreateOrganization, useOrganizationList } from "@clerk/clerk-react";
import { fetchWorkspaces } from "../features/workspaceSlice";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const dispatch = useDispatch();
  const { loading = false, workspaces = [] } = useSelector((state) => state.workspace || {});

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  // Check if user has orgs in Clerk (even if DB hasn't synced yet)
  const hasClerkOrgs = isOrgListLoaded && userMemberships?.data?.length > 0;

  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  // Initial load of workspaces
  useEffect(() => {
    if (isLoaded && user) {
      dispatch(fetchWorkspaces({ getToken })).then(() => setHasFetched(true));
    }
  }, [isLoaded, user]);

  // Retry fetching workspaces if user has Clerk orgs but DB returned empty
  // (Inngest sync may still be in progress)
  useEffect(() => {
    if (hasFetched && workspaces.length === 0 && hasClerkOrgs && !loading) {
      const interval = setInterval(() => {
        dispatch(fetchWorkspaces({ getToken }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hasFetched, workspaces.length, hasClerkOrgs, loading]);

  // Wait for Clerk to finish loading session
  if (!isLoaded || !isOrgListLoaded) {
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

  // Still loading workspaces or waiting for Inngest sync
  if (loading || !hasFetched || (workspaces.length === 0 && hasClerkOrgs)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-950 gap-3">
        <Loader2Icon className="w-7 h-7 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-zinc-400">Setting up your workspace...</p>
      </div>
    );
  }

  // Signed in, no workspaces anywhere: show CreateOrganization
  if (workspaces.length === 0) {
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
