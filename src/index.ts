import express, {Request, Response} from 'express'
import {router} from "./users/users.js";

const port = 8000;
const app = express();




app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello world')
})

app.use('/users', router)

app.listen(port, () => {
    console.log('Server running')
})


