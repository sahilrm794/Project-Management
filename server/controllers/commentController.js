import prisma from "../configs/prisma.js"


export const addComment = async (req,res) => {
    try {
        const {userId} = await req.auth()
        const {taskId, content} = req.body
    
        const task = await prisma.task.findUnique({
            where: {id:taskId}
        })
    
        const project = await prisma.project.findUnique({
            where: {id:taskId.projectId},
            include: {members: {include: {user: true}}}
        })
    
        if(!project){
            return res.status(400).json({message:"Project Not Found"})
        }
    
        const member = project.members.find((m)=>m.userId===userId)
    
        if(!member){
            return res.status(400).json({message:"User doesn't exist"})
        }
    
        const comment = await prisma.comment.create({
            data:{
                taskId,content,userId
            },
            include: {user: true}
    
        })
    
        return res.status(200).json({comment,message:"Comment added Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Something went wrong while adding comment"})
    }
}

export const getTaskComments = async (req,res) => {
    try {
        const {taskId} = req.params
        const comments = await prisma.comment.findMany({
            where: {id:taskId}, include: {user:true}
        })

        return res.status(200).json({comments,message:"Comments fetched Successfully"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Something went wrong while getting comment"})
    }
}