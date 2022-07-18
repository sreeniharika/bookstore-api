import mongoose from "mongoose";

const {Schema} = mongoose;

const bookSchema = new Schema({

   isbn: {
    type: String,
    trim: true,
    required: true
   },

   title: {
    type: String,
    trim: true,
    required: true
   },

   subTitle: {
    type: String,
    trim: true,
    required: true
   },
   author: {
    type: String,
    trim: true,
    required: true
   },
   publish_date:{
    type:Date,
    default: Date.now()
   },

   publisher:{
    type:String,
    trim: true,
    required: true
   },
   pages:{
    type:Number,
    trim: true,
    required: true
   },
   description:{
    type:String,
    trim: true,
    required: true
   }
});

export default mongoose.model("Book",bookSchema);