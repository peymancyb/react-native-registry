import express from 'express';
const app = express();


//Handle / route

app.get('/',(req,res) => res.send('Hello world!'));

//launch server on port 3000

const server = app.listen(3000, ()=> {
  const {address,port}
})
