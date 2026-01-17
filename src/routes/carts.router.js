import { Router } from "express"
import CartManager from "../managers/cartManager.js"

const router = Router()
const manager = new CartManager()

router.post("/", async (req, res) => {
    try {
        const newCart = await manager.createCart()
        res.status(201).json({ status: "success", payload: newCart })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cart = await manager.getCartById(req.params.cid)
        if (!cart) return res.status(404).json({ status: "error", error: "Carrito no encontrado" })
        
        res.json({ status: "success", payload: cart })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await manager.addProductToCart(cid, pid)
        res.json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await manager.deleteProductFromCart(cid, pid)
        res.json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body
        const result = await manager.updateCart(cid, products)
        res.json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const result = await manager.updateProductQuantity(cid, pid, quantity)
        res.json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const result = await manager.deleteAllProducts(cid)
        res.json({ status: "success", message: "Carrito vaciado con éxito", payload: result })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

export default router