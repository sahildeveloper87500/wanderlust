const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js")

const MONGO_URL = "mongodb+srv://sahilsingh87500:Sahil%408750@cluster0.8bso3fs.mongodb.net/electrica";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")))



app.get('/login', (req, res) => {
  res.render('listings/login.ejs'); // Assuming the EJS template is named 'login.ejs'
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check credentials
  if (email === 'sahilsingh@gmail.com' && password === '123456') {
    // Redirect to /listings if credentials are correct
    res.redirect('/listings');
  } else {
    // Redirect to a different page if credentials are incorrect
    res.redirect('/listings2'); // Change this route as needed
  }
});


//Index Route
app.get("/listings", wrapAsync
  (
    async (req, res) => {
      const allListings = await Listing.find({});
      res.render("listings/index.ejs", { allListings });
    }
  )
);
// new changes
app.get("/listings2", wrapAsync
  (
    async (req, res) => {
      const allListings = await Listing.find({});
      res.render("listings2/index2.ejs", { allListings });
    }
  )
);


//New Route
app.get("/listings/new", wrapAsync(
  (req, res) => {
    res.render("listings/new.ejs");
  }
)
);

//Show Route
app.get("/listings/:id", wrapAsync(
  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  }
)
);

//new changes
app.get("/listings2/:id", wrapAsync(
  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings2/show2.ejs", { listing });
  }
)
);

//Create Route
app.post("/listings",wrapAsync(
  async (req, res,next) => {
    if(!req.body.listing){
      throw new ExpressError(400,"send valid data for listing!"); 
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }
)
);

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//    city:"faridabad",
//    totalProduction:1200,
//    totalDemand: 1300,
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not Found"));
})
app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong"}=err;
  res.render("error.ejs",{message});
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
