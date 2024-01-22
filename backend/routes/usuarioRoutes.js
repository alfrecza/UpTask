import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hola mundo")
})

router.post('/', (req, res) => {
    res.send("Desde post api/usuario")
})


export default router