import { Router } from "express"
import ProductManager from "../managers/productManager.js"

const router = Router()
const productManager = new ProductManager()

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render("home", { products })
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render("realTimeProducts", { products })
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

export default router