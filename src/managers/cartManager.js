import fs from "fs/promises"
import crypto from "crypto"

class CartManager {
  constructor() {
    this.pathFile = "./src/data/carts.json"
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.pathFile, "utf-8")
      return JSON.parse(data)
    } catch {
      return []
    }
  }

  async createCart() {
    const carts = await this.getCarts()
    const newCart = { id: crypto.randomUUID(), products: [] }
    
    carts.push(newCart)
    await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2))
    return newCart
  }

  async getCartById(cid) {
    const carts = await this.getCarts()
    const cart = carts.find(c => c.id === cid)
    if (!cart) throw new Error("Carrito no encontrado")
    return cart
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts()
    const cartIndex = carts.findIndex(c => c.id === cid)
    
    if (cartIndex === -1) throw new Error("Carrito no encontrado")

    const productIndex = carts[cartIndex].products.findIndex(p => p.product === pid)

    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity++
    } else {
      carts[cartIndex].products.push({ product: pid, quantity: 1 })
    }

    await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2))
    return carts[cartIndex]
  }
}

export default CartManager