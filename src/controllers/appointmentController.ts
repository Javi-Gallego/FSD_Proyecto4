import { Request, Response, query } from "express"
import { Appointment } from "../models/Appointment"
import { User } from "../models/User"
import { Catalog } from "../models/Catalog"
import { FindOperator, Like, MoreThan } from "typeorm"


export const createAppointment = async (req: Request, res: Response) => {
    try {
        
        interface apppointmentData {
            userId?: number
            serviceId: number
            artistId?: number
            catalogId?: number
            date: Date
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

        //Si la fecha de la cita es anterior a la fecha actual, se devuelve un error
        if(newAppointment.date < new Date()) {
            return res.status(400).json({
                success: false,
                message: "You can't choose a date in the past"
            })
        }

        const createdAppointment = await Appointment.create({
            ...newAppointment
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

export const updateAppointments = async (req: Request, res: Response) => {
    try {
        interface apppointmentFilter {
            serviceId?: number
            artistId?: number
            catalogId?: number
            date?: Date
        }
        
        const filterAppointment: apppointmentFilter = req.body

        //Comprobamos si la cita que se quiere actualizar existe
        const searchApp = await Appointment.findOne({
            where: { id: Number(req.params.id) }
        })

        //Si no existe, se devuelve un error
        if(!searchApp){
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        //Si exista la cita pero es de un usuario distinto al del token y
        //No eres superadmin y
        //No eres el tatuador, se devuelve un error
        if(searchApp.userId !== req.tokenData.userId && req.tokenData.roleName !== "super_admin" && searchApp.artistId !== req.tokenData.userId){
            return res.status(403).json({
                success: false,
                message: "You don't have permissions to update this appointment"
            })
        }

        //los servicios 1, 2 y 3 requieren un tatuador, el 4 y 5 no
        if((filterAppointment.artistId && filterAppointment.serviceId === 4) ||
        (filterAppointment.artistId && filterAppointment.serviceId === 5)) {
            return res.status(400).json({
                success: false,
                message: "You don't need a tattoo artist for this service"
            })
        }
        //Si el usuario selecciona un artista, se busca si el artista existe y si es un tatuador
        if(filterAppointment.artistId) {
            const artist = await User.findOne({
                where: {id: filterAppointment.artistId},
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
        if(filterAppointment.catalogId && filterAppointment.serviceId !== 2) {
            return res.status(400).json({
                success: false,
                message: "You can't choose a tattoo from the catalog with this service"
            })
        }

        //Si hay una imagen y el servicio lo permite, se busca si es una imagen disponible en nuestro catálogo
        if(filterAppointment.catalogId) {
            const catalog = await Catalog.findOne({
                where: { id: filterAppointment.catalogId}
            })
            if (!catalog) {
                return res.status(400).json({
                    success: false,
                    message: "Tattoo not found"
                })
            }   
        }

        //Si la fecha de la cita es anterior a la fecha actual, se devuelve un error
        if(filterAppointment.date && filterAppointment.date < new Date()) {
            return res.status(400).json({
                success: false,
                message: "You can't choose a date in the past"
            })
        }
        //Se puede dar el caso de tener una cita con tatuador e imagen de catálogo
        //y pasar a una cita que  no requiera ni lo uno ni lo otro
        //para asegurarnos de esto, si se cambia el servicio, se borran los campos de artista y catálogo
        //como no me deja poner a null un campo que ya tiene valor le pongo por defecto 1 en catalogo y 3 en artista
        //son registros creados específicamente para este caso
        if(filterAppointment.serviceId !== 2){
            filterAppointment.catalogId = 1
        }
        if(filterAppointment.serviceId === 4 || filterAppointment.serviceId === 5){
            filterAppointment.artistId = 3
        }
        console.log("catalogid nuevo: " + filterAppointment.catalogId)
        console.log("artistid nuevo: " + filterAppointment.artistId)
        //Si ha pasado los filtros de comprobación, se actualiza la cita
        const updatedAppointment = await Appointment.update(
            { id: parseInt(req.params.id) },
            filterAppointment
        )

        return res.status(201).json({
            success: true,
            message: "Appointment updated successfully",
            data: updatedAppointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't update appointment",
            error: error
        })
    }
}

export const getAppointments = async (req: Request, res: Response) => {
    try {
        
        interface queryFilterI{
            id?: number
            userId?: number
            serviceId?: number
            artistId?: number
            catalogId?: number
        }

        const queryFilters: queryFilterI = {}

        //Si no eres super admin, solo puedes buscar tus citas y se graba el id del usuario en la búsqueda como filtro
        if(req.tokenData.roleName !== "super_admin"){
            queryFilters.userId = req.tokenData.userId
        } else if (req.query.userId) {
            queryFilters.userId = Number(req.query.userId)
        }
        
        if(req.query.id){
            queryFilters.id = Number(req.query.id)
        }
        
        //Si eres super admin, puedes buscar por serviceId, artistId y catalogId, si no los campos están bloqueados
        if(req.tokenData.roleName === "super_admin"){
            if(req.query.serviceId){
                queryFilters.serviceId = Number(req.query.serviceId)
            }
    
            if(req.query.artistId){
                queryFilters.artistId = Number(req.query.artistId)
            }
    
            if(req.query.catalogId){
                queryFilters.catalogId = Number(req.query.catalogId)
            }
        }

        //Si no se ha pasado ningún parámetro por filtro, se pasan todas las citas
        //El único filtro siempre activo es que sólo se muestran citas pendientes. Posterior a la fecha actual
        const search = await Appointment.find({
            where: [
                queryFilters,
                { date : MoreThan(new Date()) }
            ],
            select: {
                id: true,
                userId: true,
                serviceId: true,
                artistId: true,
                catalogId: true,
                date: true
            }
        })

        if(!search){
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: search
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't get appointments",
            error: error
        })      
    }
}