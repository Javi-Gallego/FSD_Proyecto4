import { Request, Response } from "express";

export const createCatalog = async (req: Request, res: Response) => {
    try {

        const { tattoo_name, image_url } = req.body
        
        return res.status(201).json({
            success: true,
            message: "Tattoo uploaded successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't upload new tattoo",
            error: error
        })
    }
}