import { Router } from "express"
import ProductManager from "../managers/productManager.js"

const router = Router()
const manager = new ProductManager()

router.get("/", async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query
        const products = await manager.getProducts({ limit, page, sort, query })
        
        res.json({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit||10}&sort=${sort||''}&query=${query||''}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit||10}&sort=${sort||''}&query=${query||''}` : null
        })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const newProduct = await manager.addProduct(req.body)
        res.status(201).json({ status: "success", payload: newProduct })
    } catch (error) {
        res.status(400).json({ status: "error", error: error.message })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const updated = await manager.updateProduct(req.params.pid, req.body)
        res.json({ status: "success", payload: updated })
    } catch (error) {
        res.status(400).json({ status: "error", error: error.message })
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        await manager.deleteProductById(req.params.pid)
        res.json({ status: "success", message: "Producto eliminado" })
    } catch (error) {
        res.status(400).json({ status: "error", error: error.message })
    }
})

export default router