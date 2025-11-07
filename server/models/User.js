import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,},
    bots:{type:[mongoose.Schema.Types.ObjectId],ref:"Bot",default:[]},
    gender:{type:String,}
})

export default mongoose.model("User",userSchema)