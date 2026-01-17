import { cartModel } from "../dao/models/cart.model.js"

class CartManager {
    async createCart() {
        return await cartModel.create({ products: [] })
    }

    async getCartById(id) {
        return await cartModel.findById(id).populate("products.product").lean()
    }

    async addProductToCart(cid, pid) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid)

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++
        } else {
            cart.products.push({ product: pid, quantity: 1 })
        }
        
        return await cart.save()
    }

    async deleteProductFromCart(cid, pid) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")
        
        cart.products = cart.products.filter(p => p.product._id.toString() !== pid)
        
        return await cart.save()
    }

    async updateCart(cid, products) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")
        
        cart.products = products
        return await cart.save()
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")
        
        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid)
        
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity
        }
        
        return await cart.save()
    }

    async deleteAllProducts(cid) {
        const cart = await cartModel.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        )

        if (!cart) throw new Error("Carrito no encontrado")
        
        return cart
    }
}

export default CartManager