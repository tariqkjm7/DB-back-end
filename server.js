'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT

const BookModel = require('./moduls/BookDB')

const mongoose = require('mongoose')
const MONGO_SERVER_LINK = process.env.MONGO_SERVER_LINK

mongoose.connect(`${MONGO_SERVER_LINK}`)


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
    const anything = new BookModel({
        title: 'tribleSix',
        description: 'did you ever heard about ELFs you might not ',
        status: 'available',
        email: 'd.alatoum@gmail.com'
        
    })
    
    // filght.save()
    // theArrival.save()
    // tribleSix.save()
    // anything.save()
}

// seedBook();



// localhost:3002/books?email=d.alatoum@gmail.com
server.get('/',homehandler);
server.get('/books',bookshandler);
server.post('/addBook',addBooks)
server.delete('/deleteBooks',deleteBooks)
server.delete('/deleteBooks',deleteBooks)
server.put('/update',updateBooks)


function bookshandler(req,res){
    let email = req.query.email
    BookModel.find({email:email},(error,bookData)=>{
        
        if(error){
            console.log('error in getting data',error);
        }else{
            console.log(bookData);
            res.send(bookData)
        }
        
    })
}

function homehandler(req,res){
    res.send('all good')
}
async function addBooks(req,res){
    let {  email ,title, description,status } = req.body;
    console.log(req.body);
    await BookModel.create({
       email: email,
       title: title,
       description:  description,
       status:  status
    })
    await BookModel.find({email:email}, function(error,bookData){
        if(error){console.log('error in getting data ' , error);
    }else{
            console.log(bookData);
            res.send(bookData) 
        
        }
    })

}

function deleteBooks(req, res) {
    let bookID = req.query.bookID;
    let email = req.query.email;
    BookModel.deleteOne({ _id: bookID }).then(() => {
        BookModel.find({email:email}, function(error,bookData){
            if(error){console.log('error in getting data ' , error);}
            else{res.send(bookData)}
        })
    })
}

function updateBooks(req,res){

    console.log('back enddddddddd',req.body);
let{title,description,status,id,email} = req.body

    BookModel.findByIdAndUpdate(id,  {title,description,status} , (error,finalData)=>{
        if(error){
            console.log('error in getting data');
        }else{
            console.log('finalData',finalData);
            BookModel.find({email:email}, function(error,bookData){
                if(error){console.log('error in getting data ' , error);}
                else{res.send(bookData)}
            })
        }

    })
}




server.listen(PORT,()=>{
    console.log('ON PORT'+PORT);
})