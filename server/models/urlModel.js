import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    url : {type: String, required: true},
    sortedUrl : {type: String, required: true}
})

const urlModel = mongoose.models.url || mongoose.model('url', urlSchema);

export default urlModel;