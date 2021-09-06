import { Request, Response } from "express"
import User from "../models/users";

export const getUsers = async (req: Request, res: Response)=>{

    const users = await User.findAll();

    res.json({
        msg: 'Get Users',
        users
    });
}

export const getUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    
    const user = await User.findByPk(id);

    if(!user){
        return res.status(404).json({
            msg: 'User with ID '+id+' does not exist',
        })
    }
    res.json({
        msg: 'Get User',
        user
    });
}

export const postUser = async (req: Request, res: Response)=>{
    const body = req.body;

    try {
        const emailExist = await User.findOne({
            where: {
                email: body.email,
            }
        });

        if(emailExist){
            return res.status(400).json({
                msg: `User with email ${body.email} already exist`,
            });
        }

        const user = User.build(body);

        await user.save();
        
        res.json({
            msg: 'Post User',
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error',
        })
    }

}

export const putUser = async (req: Request, res: Response)=>{
    const {body} = req;
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({
                msg: `User with id ${id} dont exist`,
            });
        }
        body.status = true;
        await user.update(body);
        
        res.json({
            msg: 'Put User',
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error',
        })
    }
}

export const deleteUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({
                msg: `User with id ${id} dont exist`,
            });
        }

        //Delete
        // await user.destroy();

        await user.update({status: false});
        
        res.json({
            msg: 'Delete User',
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error',
        })
    }

}