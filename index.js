import { Sites } from "./src/v1/sites/sites.js"
import express from "express"
import cors from 'cors'

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};
  
app.use(cors(corsOptions));

const PORT = 3030;

app.get('/', (req, resp) => {
    resp.send({
        Welcome: 'Welcome to my api for more advanced requests to the met api'
    });
});

app.get('/v1/sites/region', (req, resp) => {
    const sites = new Sites();
    sites.getSitesForRegion(req.query).then((data) => {
        resp.send(data);
    });
});

app.get('/check', (req, resp) => {
    resp.send({system:true});
})

app.get('/v1/sites/auth-area', (req, resp) => {
    const sites = new Sites();
    sites.getSitesForAuthArea(req.query).then((data) => {
        resp.send(data);
    });
});

app.get('/v1/sites', (req, resp) => {
    let sites = new Sites();
    sites.getSites().then(data => {
        resp.send(data)
    })
});

app.listen(
    PORT,
    () => console.log(`Server Started on http://localhost:${PORT}`)
);