const app = require('./index');
const supertest = require('supertest')

const request = supertest(app);

describe('The Stocks API Endpoints Unit Testing', () => {

     describe('Stocks List ( GET Method )',() => {
        
        //display the all of lists
        it('Display All of The Stocks',async() => {
           const res = await request.get('/stocks');   
           expect(res.status).toBe(200);
        });

        //accepted the correct data and can be displayed
        it('Display Each Stock of The Stocks ( ID ) ',async() => {
         await request.post('/stocks').send([{
            "stock_name" : "MyMoMo",
            "stock_category" : "Food",
            "stock_price" : 12,
            "stock_remaining" : 10000
          }]);

        const res =  await request.get('/stocks')
        expect(res.body[4].stock_id).toBe(4);

        });
        //turn error with the no stocks 
        it('Have no stocks remaining ',() => {
           return request.get('/stocks/100000').expect(404);
        });
     });

     describe('Stocks Creating ( POST Method )',() => {
        //accepted with full data 
        it('Complete Creating Multiple Stocks',() => {
          return request.post('/stocks').send([{
            "stock_name": "Woohoo",
            "stock_category": "Toys",
            "stock_price": 1290,
            "stock_remaining": 250
          },
          {
            "stock_name": "AirPods",
            "stock_category": "Electronics",
            "stock_price": 9590,
            "stock_remaining": 100
          }
        ]).expect(201);
        });

        it('Complete Single Stock parsing by Array',()=>{
            return request.post('/stocks').send([{
                "stock_name" : "Iboprufen",
                "stock_category" : "Pharmaceutical", 
                "stock_price" : 500,
                "stock_remaining" : 10
            }]).expect(201);
        });

        it('Complete Single Stock by single {} ( server error )',()=>{
            return request.post('/stocks').send({
                "stock_name" : "Iboprufen",
                "stock_category" : "Pharmaceutical", 
                "stock_price" : 500,
                "stock_remaining" : 10
            }).expect(500);
        })

        //accepted with partial data 
        it('Complete Creating with partial data of the Stocks',() =>{
          return request.post('/stocks').send([{
            "stock_name" : "AsusNoteBook",
            "stock_category" : "Electronics"
          }, 
          {
            "stock_price" : 1299, 
          }]).expect(201);
        });

        //don't accepted the null data
        it('Complete Creating with blank data of stocks',()=> {
          return request.post('/stocks').send({
          }).expect(500);
        });
        //don't accept the mismatch data
        it('Complete Creating with mismatch data of stocks',()=> {
          return request.post('/stocks').send({
            "stock_id" : "eiei",
            "stock_price" : "Fifty"
          }).expect(500);
        });
     });

     describe('Stocks Details Updating ( PUT Method )',() => {

      it('Update the Complete Stocks Details' ,()=> {
        return request.put('/stocks/1').send({
        "stock_name": "Mama",
        "stock_category": "Food",
        "stock_price": 10,
        "stock_remaining": 100000}).expect(200);
      });

      it('Update the Stocks with Partial Data ',()=> {
        return request.put('/stocks/1').send({
          "stock_name": "Mama",
          "stock_category": "Food",
          "stock_price": 10}).expect(200);
        });

        it('Update Stocks Details Mismatch Updating ',()=> {
          return request.put('/stocks/1').send({
            "stock_name": 555 }).expect(200);
        });
  
        it('Update Stocks NULL data Updating ',()=>{
          return request.put('/stocks/1').send({}).expect(200);
        });
  
        it('Not Found the Products ',()=>{
          return request.put('/stocks/100000000').send({}).expect(404); 
        });
      });

      describe('Stocks Deleting ( DELETE Method )',() => {
        it('deletes product',() => {
          return request.delete('/stocks/1').expect(200); 
        });
  
        it('Have no more products to deletes ',()=> {
          return request.get('/stocks/100000').expect(404);
        });
    });  
});