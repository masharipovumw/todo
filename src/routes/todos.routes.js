import { Router } from "express";
import {addtodo, changeTitle, deleteTodos, todos, updatetodo } from "../controller/todos.controller.js";
import { authCheck } from "../middlewares/auth-check.js";

const cart = Router()

cart.get('/todos',authCheck(false),todos)
cart.post('/todos',authCheck(false), addtodo)
cart.put('/todos/:id', authCheck(false), changeTitle)
cart.patch('/todos/:id', authCheck(false), updatetodo)
cart.delete('/todos/:id', authCheck(false), deleteTodos)


export default cart