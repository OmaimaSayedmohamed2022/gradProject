const express=require('express');
const app = express();
const PORT = 3000;
app.use(express.json())
const mongoose= require('mongoose')



const userRouter = require('./routes/userRouter');


app.use('/user',userRouter)


mongoose.connect('mongodb+srv://omaimasayed:U!FCRc7.GvaXyYE@cluster0.new6ufh.mongodb.net/')

.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
