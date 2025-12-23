import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";
import sendEmail from "../configs/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-management" });

// Inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0]?.email_address,
        name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
        image: data?.image_url,
      },
    });
  }
);

// Inngest function to delete user data in db
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id },
    });
  }
);

// Inngest function to update user data in db
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0]?.email_address,
        name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
        image: data?.image_url,
      },
    });
  }
);

// Inngest function to save workspace data to db
const syncWorkspaceCreation = inngest.createFunction(
  { id: "sync-workspace-from-clerk" },
  { event: "clerk/organization.created" },
  async ({ event }) => {
    const { data } = event;
    await prisma.workspace.create({
      data: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        ownerId: data.created_by,
        image_url: data.image_url,
      },
    });

    // Add creator as ADMIN member
    await prisma.workspaceMember.create({
      data: {
        userId: data.created_by,
        workspaceId: data.id, // ✅ corrected below
        role: "ADMIN",
      },
    });
  }
);

// Inngest function to update workspace data in db
const syncWorkspaceUpdation = inngest.createFunction(
  { id: "update-workspace-from-clerk" },
  { event: "clerk/organization.updated" },
  async ({ event }) => {
    const { data } = event;
    await prisma.workspace.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug: data.slug,
        image_url: data.image_url,
      },
    });
  }
);

// Inngest function to delete workspace data in db
const syncWorkspaceDeletion = inngest.createFunction(
  { id: "delete-workspace-from-clerk" },
  { event: "clerk/organization.deleted" },
  async ({ event }) => {
    const { data } = event;
    await prisma.workspace.delete({
      where: { id: data.id },
    });
  }
);

// Inngest function to save workspace member data to db
// const syncWorkspaceMemberCreation = inngest.createFunction(
//   { id: "sync-workspace-member-from-clerk" },
//   { event: "clerk/organizationInvitation.accepted" },
//   async ({ event }) => {
//     const { data } = event;
//     await prisma.workspaceMember.create({
//       data: {
//         userId: data.user_id,
//         workspaceId: data.organization_id, 
//         role: String(data.role_name || "MEMBER").toUpperCase(),
//       },
//     });
//   }
// );

const sendTaskAssignmentEmail = inngest.createFunction(
  {id: "send-task-assignment-email"},
  {event: "app/task.assigned"},
  async ({event, step}) => {
    const {taskId,origin} = event.data

    const task = await prisma.task.findUnique({
      where: {id:taskId},
      include: {assignee:true,project:true}
    })

    await sendEmail({
      to:task.assignee.email,
      subject: `New task Assignment in ${task.project.name}`,
      body: `<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="padding:20px 30px; border-bottom:1px solid #eaeaea;">
            <h2 style="margin:0; color:#333;">New Task Assigned</h2>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px; color:#555; font-size:15px; line-height:1.6;">
            <p>Hi <strong>${task.assignee.name}</strong>,</p>

            <p>
              You have been assigned a new task. Please find the details below.
              Kindly ensure that you review and complete the task before the due date.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
              <tr>
                <td style="padding:8px 0; width:120px;"><strong>Task:</strong></td>
                <td style="padding:8px 0;">${task.title}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><strong>Due Date:</strong></td>
                <td style="padding:8px 0;">
                  ${new Date(task.due_date).toLocaleDateString()}
                </td>
              </tr>
            </table>

            <p style="text-align:center; margin:30px 0;">
              <a 
                href="${origin}" 
                style="background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;"
              >
                View Task
              </a>
            </p>

            <p>If you have any questions or require clarification, please feel free to reach out.</p>

            <p style="margin-top:30px;">
              Best regards,<br />
              <strong>Your Task Management Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:15px 30px; background:#f9fafb; font-size:12px; color:#888; text-align:center; border-top:1px solid #eaeaea;">
            This is an automated message. Please do not reply.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`
    })

    if(new Date(task.due_date).toLocaleDateString() !== new Date().toDateString()){
      await step.sleepUntil("Wait-for-the-due-date",new Date(task.due_date))

      await step.run('check-if-task-is-pending',async () => {
        const task =await prisma.task.findUnique({
          wher: {id:taskId},
          include: {assignee:true, project:true}
        })

        if(!task) return;

        if(task.status !== "DONE"){
          await step.run('send-task-reminder-mail',async ()=> {
            await sendEmail({
              to:task.assignee.email,
              subject:`Remoinder for the ${task.project.name}`,
              body: `<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="padding:20px 30px; border-bottom:1px solid #eaeaea;">
            <h2 style="margin:0; color:#333;">Task Due Today – Friendly Reminder</h2>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px; color:#555; font-size:15px; line-height:1.6;">
            <p>Hi <strong>${task.assignee.name}</strong>,</p>

            <p>
              This is a friendly reminder that the following task is <strong>due today</strong>.
              Please ensure that it is reviewed and completed by the end of the day.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
              <tr>
                <td style="padding:8px 0; width:120px;"><strong>Task:</strong></td>
                <td style="padding:8px 0;">${task.title}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><strong>Due Date:</strong></td>
                <td style="padding:8px 0; color:#d97706; font-weight:bold;">
                  ${new Date(task.due_date).toLocaleDateString()}
                </td>
              </tr>
            </table>

            <p style="text-align:center; margin:30px 0;">
              <a 
                href="${origin}" 
                style="background:#d97706; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;"
              >
                View Task
              </a>
            </p>

            <p>
              If the task has already been completed, please feel free to disregard this message.
              Otherwise, we appreciate your timely attention.
            </p>

            <p style="margin-top:30px;">
              Best regards,<br />
              <strong>Your Task Management Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:15px 30px; background:#f9fafb; font-size:12px; color:#888; text-align:center; border-top:1px solid #eaeaea;">
            This is an automated reminder. Please do not reply.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`
            })
          })
        }
      })
    }

  }
)


// Export all functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  syncWorkspaceCreation,
  syncWorkspaceDeletion,
  syncWorkspaceUpdation,
  // syncWorkspaceMemberCreation,
  sendTaskAssignmentEmail
];
