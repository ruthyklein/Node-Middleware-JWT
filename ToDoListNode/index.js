import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from "jsonwebtoken";

import TasksController from './Controllers/TasksController.js';
import TasksRouter from './Routers/TasksRouter.js';


const port = 3000;
const secret = "JIs%WCfS#Sl454d5FX";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.bla)
    req.id = crypto.randomUUID()
    next()
})

app.get('/', (req, res) => {
    res.send({ message: 'hello world!' })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
        const token = jwt.sign({ userId: 1, roles: ["teacher"] }, secret);
        console.log('token', token)
        res.send({ token });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
});

app.use((req, res, next) => {
    const token = req.headers.authorization?.slice(7);
    try {
        if (!token) {
            throw new Error("No token provided");
        }
        const obj = jwt.verify(token, secret);
        req.userId = obj.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send("Invalid token");
        } else {
            res.status(401).send("Authentication error");
        }
    }
});

app.use('/tasks', TasksRouter)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});