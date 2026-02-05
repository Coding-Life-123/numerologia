import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            index:true
        },
        type:{
            type:String,
            required: true,
            enum:["main", "daily"],
            trim:true
        },
        content:{
            lecture:{
                type:String,
                required:true
            }
        }        
    },
    {
        timestamps:true
    }
);

export default mongoose.model("Lecture", lectureSchema);