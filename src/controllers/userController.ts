import { Request, Response } from "express"
import { User } from "../models/User"

export const getUsers = async (req: Request, res: Response) => {
    try {
        // const email = req.query.email

        // if (email) {

        //     const user = await User.findOne({
        //         where: { email: email },
        //         relations: { role: true },
        //         select: { 
        //             id: true, 
        //             firstName: true,
        //             lastName: true, 
        //             email: true, 
        //             role: { name: true }}
        //     })

        //     if (!user) {
        //         return res.status(404).json({
        //             success: false,
        //             message: "User not found"
        //         })
        //     }

        //     return res.status(200).json({
        //         success: true,
        //         message: "User retrieved successfully",
        //         data: user
        //     })
        // }

        const users = await User.find({
            relations: { role: true },
            select: { 
                id: true, 
                firstName: true,
                lastName: true, 
                email: true, 
                role: { name: true }}
        })

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        })

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

export const updateUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //tratar datos

        const userUpdated = await User.update({
            id: parseInt(userId)
            },
            req.body
        )

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be retrieved",
            error: error
        })
    }   
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const { userRole } = req.body
        const userId = req.params.id

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //tratar datos

        const userUpdated = await User.update({
            id: parseInt(userId)
            },
            { roleId: userRole}
        )

        return res.status(201).json({
            success: true,
            message: "Role updated successfully",
            data: userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be retrieved",
            error: error
        })
    }   
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.body.id

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const userDeleted = await User.remove(user)

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: userDeleted
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be deleted",
            error: error
        })
    }   
}