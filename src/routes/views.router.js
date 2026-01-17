import { Router } from "express"
import ProductManager from "../managers/productManager.js"
import CartManager from "../managers/cartManager.js"

const router = Router()
const productManager = new ProductManager()
const cartManager = new CartManager()

router.get("/products", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const products = await productManager.getProducts({ page, limit })
        res.render("products", {
            products: products.docs,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page
        })
    } catch (error) {
        res.status(500).send("Error de servidor")
    }
})

router.get("/carts/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        res.render("cart", { products: cart.products })
    } catch (error) {
        res.status(500).send("Error de servidor")
    }
})

export default router