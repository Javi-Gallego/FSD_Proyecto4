import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment"

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "first_name"})
    firstName!: string

    @Column({ name: "last_name"})
    lastName!: string

    @Column({ name: "email"})
    email!: string

    @Column({ name: "password_hash", select: false})
    passwordHash!: string

    @Column({ name: "role_id"})
    roleId!: number

    @Column({ name: "profile_photo"})
    profilePhoto!: string

    @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP", select: false})
    createdAt!: Date

    @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", select: false},)
    updatedAt!: Date

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({name: "role_id"})
    role!: Role

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments!: Appointment[]

    @OneToMany(() => Appointment, artappointment => artappointment.user)
    artappointments!: Appointment[]
}
