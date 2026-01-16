import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role: {
      type: String,
      enum: ["citizen", "moderator", "authority"],
      default: "citizen"
    },
     area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area"
    }
  },
  { timestamps: true }

);

export default mongoose.model("User", userSchema);