import mongoose from "mongoose";
import { MenuItems } from "../../models/MenuItems";
import { isAdmin } from "../auth/[...nextauth]/route";
export async function POST(req) {
  mongoose.connect(
    "mongodb+srv://AJStyle:Admin1101@cluster0.lucezsz.mongodb.net/Food-order"
  );
  if(await isAdmin){
    const {
      name,
      price,
      description,
      image,
      extraIngredientsPrices,
      sizes,
      category,
    } = await req.json();
    return Response.json(
      await MenuItems.create({
        name,
        description,
        price,
        image,
        extraIngredientsPrices,
        sizes,
        category,
      })
    );
  }else{
    return Response.json({})
  }
}

export async function PUT(req) {
  mongoose.connect(
    "mongodb+srv://AJStyle:Admin1101@cluster0.lucezsz.mongodb.net/Food-order"
  );
  if (await isAdmin) {
    const {
      _id,
      name,
      price,
      description,
      image,
      extraIngredientsPrices,
      sizes,
      category,
    } = await req.json();
    await MenuItems.updateMany(
      { _id },
      {
        name,
        price,
        description,
        image,
        extraIngredientsPrices,
        sizes,
        category,
      }
    );
  }
  return Response.json(true);
}
export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await MenuItems.deleteOne({ _id });
  }
  return Response.json(true);
}
export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
    return Response.json(await MenuItems.find());
}
