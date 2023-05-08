import md5 from "md5"
import { all, run } from "../dbhelper.js"
import { nanoid } from "nanoid"


export const registeruser = async (req, res) => {
    const { name, username, password } = req.body
    
    const token = md5(password+nanoid(5))

    const sql = `
    INSERT INTO 
        users(name  , username , password  ,  token)
    VALUES
        (?,?,?,?); 
    `
     await run(sql, [
        name,
        username,
        password,
        token
    ])
    res.status(201).json({
        user: {
            name,
            username,
            password,
            token
        }
    })
}
export const deletAccount = async (req, res) => {
    const userId = res.locals.user.id

    // get todos for messege
    const Alltodos = `SELECT * FROM todos WHERE userId = ?;`
    const gettodos = await all(Alltodos,[userId]) 

    // operation delet todo
    const deleteSql = ` DELETE FROM todos WHERE userId = ? ` 
    const deleteTodo = await run(deleteSql, [userId])
    
    // operation delete user
    const Usersql = ` DELETE FROM users WHERE id = ? ` 
    const deleteUser = await run(Usersql, [userId])



    res.json({
        message: 'Account and todos has been deleted',
        todos : gettodos.length
    })
}