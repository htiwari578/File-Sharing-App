import express from "express";
var router = express.Router();
import multer from "multer";
import File from "../models/Schema.mjs";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import deleteFile from "./deletefile.mjs"

let storage=multer.diskStorage({
    destination:(req,file,callback) =>callback(null,process.cwd()+"/Uploads"),
    filename:(req,file,callback) =>{
        const uniqueName =`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        callback(null,uniqueName);
    }
})


let upload=multer({
    storage,
    limits: {fileSize: 1000000 *100} //100 mb Limit.  conveted to bytes
}).single('myfile'); 


router.post('/', (req,res) => {
    
    //store file
    upload(req,res, async (err) => {
    //validate request
    if(!req.file)
    {
        return res.json({error: 'All fields are required'})
    }
        if(err)
        {
            return res.status(500).send({error: err.message})
        }
        

        //store in database
        var uuidGenerate=uuidv4();
        var linkGenerate=`${process.env.APP_BASE_URL}/files/${uuidGenerate}`;
        var downloadLink="Not Generated yet";
        const file = new File({
            filename: req.file.filename ,
            uuid:uuidGenerate,
            path:req.file.path,
            size:req.file.size,
            link:linkGenerate,
            downloadLink:downloadLink,
            sender:null,
            receiver:null
        })
        
        
        //Response -> Link
        const response = await file.save();
        setTimeout(deleteFile, 172800000, req.file.path);
        
        return res.redirect(`${linkGenerate}`)

    })

})

export default router;