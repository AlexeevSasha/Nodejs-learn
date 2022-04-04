import express from "express";

const router = express.Router();

router.post('/login', (req, res) => {
    res.send('LOGIN')
})

router.post('/register', (req, res) => {
    res.send('REGISTER')
})

export {router}