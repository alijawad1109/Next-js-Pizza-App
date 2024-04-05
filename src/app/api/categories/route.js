import mongoose from "mongoose";
import { Category } from "../../models/Category";
import { url } from "inspector";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL)
    const {name} = await req.json();
    if(await isAdmin){
        return Response.json( await Category.create({name}))
    }else{
        return Response.json({})
    }
}

export async function PUT(req){
    const {_id,name}= await req.json()
    if(await isAdmin()){
        await Category.updateOne({_id}, {name})
    }
    return Response.json(true)
}
export async function GET(){
    return Response.json(
        await Category.find()
    )
}
export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id')
    if(await isAdmin()){
        await Category.deleteOne({_id})
    }
    return Response.json(true)
}