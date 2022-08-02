import express from 'express';
import connectDB from './config/db.mjs';
import fileRouter  from './routes/files.mjs';
import showRouter  from './routes/show.mjs';
import downloadRouter from './routes/download.mjs';
import sendEmailRouter from './routes/sendEmail.mjs'
import path from 'path';
connectDB();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Template engine
app.set('views', path.join(process.cwd(),"/views"));
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('index');
})

//Routing
app.use('/api/files', fileRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);
app.use('/files/download/email', sendEmailRouter);

const PORT= process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`);
})