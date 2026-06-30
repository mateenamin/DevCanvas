import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/config.js';
import router from './routes/index.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT


app.use(express.json());
app.use('/api/v1' , router)

// app.get('/',(req, res)=>{
    
//    res.send("Server running!");
// });

connectDB().then(()=>{
  app.listen(PORT , ()=>{
    console.log(`Server started on port${PORT}`);
});
});
