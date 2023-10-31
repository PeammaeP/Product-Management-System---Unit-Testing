const express = require('express');
const app = express(); 
//const morgan = require('morgan'); 
const stocks = require('./stocks.json');
const port = 3000;

//app.use(morgan('combined')); //display all logging in terminal
app.use(express.json()); //middleware for parsing JSON

/* Middleware for logging, This is the part of looking the any request method on terminal
which clients do such as GET , POST , PUT , DELETE */
app.use((req, res, next) => {
  /* Display the methods request for /any_actions */
  console.log(`${req.method} request for ${req.url}`);
  next();
});
/* end of logging procedure */

/* Show all of list in The Stocks which remaining */
app.get('/stocks', (req, res) => {
    /* return responds which can open and display all products in JSON file */
    res.json(stocks);
});
/* end of display all stocks procedure */

/* Each Stock will be displayed in this GET Endpoint */
app.get('/stocks/:stock_id', (req, res) => {
    /* creating myStocks which using find method which called the object by parameters */
    const myStocks = stocks.find(st => st.stock_id === parseInt(req.params.stock_id));
    /* if doesn't found --> return 404 status */
    if (!myStocks || myStocks === undefined) return res.status(404).send('!! The Stocks Not Found !!');
    /* product was found --> display that product*/
    res.json(myStocks);
  });
/* end of display each stock with id procedure*/

/* POST Method to Add A new stock (product) */

//POST Endpoint which adding the new stock
app.post('/stocks', (req, res) => {
    /* Creating the newStock array to push the new stock */
    const newStocks = [];
    /* Using ForEach Methods to contain the Array of JSON */
    req.body.forEach((stockData) => {
      const newStock = {
        stock_id: stocks.length, // Assign a unique ID
        stock_name: stockData.stock_name,
        stock_category: stockData.stock_category,
        stock_price: stockData.stock_price,
        stock_remaining: stockData.stock_remaining,
      };  
    //push methods which append
    stocks.push(newStock);
    // Add the new stock to the newStocks array
    newStocks.push(newStock);
    });
    //show the successfully push stock 
    res.status(201).json(newStocks);
});
/*end of POST procedure */

/* PUT endpoint for modifying the specific stock */
app.put('/stocks/:stock_id', (req, res) => {
    /* creating myStocks which using find method which called the object by parameters */
    const myStocks = stocks.find(st => st.stock_id === parseInt(req.params.stock_id));
    /* if doesn't found --> return 404 status */
    if (!myStocks || myStocks === undefined) return res.status(404).send('The Product not found');
    /* New Stock Details have modified */
    myStocks.stock_name = req.body.stock_name;
    myStocks.stock_category = req.body.stock_category;
    myStocks.stock_price = req.body.stock_price;
    myStocks.stock_remaining = req.body.stock_remaining;
    //display the modified stock 
    res.json(myStocks);
});
/* end of PUT endpoint  */

/* DELETE endpoint for delete the specific stock*/
app.delete('/stocks/:stock_id', (req, res) => {
    /* creating myStocks which using find method which called the object by parameters */
    const myStocksIndex = stocks.findIndex(st => st.stock_id === parseInt(req.params.stock_id));
    /* if doesn't found --> return 404 status */
    if (myStocksIndex === -1 || myStocksIndex === undefined) return res.status(404).send('Product not found');
    /* deleting the stock by using splice method & array implementation*/
    const deletedStock = stocks.splice(myStocksIndex, 1)[0];
    //display the deleted stock 
    res.json(deletedStock);
});
/* end of DELETE endpoint */

/* A Default Page which the web doesn't link to any methods */
app.get("/",(req,res)=>{
   res.send("!! Welcome To The Stock Management System !!");
});

/* Display on terminal */
// Start the server
app.listen(port, () => {
    console.log(`The Server currently running at <http://localhost>:${port}/stocks`);
});

module.exports = app;