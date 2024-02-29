import { Request, Response } from "express";
import { Catalog } from "../models/Catalog";

export const getCatalog = async (req: Request, res: Response) => {
    try {    

        const newCatalog = await Catalog.find({
            select: ["tattooName", "urlImage"]
        })

        return res.status(200).json({
            success: true,
            message: "Tattoo catalog generated successfully",
            data: newCatalog
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't show tattoo catalog",
            error: error
        })
    }
}

export const createCatalog = async (req: Request, res: Response) => {
    try {

        const { tattooName, urlImage } = req.body
        
        if (!tattooName || !urlImage) {
            return res.status(400).json({
                success: false,
                message: "Please provide a tattoo name and an image url"
            })
        }

        const newTattoo = await Catalog.create({
            tattooName: tattooName,
            urlImage: urlImage
        }).save()

        return res.status(200).json({
            success: true,
            message: "Tattoo image created successfully",
            data: newTattoo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't upload new tattoo",
            error: error
        })
    }
}