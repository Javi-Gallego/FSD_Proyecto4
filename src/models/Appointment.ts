import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Service } from "./Service"
import { Catalog } from "./Catalog"

@Entity("appointments")
export class Appointment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "user_id"})
    userId!: number

    @Column({ name: "service_id"})
    serviceId!: number

    @Column({ name: "artist_id"})
    artistId!: number

    @Column({ name: "catalog_id"})
    catalogId!: number

    @Column({ name: "date"})
    date!: Date

    @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date

    @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt!: Date

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({name: "user_id"})
    user!: User

    @ManyToOne(() => User, artist => artist.artappointments)
    @JoinColumn({name: "artist_id"})
    artist!: User

    @ManyToOne(() => Service, service => service.appointments)
    @JoinColumn({name: "service_id"})
    service!: Service

    @ManyToOne(() => Catalog, catalog => catalog.appointments)
    @JoinColumn({name: "catalog_id"})
    catalog!: Catalog
}
