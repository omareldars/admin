const express = require('express');
const mongoose = require('mongoose');

const userRouter=require('./routes/user');
const adminRouter = require('./routes/admin');


const  PORT = 3000;

const app = express();
mongoose.connect('mongodb://localhost:27017/project', { useUnifiedTopology: true
 })
 .then(()=>{
  console.log('connect mongodb successfully');
 })

 .catch((err)=>{
console.error(err);
process.exit(1);
 });


// DB Error Handling
app.get((err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    res.status(402).send('There was a duplicate key error');
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(400).json({ statusCode: 'Bad request' });
  }
  res.status(503).end();
})

 
app.use(express.json());//middleware




app.get('/',(req,res)=>{
  res.render('index');
});

app.use('/users', userRouter);
app.use('/admins', adminRouter);


app.listen(PORT, () => {
    console.info(`App is up and ready on ${PORT}`);
  });