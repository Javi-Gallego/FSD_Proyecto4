import { Service } from "../../models/Service"
import { AppDataSource } from "../db"

export const serviceSeedDatabase = async() => {
    try {
        await AppDataSource.initialize()
        
        const Service1 = new Service()
        Service1.serviceName = "Tatuajes personalizados"
        Service1.description = "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
        await Service1.save()
        
        const Service2 = new Service()
        Service2.serviceName = "Tatuajes de catálogo"
        Service2.description = "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas."
        await Service2.save()
        
        const Service3 = new Service()
        Service3.serviceName = "Restauración y rejuvenecimiento de trabajos"
        Service3.description = "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad."
        await Service3.save()

        const Service4 = new Service()
        Service4.serviceName = "Colocación de piercings y dilatadores"
        Service4.description = "Ofrecemos servicios preofesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
        await Service4.save()

        const Service5 = new Service()
        Service5.serviceName = "Venta de piercings y otros artículos"
        Service5.description = "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único."
        await Service5.save()

        console.log("--------------------------------------------------")
        console.log("---- Los services se han creado correctamente ----")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}

serviceSeedDatabase()