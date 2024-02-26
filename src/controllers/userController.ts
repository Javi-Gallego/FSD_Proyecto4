import { Request, Response } from "express"

export const getUser = (req: Request, res: Response) => {
    
    //recuperar la info a través del body
    console.log(req.body)

    res.status(200).json(
        {
            success: true,
            message: `Role ${req.params.id} retrieved successfully`,
        }
    )
}

export const updateUser = (req: Request, res: Response) => {

    //recuperar parámetro de la ruta
    req.params.id
    console.log(req.params.id)

    res.status(200).json(
        {
            success: true,
            message: `Role ${req.params.id} updated successfully`,
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
            message: `Role ${req.params.id} deleted successfully`,
        }
    )
}