const express = require ('express')
const request = require('request-promise')

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;


// const apiKey = process.env.APIKEY

const generateScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())
app.get('/', (req, res) =>{
    return res.send('Welcome to Amzon Scrapper API')
});

//GETproduct Details
app.get('/products/:productId', async(req, res)=>{
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response))
    }catch (error){
        res.json({
            message: 'Produto não encontrado',
            error,
        })

    }
});

//GET Product reviews
app.get('/products/:productId/reviews', async(req,res)=>{
    const {productId} = req.params;
    const api_key = req.query

    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response))

    }catch(error){
        res.json(error)
    }
});

//GET Product Offers
app.get('/products/:productId/offers', async(req,res)=>{
    const {productId} = req.params;
    const api_key = req.query;

    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response))

    }catch(error){
        res.json(error)
    }
});

//GET Search Results
app.get('/search/:searchQuery', async(req, res)=>{
    const {searchQuery} = req.params;
    const api_key = req.query;
    try{
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }

})


app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} Estudos parados no minuto 23:00`))