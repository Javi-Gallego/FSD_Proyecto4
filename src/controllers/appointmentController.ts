import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"
import { User } from "../models/User"
import { Catalog } from "../models/Catalog"


export const createAppointment = async (req: Request, res: Response) => {
    try {
        
        interface apppointmentData {
            userId?: number
            serviceId?: number
            artistId?: number
            catalogId?: number
            date?: Date
        }
        
        const newAppointment: apppointmentData = req.body
        
        newAppointment.userId = req.tokenData.userId

        if (!newAppointment.serviceId) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least a serviceId"
            })
        }

        if (!newAppointment.date) {
            return res.status(400).json({
                success: false,
                message: "Please provide a date for the appointment"
            })
        }

        //los servicios 1, 2 y 3 requieren un tatuador, el 4 y 5 no
        if((newAppointment.artistId && newAppointment.serviceId === 4) ||
        (newAppointment.artistId && newAppointment.serviceId === 5)) {
            return res.status(400).json({
                success: false,
                message: "You don't need a tattoo artist for this service"
            })
        }
        //Si el usuario selecciona un artista, se busca si el artista existe y si es un tatuador
        if(newAppointment.artistId) {
            const artist = await User.findOne({
                where: {id: newAppointment.artistId},
                relations: { role: true },
                select:{
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: { name: true }
            }
            })
            if(!artist){
                return res.status(400).json({
                    success: false,
                    message: "Artist not found"
                })
            }
            if (artist){
                if(artist.role.name !== "tattoo_artist") {
                    return res.status(400).json({
                        success: false,
                        message: "The user selected is not a tattoo artist"
                    })
                }
            }  
        }
        //Solo el servicio 2 puede elegir un tatuaje del catalogo
        if(newAppointment.catalogId && newAppointment.serviceId !== 2) {
            return res.status(400).json({
                success: false,
                message: "You can't choose a tattoo from the catalog with this service"
            })
        }

        //Si hay una imagen y el servicio lo permite, se busca si es una imagen disponible en nuestro catálogo
        if(newAppointment.catalogId) {
            const catalog = await Catalog.findOne({
                where: { id: newAppointment.catalogId}
            })
            if (!catalog) {
                return res.status(400).json({
                    success: false,
                    message: "Tattoo not found"
                })
            }   
        }

        const createdAppointment = await Appointment.create({
            userId: newAppointment.userId,
            serviceId: newAppointment.serviceId,
            artistId: newAppointment.artistId,
            catalogId: newAppointment.catalogId,
            date: newAppointment.date
        }).save()
        
        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: createdAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't create appointment",
            error: error
        })
    }
}