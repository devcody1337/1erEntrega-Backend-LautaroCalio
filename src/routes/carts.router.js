import { Router } from "express"
import CartManager from "../managers/cartManager.js"

const router = Router()
const manager = new CartManager()

router.post("/", async (req, res) => {
  try {
    const cart = await manager.createCart()
    res.status(201).json(cart)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get("/:cid", async (req, res) => {
  try {
    const cart = await manager.getCartById(req.params.cid)
    res.json(cart.products)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await manager.addProductToCart(req.params.cid, req.params.pid)
    res.json(cart)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

export default router