import express, { request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import post from './routes/post.js';
import user from './routes/user.js';
import mongoose from 'mongoose';

// node -r esm index.js
dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use('/posts', post);
app.use('/user', user);

app.get('/', (req, res) => {
    res.send('server');
});
    
const PORT = process.env.PORT

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => 
    app.listen(PORT, () =>{
        console.log( `Server Running on Port: ${PORT}` );
    }
))
.catch((err) => {
    console.log(err)
});


export default app;
