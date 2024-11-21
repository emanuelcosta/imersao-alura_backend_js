import express from "express"
import routes from "./src/routes/routes.js"

const app = express()
routes(app)

app.listen(3000, (req, res) => {
    console.log("Servidor escutando...")
})