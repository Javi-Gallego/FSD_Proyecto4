
import Router from 'express'
import { login, register } from '../controllers/authController'


const router = Router()

router.post("/api/auth/register", register) //done
router.post("/api/auth/login", login) //done

export default router