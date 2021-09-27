'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const server = express();
server.use(cors());
const PORT = process.env.PORT


const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/Books')

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
    
});

const BookModel = mongoose.model('Book', bookSchema);

function seedBook(){ 
    const filght = new BookModel({
        title: 'filght',
        description: 'every thing goes wrong in this flight',
        status: 'available',
        email: 'd.alatoum@gmail.com'
        
    })
    const theArrival = new BookModel({
        title: 'theArrival',
        description: 'have you heard about MASON ?',
        status: 'not available',
        email: 'd.alatoum@gmail.com'
        
    })
    const tribleSix = new BookModel({
        title: 'tribleSix',
        description: 'did you ever heard about ELFs you might not ',
        status: 'available',
        email: 'tariq.Etoum@Etoum.com'
        
    })
    
    filght.save()
    theArrival.save()
    tribleSix.save()
    
    
}

// seedBook();

server.get('/books',bookshandler);

// localhost:3002/books?email=d.alatoum@gmail.com
function bookshandler(req,res){
    let email1 = req.query.email
    BookModel.find({email:email1},(error,bookData)=>{

        if(error){
            console.log('error in getting data',error);
        }else{
            console.log(bookData);
            res.send(bookData)
        }

    })
}



server.get('/',homehandler);

function homehandler(req,res){
    res.send('all good')
}


server.listen(PORT,()=>{
    console.log('ON PORT'+PORT);
})