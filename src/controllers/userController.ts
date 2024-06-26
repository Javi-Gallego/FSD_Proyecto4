import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"
import { FindOperator, Like } from "typeorm"

export const getUsers = async (req: Request, res: Response) => {
    try {
        //paginación de resultados
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page-1)*limit

        if(limit > 100){
            return res.status(400).json({
                success: false,
                message: "Limit must be less than 100"
            })
        }

        interface queryFiltersE {
            email?: FindOperator<string>
            firstName?: FindOperator<string>
            lastName?: FindOperator<string>
            role?: {
                name: FindOperator<string>
            }
        }
        console.log("firstName", req.query.firstName)
        const queryFilters: queryFiltersE = {}

        if (req.query.email) {
            queryFilters.email = Like(`%${req.query.email}%`)
        }
        if (req.query.firstName) {
            queryFilters.firstName = Like(`%${req.query.firstName}%`)
        }
        if (req.query.lastname) {
            queryFilters.lastName = Like(`%${req.query.lastName}%`)
        }
        if (req.query.role) {
            queryFilters.role = { name: Like(`%${req.query.role}%`) }
        }

        const users = await User.find({
            where: queryFilters,
            relations: { role: true },
            select: { 
                id: true, 
                firstName: true,
                lastName: true, 
                email: true, 
                role: { name: true }
            },
            take: limit,
            skip: skip
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

export const profile = async (req: Request, res: Response) => {
    
    try {
        //recuperar la id del usuario a través del token
        const id = req.tokenData.userId

        const profile = await User.findOne({
            where: {id: id},
            relations: { role: true },
            select:{
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profilePhoto: true,
                role: { name: true }
            }
        })
    
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

export const updateProfile = async (req: Request, res: Response) => {
    try {
        //creamos una interfaz que tendrá todos los posibles campos a actualizar
        interface updateProfileI {
            email?: string
            firstName?: string
            lastName?: string
            passwordHash?: string
        }
        
        const userId = req.tokenData.userId
        const newData: updateProfileI = {}

        //buscamos el usuario a través de la id que viene del token a ver si existe o ha habido algún error
        const user = await User.findOne({
            where: {id: userId},
            relations: { role: true },
            select: { 
                id: true,
                firstName: true,
                lastName: true,
                passwordHash: true, 
                email: true, 
                role: { name: true }}
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //si se quiere actualizar el email, se comprueba que no esté ya en la BD.
        if (req.body.email) {
            const userMail = await User.findOne({
                where: { email: req.body.email }
            })
            if (userMail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                })
            }
            //validación email con regex
            const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!validEmail.test(req.body.email) ){
                return res.status(400).json({
                    success: false,
                    message: "Email format invalid"
                })
            }
            newData.email = req.body.email
        }
        
        if (req.body.firstName) {       
            newData.firstName = req.body.firstName
        }

        if (req.body.lastName) {       
            newData.lastName = req.body.lastName
        }

        //para poder cambiar la contraseña se necesita mandar la contraseña actual además de la nueva
        //se comprueba que la contraseña actual sea correcta
        if(req.body.currentPass && req.body.newPass){
            const validPass =  bcrypt.compareSync(req.body.currentPass, user.passwordHash)
            if(!validPass){
                return res.status(400).json({
                    success: false,
                    message: "Current password is incorrect"
                })
            }
            //validación password
            if (req.body.newPass.length < 6 || req.body.newPass.length > 10) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be between 6 and 10 characters"
                })
            }
            const newPassHash = bcrypt.hashSync(req.body.newPass, 8)
            newData.passwordHash = newPassHash
        }
        
        //Se actualiza el usuario con los nuevos datos almacenados en la interfaz newData
        const userUpdated = await User.update({
            id: userId
            },
            newData)
        return res.status(201).json({
            success: true,
            message: "User updated successfully",
            data: userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't be updated",
            error: error
        })
    }   
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const { userRole } = req.body
        const userId = req.params.id

        const user = await User.findOne({
            where: {id: parseInt(userId)}
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