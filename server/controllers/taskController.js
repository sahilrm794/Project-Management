    import prisma from "../configs/prisma.js";
import { inngest } from "../inngest/index.js";

    export const createTask = async (req,res) => {
        try {
            const {userId} = req.auth()
            const {projectId,description,type,title,status,priority,assigneeId,due_date} = req.body
            const origin = req.get('origin')
             
            const project = await prisma.project.findUnique({
                where: {id: projectId},
                include: {members: {include: {user:true}}}
            })

            if(!project){
                return res.status(400).json({message: "Project not found"})
            }else if(project.team_lead!==userId){
                return res.status(400).json({message: "You don't have admin privileges for this project"})
            }else if(assigneeId && !project.members.find((m)=>m.user.id===assigneeId)){
                return res.status(400).json({message: "assignee is not in project team"})
            }


            const task = await prisma.task.create({
                data: {
                    projectId,
                    description,
                    status,
                    title,
                    priority,
                    assigneeId,
                    due_date: new Date(due_date)
                }
            })

            const taskwithAssignee = await prisma.task.findUnique({
                where: {id:task.id},
                include: {assignee:true}
            })

            await inngest.send({
                name: "app/task.assigned",
                data: {
                    taskId: task.id,origin
                }
            })

            return res.status(200).json({message: "Task created successfully"})

        } catch (error) {
            console.log(error)
            return res.status(400).json("Something went wrong while creating task")
        }
    }

    
    export const updateTask = async (req,res) => {
        try {
            const task = await prisma.task.findUnique({
                where: {id: req.params.id}
            })

            if(!task){
                return res.status(400).json({message: "Task not found"})
            }
            const {userId} = req.auth()

             
            const project = await prisma.project.findUnique({
                where: {id: task.projectId},
                include: {members: {include: {user:true}}}
            })

            if(!project){
                return res.status(400).json({message: "Project not found"})
            }else if(project.team_lead!==userId){
                return res.status(400).json({message: "You don't have admin privileges for this project"})
            }

            const updatedTask = await prisma.task.update({
                where: {id:req.params.id},
                data: req.body
            })

            return res.status(200).json({message: "Task updated successfully"})

        } catch (error) {
            console.log(error)
            return res.status(400).json("Something went wrong while updating task")
        }
    }

    export const deleteTask = async (req,res) => {
        try {
            const {userId} = req.auth()
            const {taskIds} = req.body
            const tasks = await prisma.task.findUnique({
                where: {id: {in: taskIds}}
            })

            if(tasks.length === 0){
                return res.status(400).json({message: "Task not found"})
            }

             
            const project = await prisma.project.findUnique({
                where: {id: tasks[0].projectId},
                include: {members: {include: {user:true}}}
            })

            if(!project){
                return res.status(400).json({message: "Project not found"})
            }else if(project.team_lead!==userId){
                return res.status(400).json({message: "You don't have admin privileges for this project"})
            }

            const deletedTask = await prisma.task.deleteMany({
                where: {id: {in: taskIds}}
            })


            return res.status(200).json({message: "Task deleted successfully"})

        } catch (error) {
            console.log(error)
            return res.status(400).json("Something went wrong while deleting task")
        }
    }