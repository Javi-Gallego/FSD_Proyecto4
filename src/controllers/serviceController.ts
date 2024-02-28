import { Request, Response } from "express";
import { Service } from "../models/Service";

export const getServices = async (req: Request, res: Response) => {
    try {
        const SERVICES = await Service.find({
            select: {
                serviceName: true,
                description: true,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Services retrieved successfully",
            data: SERVICES
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Services can't be retrieved",
            error: error
        })
    }
}

export const createServices = async (req: Request, res: Response) => {
    try {
        const { serviceName, description } = req.body

        const newService = await Service.create({
            serviceName: serviceName,
            description: description
        }).save()
        return res.status(200).json({
            success: true,
            message: "Service created successfully",
            data: newService
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service can't be created",
            error: error
        })
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id

        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        const updatedservice = await Service.update({
            id: parseInt(serviceId)
            },
            req.body
        )

        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: updatedservice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service can't be updated",
            error: error
        })
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id

        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        const updatedservice = await Service.delete({
            id: parseInt(serviceId)
            }
        )

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
            data: updatedservice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service can't be deleted",
            error: error
        })
    }
}