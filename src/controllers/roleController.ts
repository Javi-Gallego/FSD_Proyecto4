import { Response, Request } from "express";
import { Role } from "../models/Role";
import { Not, In } from "typeorm";

export const getRoles = async (req: Request, res: Response) => {
    try {
        const ROLES = await Role.find({
            where: {
                name: Not(In(["super_admin", "worker"]))
            },
            select: {
                name: true,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Roles retrieved successfully",
            data: ROLES
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Roles can't be retrieved",
            error: error
        })
    }
}