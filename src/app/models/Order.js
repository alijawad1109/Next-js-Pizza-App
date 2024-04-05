import { Schema, model, models } from "mongoose";

const OrderShema = new Schema({
    userEmail:String,
    phone:Number,
    city:String,
    code:String,
    country:String,
    address:String,
    cartItems:Object,
    paid:{type:Boolean,default:false},
},{timestamps:true})
export const Order =models?.Order || model('Order', OrderShema)