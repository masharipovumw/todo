import { Router } from "express";
import {addtodo, deleteTodos, todos, updatetodo } from "../controller/todos.controller.js";
import { authCheck } from "../middlewares/auth-check.js";

const cart = Router()

cart.get('/todos',authCheck(false),todos)
cart.post('/todos',authCheck(false), addtodo)
cart.put('/todo/:id', authCheck(false), updatetodo)
cart.delete('/todo/:id', authCheck(false), deleteTodos)


export default cart