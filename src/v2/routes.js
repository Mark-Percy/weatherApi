import express from "express"
const routes = express.Router()

routes.get('/', (req,resp) => {
    resp.send({welcome: 'Welcome to v2 api interface'})
})

export default routes