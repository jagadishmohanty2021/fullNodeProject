const express = require("express");
const createError=require("http-errors")
const app = express();
const Router=express.Router();
require("dotenv").config();
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options={
    explorer:true,
    swaggerDefinition:{
        info:{
            tittle:"Learning APIs",
            description:"List of Learning apis",
            contact:{
                name:"Dev"
            },
            server:['http://localhost:'+ process.env.PORT]
        }
    },
    apis:['src/swagger/swagger.js']
}

const swaggerDocs = swaggerJsDoc(options);
app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CROSURL||'*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    return
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api',Router)

app.use((req,res,next)=>{
next(createError(404));
return
})

app.listen(process.env.PORT||3000,()=>{
    console.log("Server connected......")
})
require('./src/router/router')(Router);