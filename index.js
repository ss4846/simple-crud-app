const express =  require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.send('hello from node api');
});


//show all products

app.get('/api/products', async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).send(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


//show product by id

app.get('/api/products/:id', async (req, res)=>{
    try{
        const { id } = req.params;                     //destructing an object
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "product not found"});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


//create a product

app.post('/api/products', async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(error){
        res.status(500).json({message: error.message});
        console.log(error);
    }
});


//update a product

app.put('/api/products/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body); 
        if(!product){
            return res.status(404).json({message: "product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


//delete a product

app.delete('/api/products/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
});


//connect to database and listen

mongoose.connect('mongodb+srv://shaikmohammadomar6:iARJ9iqtpUCyiYI5@cluster0.c1pbv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connected to database!');
    app.listen(PORT, ()=>{
        console.log(`server is running on ${PORT}`)
    });
})
.catch(()=>{
    console.log('connection failed');
})

