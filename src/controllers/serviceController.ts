import { Request, Response } from "express";
import { Service } from "../models/Service";

export const getServices = async (req: Request, res: Response) => {
    try {
        const SERVICES = await Service.find({
            select: {
                id: true,
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
        console.log("hola")
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
        
        interface FilterService {
            serviceName?: string
            description?: string
        }

        const FilterService: FilterService = {}

        if(req.body.serviceName){
            FilterService.serviceName = req.body.serviceName
        }
        if(req.body.description){
            FilterService.description = req.body.description
        }
        if (!req.body.serviceName && !req.body.description) {
            return res.status(400).json({
                success: false,
                message: "Service name or description are required to update the service"
            })
        }
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
            FilterService
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