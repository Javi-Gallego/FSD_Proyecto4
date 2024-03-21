
import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
    
    try {
        //recuperar la info a través del body
        const { first_name, last_name, email, password, role_id } = req.body
        
        //validaciones de los datos
        
        if(first_name.length > 255 || last_name.length > 255) {
            return res.status(400).json({
                success: false,
                message: "First name and last name must have less than 255 characters",
            })
        }

        if(!first_name || !last_name) {
            return res.status(400).json({
                success: false,
                message: "First name and last name must have a value",
            })
        }

        //validación password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 10 characters"
            })
        }

        //validación email con regex
        const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (!validEmail.test(email) ){
            return res.status(400).json({
                success: false,
                message: "format email invalid"
            })
        }

        //Si el mail tiene un formato válido, buscamos si ya existe en la base de datos
        const isUser = await User.findOne({
            where: { email: email }
        }) 

        if(isUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            }) 
        }

        //Tratamos el password para almacenarlo encriptado
        const passwordEncrypted = bcrypt.hashSync(password, 8)

        //Guardamos el usuario en la base de datos
        const newUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            email: email,
            passwordHash: passwordEncrypted,
            role: { id: 3 }
            //roleId: 3 
            //dos opciones de meter el role, dependiendo de si usamos @Column o @JoinColumn
        }).save()
        console.log(newUser.id)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create user",
            error: error
        })
    } 
}

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        //buscamos el usuario a través del email que es único
        //Buscar trayendo las relaciones (foreign keys) y seleccionando los campos
        //Las relaciones las importa como un objeto con todos los campos de la otra tabla
        const user = await User.findOne({
            where: { email: email },
            relations: { role: true },
            select: { 
                id: true,
                firstName: true,
                passwordHash: true, 
                email: true, 
                role: { name: true }}
        })  

        //Si no encontramos ningún usuario con ese email devolvemos error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            })
        }

        //validación password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 10 characters"
            })
        }

        //con la función de comparación de bcrypt comparamos la contraseña que nos llega con la que tenemos en la base de datos
        const isPassValid =  bcrypt.compareSync(password, user.passwordHash) 
        console.log(isPassValid)
        if (!isPassValid){
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        } 

        //generamos el token una vez confirmamos que es correcta la contraseña
        const token = jwt.sign(
            {
                firstName: user.firstName,
                userId: user.id,
                roleName: user.role.name
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2h" 
            }
        )

        return res.status(200).json({
            success: true,
            message: "User logged successfully",
            data: user.id,
            token: token
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't login user",
            error: error
        })
    }
    
}