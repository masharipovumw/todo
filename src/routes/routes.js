import { Router } from "express";
import user from "./Auth.routes.js";
import todos from "./todos.routes.js";

const router = Router()

router.use(user)
router.use(todos)

export default router