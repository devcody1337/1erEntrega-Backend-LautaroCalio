import fs from "fs/promises"
import crypto from "crypto"

class ProductManager {
  constructor() {
    this.pathFile = "./src/data/products.json"
  }

  async getProducts() {
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8")
      return JSON.parse(fileData)
    } catch (error) {
      return []
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts()

      const { title, description, code, price, stock, category } = product
      if (!title || !description || !code || !price || !stock || !category) {
        throw new Error("Todos los campos son obligatorios")
      }

      if (products.some(p => p.code === code)) {
        throw new Error("El código del producto ya existe")
      }

      const newProduct = {
        id: crypto.randomUUID(),
        ...product,
        status: true,
        thumbnails: product.thumbnails || []
      }

      products.push(newProduct)
      await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2))
      return newProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductById(id) {
    const products = await this.getProducts()
    const product = products.find(p => p.id === id)
    if (!product) throw new Error("Producto no encontrado")
    return product
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts()
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) throw new Error("Producto no encontrado")

    const { id: _, ...rest } = updates
    products[index] = { ...products[index], ...rest }

    await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2))
    return products[index]
  }

  async deleteProduct(id) {
    const products = await this.getProducts()
    const newProducts = products.filter(p => p.id !== id)

    if (products.length === newProducts.length) throw new Error("Producto no encontrado")

    await fs.writeFile(this.pathFile, JSON.stringify(newProducts, null, 2))
  }
}

export default ProductManager