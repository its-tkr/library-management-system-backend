// Express Setup
const express=require('express');
const app=express();
const cors =require('cors');

// Connect With DB
const db=require('./db').connectDB();

// Importing Routes
const authRoute=require('./routes/authRoute');
const booksRoute=require('./routes/booksRoute');
const rentbookRoute=require('./routes/rentbookRoute');

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/user',authRoute); 
app.use('/api/books',booksRoute);
app.use('/api/rentBooks',rentbookRoute);

// Starting server
app.listen("3000",()=>{
    console.log("server started");
});