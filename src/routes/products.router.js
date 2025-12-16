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
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const newProduct = await manager.addProduct(req.body)
    
    const products = await manager.getProducts()
    
    req.io.emit("updateProducts", products)

    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/:pid", async (req, res) => {
  try {
    await manager.deleteProductById(req.params.pid)
    
    const products = await manager.getProducts()
    
    req.io.emit("updateProducts", products)

    res.json({ message: "Producto eliminado" })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

export default router