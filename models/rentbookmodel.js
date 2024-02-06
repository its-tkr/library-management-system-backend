
const mongoose=require("mongoose");
const ObjectId= mongoose.Types.ObjectId
const schema = mongoose.Schema({
    bookId:{
        type:ObjectId,
        required:true

    },
    userId:{
        type:ObjectId,
        required:true
    },
    rentDate:{
        type:Date,
        required:true
    },
    returnDate:{
        type:Date,
        required:true
    }
});
module.exports=mongoose.model('RentBooks',schema);