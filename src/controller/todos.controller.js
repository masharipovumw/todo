import { all, run } from "../dbhelper.js"

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

   const order = await run(sql, [title,userId])

    res.json({
        product: order
    })
}
export const updatetodo = async (req, res) => {
    const userId = res.locals.user.id
    const id = +req.params.id

    const sql = `UPDATE todos SET
    isCompleted = 'true'
    WHERE userId = ? AND id = ?;
    `
    const row = await run(sql, [userId,id])

    res.status(201).json({
        product:row
    })
}
export const deleteTodos = async (req, res) => {
    const id = +req.params.id
    const sql = `DELETE FROM todos WHERE id=?;`

    const product = await run(sql, [id])
    
    res.status(201).json({
        product
    })
}