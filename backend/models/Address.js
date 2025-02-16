import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timeStamps: true }
);

const Address = mongoose.model("Address",addressSchema);

export default Address;
