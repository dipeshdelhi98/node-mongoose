const express=require('express');
const app=express();
const PORT=1337;
const mongoose=require('mongoose');
const URL='mongodb+srv://root:root@cluster0.9gwkj.mongodb.net/localDb?retryWrites=true&w=majority'
const productRoutes=require('./routes/productRoutes');

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },()=>{
    console.log("Database connected Successfully")
})

app.use(express.json());

app.use('/api/products',productRoutes);

app.get('/',(req,res)=>{
    res.send({message:"Express "})
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})