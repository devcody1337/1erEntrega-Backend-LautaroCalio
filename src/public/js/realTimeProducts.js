const socket = io()

const productsList = document.getElementById("products-list")

socket.on("updateProducts", (products) => {
    console.log("Lista de productos actualizada recibida desde el servidor")
    
    productsList.innerHTML = ""

    products.forEach((product) => {
        const div = document.createElement("div")
        div.style = "border: 1px solid gray; margin: 10px; padding: 10px;"
        div.innerHTML = `
            <h3>${product.title}</h3>
            <p>Precio: $${product.price}</p>
            <p>Descripción: ${product.description}</p>
        `
        productsList.appendChild(div)
    })
})