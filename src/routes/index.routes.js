import { Router } from "express"

import suspeitosRoutes from "./bets.routes.js"
const routes = Router()

routes.get("/", (req, res) => {
    return res.status(200).send({ message: "hello, world"})
})

routes.use("/suspeitos", suspeitosRoutes)
export default routes