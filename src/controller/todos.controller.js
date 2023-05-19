import { all, get, run } from "../dbhelper.js"

export const todos = async (req, res) => {
    const userId = res.locals.user.id

    const sql = `
    SELECT 
        todos.id AS id,
        todos.title AS title,
        todos.isCompleted AS isCompleted
    FROM
        todos
    INNER JOIN users ON todos.userId = users.id 
    WHERE todos.userId = ?
    `

    const list = await all(sql,[userId])

    res.status(200).json({
            list
    })
}
export const addtodo = async (req, res) => {
    const user = res.locals.user
    const userId = user.id

    const {title} = req.body

    console.log(req.body);
    
    const sql = `INSERT INTO todos (title, userId) VALUES (?, ?);`

    await run(sql, [title, userId])
    
    const TodoSql = `SELECT id,title,isCompleted FROM todos WHERE userId = ?`
    const Todos = await get(TodoSql, [userId])
    

    res.json({
         Todos
    })
}
export const updatetodo = async (req, res) => {
    const userId = res.locals.user.id
    const id = +req.params.id

    const sql = `UPDATE todos SET
    isCompleted = true
    WHERE userId = ? AND id = ?;
    `
    const row = await run(sql, [userId, id])
    
    const TodoSql = `SELECT id,title,isCompleted  FROM todos WHERE userId = ?`
    const Todos = await get(TodoSql,[userId])

    res.status(201).json({
        Todos
    })
}
export const changeTitle = async(req, res) => {
    const userId = res.locals.user.id
    const id = +req.params.id
    const {title} = req.body

    const sql = `UPDATE todos SET title =?   WHERE userId = ? AND id = ? ;`
    
    await run(sql, [title, userId, id])
    
    const TodoSql = `SELECT id,title,isCompleted  FROM todos WHERE id = ?`
    const Todos = await get(TodoSql,[id])

    res.status(201).json({
        Todos
    })
}
export const deleteTodos = async (req, res) => {
    const userId = res.locals.user.id
    const id = +req.params.id
    const TodoSql = `SELECT id,title,isCompleted  FROM todos WHERE id = ?`
    const Todos = await get(TodoSql,[id])
    const sql = `DELETE FROM todos WHERE userId=? AND id=?;`

    await run(sql, [userId,id])
    
    res.status(201).json({
        Todos
    })
}