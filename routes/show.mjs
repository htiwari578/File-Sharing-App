import express from "express";
var showRouter = express.Router();
import File from '../models/Schema.mjs';

showRouter.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params["uuid"] });
        if (!file) {
            return res.render('download', { error: "Link has expired" });
        }
        const filter = { uuid: req.params.uuid };
        const update = { downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}` };

        let doc = await File.findOneAndUpdate(filter, update);
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    }
    catch (e) {
        console.log(e);
    }
})
export default showRouter;
