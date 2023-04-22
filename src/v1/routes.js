import express from "express"
import { Sites } from './sites/sites.js'
const routes = express.Router()

routes.get('/', (req,resp) => {
    resp.send({welcome: 'Welcome to v1 api interface'})
})

routes.get('/sites/region', (req, resp) => {
    const sites = new Sites();
    sites.getSitesForRegion(req.query).then((data) => {
        resp.send(data);
    });
});



routes.get('/sites/auth-area', (req, resp) => {
    const sites = new Sites();
    sites.getSitesForAuthArea(req.query).then((data) => {
        resp.send(data);
    });
});

routes.get('/sites', (req, resp) => {
    let sites = new Sites();
    sites.getSites().then(data => {
        resp.send(data)
    })
});

export default routes