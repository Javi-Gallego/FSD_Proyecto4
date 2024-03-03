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

        if (tattooName.length > 50 || urlImage.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Tattoo name and the image url must be max 50 characters long"
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

export const updateCatalog = async (req: Request, res: Response) => {
    try {
        interface catalogFilter {
            tattooName?: string
            urlImage?: string
        }

        let catalogFilter: catalogFilter = req.body
        const catalogId = req.params.id

        if (catalogFilter.tattooName && catalogFilter.tattooName.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Tattoo name and the image url must be max 50 characters long"
            })
        }

        if (catalogFilter.urlImage && catalogFilter.urlImage.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Tattoo name and the image url must be max 50 characters long"
            })
        }

        const tattoo = await Catalog.findOneBy({
            id: parseInt(catalogId)
        })

        if (!tattoo) {
            return res.status(404).json({
                success: false,
                message: "Tattoo not found"
            })
        }

        const updatedcatalog = await Catalog.update({
            id: parseInt(catalogId)
            },
            req.body
        )

        return res.status(200).json({
            success: true,
            message: "Tattoo updated successfully",
            data: updatedcatalog
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Catalog can't be updated",
            error: error
        })
    }
}

export const deleteCatalog = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id

        const service = await Catalog.findOneBy({
            id: parseInt(serviceId)
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Tattoo not found"
            })
        }

        const updatedservice = await Catalog.delete({
            id: parseInt(serviceId)
            }
        )

        return res.status(200).json({
            success: true,
            message: "Tattoo deleted successfully",
            data: updatedservice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Tattoo can't be deleted",
            error: error
        })
    }
}