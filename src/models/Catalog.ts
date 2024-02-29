
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("catalog")
export class Catalog extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "tattoo_name" })
    tattooName!: string

    @Column({ name: "url_image"})
    urlImage!: string

    @OneToMany(() => Appointment, appointments => appointments.catalog)
    appointments!: Appointment[]
}
