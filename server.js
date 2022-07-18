import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {readdirSync} from 'fs';


dotenv.config();

const app = express();





app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



// auto reload routes

 readdirSync('./routes').map((r)=>app.use('/api',require(`./routes/${r}`)));


//port
const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`Server is running on ${port}`));
