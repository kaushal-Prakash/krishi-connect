import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phNumber: { type: String, required: true, unique: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    username : {type : String , required : true, unique : true},
    kccId: { type: String, required: true, unique: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer",farmerSchema);

export default Farmer;