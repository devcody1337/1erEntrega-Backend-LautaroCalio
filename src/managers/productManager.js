import { productModel } from "../dao/models/product.model.js"

class ProductManager {
    async getProducts({ limit = 10, page = 1, sort, query }) {
        const filter = {}
        if (query) {
            if (query === 'true' || query === 'false') {
                filter.status = query === 'true'
            } else {
                filter.category = query
            }
        }

        const sortOptions = {}
        if (sort === 'asc') sortOptions.price = 1
        if (sort === 'desc') sortOptions.price = -1

        return await productModel.paginate(filter, { limit, page, sort: sortOptions, lean: true })
    }

    async addProduct(product) {
        return await productModel.create(product)
    }

    async getProductById(id) {
        return await productModel.findById(id).lean()
    }

    async updateProduct(id, updates) {
        return await productModel.findByIdAndUpdate(id, updates, { new: true })
    }

    async deleteProductById(id) {
        return await productModel.findByIdAndDelete(id)
    }
}

export default ProductManager