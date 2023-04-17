import { Sites } from "./src/v1/sites/sites.js"
import express from "express"
// const app = require('express')();

const app = express() 

const PORT = 3030;

app.get('/', (req, resp) => {
    resp.send({
        Welcome: 'Welcome to my api for more advanced requests to the met api'
    })
});
app.get('/v1/sites/region', (req, resp) => {
    const sites = new Sites()
    sites.getSitesForRegion(req.query).then((data) => {
        resp.send(data)
    })
});
app.get('/v1/sites/auth-area', (req, resp) => {
    const sites = new Sites()
    sites.getSitesForAuthArea(req.query).then((data) => {
        resp.send(data)
    })
});

app.listen(
    PORT,
    () => console.log(`Server Started on http://localhost:${PORT}`)
)