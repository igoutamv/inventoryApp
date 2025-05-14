import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: String,           // "Added", "Deleted", "Edited"
  itemName: String,         // Name of the product
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Log", logSchema);
