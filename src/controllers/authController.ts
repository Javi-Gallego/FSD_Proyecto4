
import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
    
    try {
        //recuperar la info a través del body
        const { first_name, last_name, email, password, role_id } = req.body
        
        //validaciones de los datos

        if(first_name.length > 255 || last_name.length > 255) {
            return res.status(400).json(
                {
                    success: false,
                    message: "First name and last name must have less than 255 characters",
                }
            )
        }

        if(!first_name || !last_name) {
            return res.status(400).json(
                {
                    success: false,
                    message: "First name and last name must have a value",
                }
            )
        }

        //validación password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 10 characters"
            })
        }

        //validación email
        const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email) ){
            return res.status(400).json(
            {
            success: false,
            message: "format email invalid"
            }
            )
        }

        //Tratamos la data si fuera necesario
        const passwordEncrypted = bcrypt.hashSync(password, 8)
        console.log(passwordEncrypted)

        //Guardamos el usuario en la base de datos
        const newUser = await User.create({
            firstName: first_name,
            lastName: last_name,
            email: email,
            passwordHash: passwordEncrypted,
            role: { id: 2 }
            //roleId: 2 
            //dos opciones de meter el role, dependiendo de si usamos @Column o @JoinColumn
        }).save()
    
        return res.status(201).json(
            {
                success: true,
                message: "User registered successfully",
                data: newUser
            }
        )
        
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
        //recuperar la info a través del body
        console.log(req.body)

        const { email, password, id } = req.body
    
        //buscamos el usuario a través del email que es único
        const user = await User.findOneBy({
            email: email
        })
    
        //Si no encontramos ningún usuario con ese email devolvemos error
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Email not found",
                }
            )
        }

        //validación password
        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 10 characters"
            })
        }

        //con la función de comparación de bcrypt comparamos la contraseña que nos llega con la que tenemos en la base de datos
        await bcrypt.compare(password, user.passwordHash, (err, result) => {
            if (!result){
                return res.status(400).json(
                    {
                        success: false,
                        message: "Password incorrect",
                    }
                )
            } else {
                return res.status(200).json(
                    {
                        success: true,
                        message: "User logged successfully",
                    }
                )
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't login user",
            error: error
        })
    }
    
}