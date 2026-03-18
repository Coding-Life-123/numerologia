import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: false
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true
        },
        role:{
            type:String,
            enum:["user", "admin"],
            default:"user"
        },
        password:{
            type: String,
            required:true,
        },
        birth_date:{
            type: String,
            required: true
        },
        status:{
            type: String,
            enum:["activo", "inactivo"],
            default:"inactivo"
        },
        resetCode: {
            type: String,
            default: null
        },
        codeExpireDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps:true
    }
);

export default mongoose.model("User", userSchema);