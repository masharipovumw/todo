import { Router } from "express";
import { deletAccount,  registeruser } from "../controller/Auth.controller.js";
import { authCheck } from "../middlewares/auth-check.js";

const user = Router()
user.post('/account',  registeruser)
user.delete('/account', authCheck(false), deletAccount)

export default user