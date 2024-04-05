const { Schema, models, model, default: mongoose } = require("mongoose");

const ExtraPricesSchema = new Schema({
  name: String,
  price: Number,
});
const MenuSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    sizes: { type: [ExtraPricesSchema] },
    extraIngredientsPrices: { type: [ExtraPricesSchema] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Add this line
  },
  { timestamps: true }
);

export const MenuItems = models?.MenuItems || model("MenuItems", MenuSchema);
