import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { TokenData } from "../types"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token not found / Unauthorized"
            })
        }

        //verificar token
        //si no es correcto lanza un throwError y entra al catch
        //si es correcto devuelve el valor decodificado
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log(decoded)
        
        //metemos dentro del campo tokenData el valor decodificado
        //el campo se ha creado en el archivo src/types/index.d.ts
        req.tokenData = decoded as TokenData

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token can't be validated or not found",
            error: error
        })
    }
}