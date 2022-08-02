import fs from 'fs';
import File from '../models/Schema.mjs';

const deleteFile =  (path,uuid)=>{
    
fs.unlink(path, (err) => {
    if (err) {
      console.error(err)
      return
    }
    //file removed
    
  })

}
export default deleteFile;