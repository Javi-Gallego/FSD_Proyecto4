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
        Catalog2.urlImage = "https://i.etsystatic.com/41164611/r/il/d960e3/4815821166/il_1140xN.4815821166_mk7z.jpg"
        await Catalog2.save()

        const Catalog3 = new Catalog()
        Catalog3.tattooName = "Tiger"
        Catalog3.urlImage = "https://i.etsystatic.com/41164611/r/il/4b8a9b/4815844222/il_794xN.4815844222_3mze.jpg"
        await Catalog3.save()

        const Catalog4 = new Catalog()
        Catalog4.tattooName = "Sea"
        Catalog4.urlImage = "https://t4.ftcdn.net/jpg/05/25/45/45/240_F_525454553_X71nE7ZBR6QvTcoNQK8yIQcc0qKboYL4.jpg"
        await Catalog4.save()

        const Catalog5 = new Catalog()
        Catalog5.tattooName = "Beach"
        Catalog5.urlImage = "https://dcassetcdn.com/design_img/3884451/804609/25246965/tqs120zcwpnrzmjw86cwqdppzw_image.jpg"
        await Catalog5.save()

        const Catalog6 = new Catalog()
        Catalog6.tattooName = "Dragon"
        Catalog6.urlImage = "https://ih1.redbubble.net/image.4561150675.5405/fposter,small,wall_texture,square_product,600x600.u2.jpg"
        await Catalog6.save()

        const Catalog7 = new Catalog()
        Catalog7.tattooName = "Balloons"
        Catalog7.urlImage = "https://i.pinimg.com/originals/38/34/f2/3834f2f59c5c7553ad8c1e88dbc8e43b.jpg"
        await Catalog7.save()

        const Catalog8 = new Catalog()
        Catalog8.tattooName = "Fairy"
        Catalog8.urlImage = "https://img.freepik.com/premium-vector/fairy-design-tattoo-art_1063011-111.jpg"
        await Catalog8.save()

        const Catalog9 = new Catalog()
        Catalog9.tattooName = "Heart"
        Catalog9.urlImage = "https://c8.alamy.com/comp/J4NGJB/heart-shape-tattoo-design-J4NGJB.jpg"
        await Catalog9.save()

        const Catalog10 = new Catalog()
        Catalog10.tattooName = "Tribal"
        Catalog10.urlImage = "https://www.creativefabrica.com/wp-content/uploads/2023/10/29/Tribal-Tattoo-Designs-Graphics-82753055-1-1-580x435.jpg"
        await Catalog10.save()

        const Catalog11 = new Catalog()
        Catalog11.tattooName = "Phoenix"
        Catalog11.urlImage = "https://t3.ftcdn.net/jpg/05/61/76/14/360_F_561761474_6RPE8SyNIeJj1G2MH0wjzebUK2LMX7Dr.jpg"
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