import prisma from "../configs/prisma.js";

// Get all workspaces from user
export const getUserWorkspaces = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const workspaces = await prisma.workspace.findMany({
      where: {
        members: { some: { userId } }
      },
      include: {
        members: { include: { user: true } },
        projects: {
          include: {
            tasks: { include: { assignee: true, comments: { include: { user: true } } } },
            members: { include: { user: true } }
          }
        },
        owner: true
      }
    });
    res.json({ workspaces });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

// Add member to workspace
export const addMember = async (req, res) => {
  try {
    const { userId: requesterId } = await req.auth();
    const { email, role: rawRole, workspaceId, message } = req.body;

    // Validate inputs
    if (!email || !workspaceId || !rawRole) {
      return res.status(400).json({ message: "Missing required parameters: email, role, workspaceId" });
    }

    const role = String(rawRole).toUpperCase();
    if (!["ADMIN", "MEMBER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Allowed: ADMIN, MEMBER" });
    }

    // Check if target user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fetch workspace and members
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: { members: true }
    });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // check requester is admin
    const isRequesterAdmin = workspace.members.some(
      (m) => m.userId === requesterId && m.role === "ADMIN"
    );
    if (!isRequesterAdmin) {
      return res.status(403).json({ message: "You do not have admin privileges" });
    }

    // Check if target user is already a member (use user.id)
    const existMember = workspace.members.some((m) => m.userId === user.id);
    if (existMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    const member = await prisma.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId,
        role,
        message
      }
    });

    res.json({ member, message: "Member Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};
