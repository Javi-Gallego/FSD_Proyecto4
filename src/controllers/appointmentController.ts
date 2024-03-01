import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";


export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { userId, serviceId, artistId, catalogId } = req.body

        if (!serviceId) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least a serviceId"
            })
        }

        if(artistId) {
            const artist = await Appointment.findOne({where: {id: artistId}})
            if (!artist) {
                return res.status(400).json({
                    success: false,
                    message: "Artist not found"
                })
            }   
        }

        if(catalogId) {
            const catalog = await Appointment.findOne({where: {id: catalogId}})
            if (!catalog) {
                return res.status(400).json({
                    success: false,
                    message: "Tattoo not found"
                })
            }   
        }

        if(catalogId && serviceId !== 2) {
            return res.status(400).json({
                success: false,
                message: "You can't choose a tattoo from the catalog with this service"
            })
        }

        const appointment = await Appointment.create({
            userId,
            serviceId,
            artistId,
        }).save()
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't create appointment",
            error: error
        })
    }
}