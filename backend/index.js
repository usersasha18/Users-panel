import express from "express";
import mysql from "mysql2";
import cors from "cors";
import {PORT} from "./confing.js";

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "sasha",
    password: "123",
    database: "users"
})

connection.connect((err) => {
    if(err) {
        console.error("ошибка подключения", err)
    } else {
        console.log("Подключение прошло успешно")
    }
})

app.get('/api/users', (req, res) => {
    const sql = "SELECT * FROM `users`";
    connection.query(sql, (err, result) => {
        if(err) {
            console.log("ошибка запроса")
            res.status(500).json({error: "Server error"});
        } else {
            res.json(result);   
        }
    });
});
 
app.delete('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const sql = `DELETE FROM users WHERE id = ${userId}`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Пользователь успешно удален' });
      }
    });
  });

app.post("/api/users", (req, res) => {
    const {id, name , role, isLogin} = req.body
    const sql = `INSERT INTO users(id, name, role, isLogin) VALUES ('${id}','${name}','${role}','${isLogin}')`

    connection.query(sql, (err, res) => {
        if(err) {
            console.log("ERROR")
        } else {
            console.log("Все прошло окей")
        }
    })
})

app.put("api/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const {name, role, isLogin} = req.body
    const sql = `UPDATE users SET name = '${name}', role = '${role}', isLogin = '${isLogin}' WHERE id = ${userId}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:');
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Пользователь успешно обновлен' });
        }
    })
})


app.listen(PORT, () => {
    console.log("app is listening to port 5555")
})