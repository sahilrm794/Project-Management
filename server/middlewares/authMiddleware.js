
export const protect = async (req, res, next) => {
    try {
        const { userId } = await req.auth();
        if(!userId){
            return res.status(401).json({message: "Unauthorized the user is not logged in."})
        }
        return next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.code || error.message + "The error occured in middleware auth"});
    }
}