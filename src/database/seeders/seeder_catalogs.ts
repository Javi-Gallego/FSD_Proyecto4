import { Catalog } from "../../models/Catalog"
import { AppDataSource } from "../db"

export const catalogSeedDatabase = async () => {
    try {
        await AppDataSource.initialize()
        
        const Catalog1 = new Catalog()
        Catalog1.tattooName = "No tattoo selected"
        Catalog1.urlImage = "./img/no_tattoo.jpg"
        await Catalog1.save()

        const Catalog2 = new Catalog()
        Catalog2.tattooName = "Lion"
        Catalog2.urlImage = "./img/lion.jpg"
        await Catalog2.save()

        const Catalog3 = new Catalog()
        Catalog3.tattooName = "Tiger"
        Catalog3.urlImage = "./img/tiger.jpg"
        await Catalog3.save()

        const Catalog4 = new Catalog()
        Catalog4.tattooName = "Sea"
        Catalog4.urlImage = "./img/sea.jpg"
        await Catalog4.save()

        const Catalog5 = new Catalog()
        Catalog5.tattooName = "Beach"
        Catalog5.urlImage = "./img/beach.jpg"
        await Catalog5.save()

        const Catalog6 = new Catalog()
        Catalog6.tattooName = "Dragon"
        Catalog6.urlImage = "./img/dragon.jpg"
        await Catalog6.save()

        const Catalog7 = new Catalog()
        Catalog7.tattooName = "Balloons"
        Catalog7.urlImage = "./img/balloons.jpg"
        await Catalog7.save()

        const Catalog8 = new Catalog()
        Catalog8.tattooName = "Fairy"
        Catalog8.urlImage = "./img/fairy.jpg"
        await Catalog8.save()

        const Catalog9 = new Catalog()
        Catalog9.tattooName = "Heart"
        Catalog9.urlImage = "./img/heart.jpg"
        await Catalog9.save()

        const Catalog10 = new Catalog()
        Catalog10.tattooName = "Tribal"
        Catalog10.urlImage = "./img/tribal.jpg"
        await Catalog10.save()

        const Catalog11 = new Catalog()
        Catalog11.tattooName = "Flames"
        Catalog11.urlImage = "./img/flames.jpg"
        await Catalog11.save()

        console.log("--------------------------------------------------")
        console.log("---- Los tattoos se han creado correctamente -----")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}