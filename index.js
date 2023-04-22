import { Sites } from "./src/v1/sites/sites.js"
import express from "express"
import cors from 'cors'
import pathsv1 from "./src/v1/routes.js";
import pathsv2 from "./src/v2/routes.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
};
  
app.use(cors(corsOptions));
app.use('/v1', pathsv1)
app.use('/v2', pathsv2)

const PORT = 3030;

app.get('/check', (req, resp) => {
    resp.send({system:true});
})

app.listen(
    PORT,
    () => console.log(`Server Started on http://localhost:${PORT}`)
);