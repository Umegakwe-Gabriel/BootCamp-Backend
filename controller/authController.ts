import express, {Request, Response} from "express";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary";
import authModel from "../model/authModel";



export const createUser = async(req: Request, res: Response):Promise<Response> =>{
    try {
        const {password} = req.body
         const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const {public_id, secure_url} = await cloudinary.uploader.upload(req.file?.path!);  

         const user = await authModel.create({
            email:req.body.email, password: hash,userName:req.body.userName, avatar:secure_url, avatarID: public_id,
         })
         console.log( user )
         return res.status(201).json({message: "user created", data: user})
    } catch (error:any) {
        return res.status(404).json({message: error.message})
    }
}

export const signInUser = async(req: Request, res: Response) =>{
    try {
            const {email, password} = req.body;
            const user = await authModel.findOne({email})
 
            if (user) {
                const checkPassword = await bcrypt.compare(password, user?.password!)

                if (checkPassword!) {
                    return res.status(404).json({message: "User created", data: user._id})
                } else {
                    return res.status(404).json({message: "Users password is incorrect"})
                }
            } else {
                return res.status(404).json({message: "Users doesn't exit",})
            }
        } catch (error) {
            return res.status(404).json({message: "Unable to create user"})
        }
}

export const updateOneUser = async(req: Request, res: Response)=>{
    try {
        const {userName } = req.body;
        const {userID} = req.params;
        const user = await authModel.findByIdAndUpdate(
            userID,
            {
                userName,
            },
            {new: true},
        )
        return res.status(201).json({message: "update user", data: user})
    } catch (error) {
        return res.status(404).json({message: "Unable to update user"})
    }
}

export const viewUser = async(req: Request, res: Response)=>{
    try {
        const user = await authModel.find();

        return res.status(200).json({message: "view users"})
    } catch (error) {
        return res.status(404).json({message:"Unable to view user"})
    }
}

export const viewOneUser = async(req: Request, res: Response)=>{
    try {
        const {userID} = req.params;
        const user = await authModel.findById(userID);

        return res.status(200).json({message: "view user", data: user})
    } catch (error) {
        return res.status(404).json({message: "Unable to view User"})
    }
}

export const deleteUser = async(req: Request, res: Response)=>{
    try {
        const userID = req.params;
        const user = await authModel.findByIdAndDelete(userID)

        return res.status(201).json({message: "user deleted", data: user})
    } catch (error) {
        return res.status(404).json({message: "Unamble to delete user"})
    }
}