import { Router } from "express"
import ProductManager from "../managers/productManager.js"

const router = Router()
const manager = new ProductManager()

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts()
    const { limit } = req.query
    if (limit) return res.json(products.slice(0, Number(limit)))
    res.json(products)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get("/:pid", async (req, res) => {
  try {
    const product = await manager.getProductById(req.params.pid)
    res.json(product)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const product = await manager.addProduct(req.body)
    res.status(201).json(product)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.put("/:pid", async (req, res) => {
  try {
    const updated = await manager.updateProduct(req.params.pid, req.body)
    res.json(updated)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

router.delete("/:pid", async (req, res) => {
  try {
    await manager.deleteProduct(req.params.pid)
    res.json({ message: "Producto eliminado" })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

export default router