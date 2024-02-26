import { Request, Response } from "express"

export const createReg = (req: Request, res: Response) => {
    
    //recuperar la info a través del body
    console.log(req.body)

    const { name, email, id } = req.body

    console.log(name)
    console.log(email)
    console.log(id)

    res.status(201).json(
        {
            success: true,
            message: "User registered successfully",
        }
    )
}