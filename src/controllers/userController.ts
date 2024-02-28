import { Request, Response } from "express"
import { User } from "../models/User"

export const getUsers = async (req: Request, res: Response) => {
    try {
        //recuperar la info a través del body
    const users = await User.find({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            roleId: true
        }
    })

    return res.status(200).json(
        {
            success: true,
            message: "Users retrieved successfully",
            data: users
        }
    )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Users can't be retrieved",
            error: error
        })
    }
    
}

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email

        const user = await User.findOneBy({
            email: (userEmail)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be retrieved",
            error: error
        })
    }   
}

export const profile = async (req: Request, res: Response) => {
    
    try {
        //recuperar la id del usuario a través del token
        const id = parseInt(req.params.id)
        
        const profile = await User.findOneBy({id: id})
    
        return res.status(201).json(
            {
                success: true,
                message: "Profile retrieved successfully",
                data: profile
            }
        )
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't get profile",
            error: error
        })
    }
}

export const createUser = async (req: Request, res: Response) => {

    try {
        //recuperar la info a través del body
        console.log(req.body)
        
        const { name } = req.body
        
        if(name.length > 50) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User name must be under 50 characters long",
                }
            )
        }
    
        /*const newRole = await Role.create({
            name: name
        }).save()*/
    
        res.status(201).json(
            {
                success: true,
                message: "User created successfully",
                //data: newRole
            }
        )
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't create user",
            error: error
        })
    }  
}

export const updateUser = (req: Request, res: Response) => {

    //recuperar parámetro de la ruta
    req.params.id
    console.log(req.params.id)

    res.status(200).json(
        {
            success: true,
            message: `User ${req.params.id} updated successfully`,
        }
    )
}

export const deleteUser = (req: Request, res: Response) => {
    
    //recuperar parámetro de la ruta
    req.params.id
    console.log(req.params.id)

    res.status(200).json(
        {
            success: true,
            message: `User ${req.params.id} deleted successfully`,
        }
    )
}