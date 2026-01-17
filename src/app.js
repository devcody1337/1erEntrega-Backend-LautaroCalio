import express from "express"
import { engine } from "express-handlebars"
import mongoose from "mongoose"
import path from "path"
import __dirname from "./utils.js"

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

const app = express()
const PORT = 8080

const MONGO_URI = "mongodb+srv://testback:testback@cluster0.srstlip.mongodb.net/?appName=Cluster0"

mongoose.connect(MONGO_URI)
    .then(() => console.log("Conectado a DB"))
    .catch(e => console.error("Error conectando a DB:", e))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))