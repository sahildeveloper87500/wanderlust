const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
 city:String,
  description: String,
  totalProduction:Number,
  firstHour:Number,
  secondHour:Number,
  thirdHour:Number,
  ForthHour:Number,
  fifthdHour:Number,
  sixthHour:Number,
  seventhHour:Number,
  eightHour:Number,
  NinthHour:Number,
  tenthHour:Number,
  eleventhHour:Number,
  twelveHour:Number,
  thirteenHour:Number,
  fourteenHour:Number,
  fifteenHour:Number,
  sixteenHour:Number,
  seventeenHour:Number,
  eighteenHour:Number,
  nineteenHour:Number,
  twentyHour:Number,
  twenthoneHour:Number,
  twenthtwoHour:Number,
  twentythreeHour:Number,
  twentyfourHour:Number,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
