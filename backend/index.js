const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    'https://understood-linen.surge.sh',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5000',
    'https://tech-hub-backend-lake.vercel.app'
  ],
  Credentials: true,
  optionSuccessStatus : 200
};

app.use(express.json());
app.use(cors(corsOptions));

//===================================== All Handler Call===========================================//
const userHandler = require("./RouteHandler/UserHandler/userHandler");
const categoryHandler = require("./RouteHandler/CategoryHandler/categoryHandler");
const stockCategoryHandler = require("./RouteHandler/CategoryHandler/stockCategoryHandler");
const productHandler = require("./RouteHandler/ProductHandler/product");
const stockHandler = require("./RouteHandler/PurchaseHandler/purchaseHandler");
const saleHandler = require("./RouteHandler/Sale/sale");
const bookings = require("./RouteHandler/BookingsHandler/bookingsHandler");
const auth = require("./RouteHandler/Auth/auth");
const allCollection = require("./Utils/allCollection");
const profile = require("./RouteHandler/UserHandler/profile");
const contact = require("./RouteHandler/ContactHandler/contactHandler");
const expense = require("./RouteHandler/ExpenseHandler/expenseHandler");
const expenseCategory = require("./RouteHandler/CategoryHandler/expenseCategory");
const role = require("./RouteHandler/RoleHandler/roleHandler");
const report = require("./RouteHandler/Report/report");
const bulkReport = require("./RouteHandler/Report/bulkReport");
const monthlyReport = require("./RouteHandler/Report/monthWiseReport");
const brand = require("./RouteHandler/BrandHandler/brandHandler");
const tag = require("./RouteHandler/Tag/tagHandler");
// web part ===================================================
const webProducts = require("./RouteHandler/WebPart/webProduct");
const webBookings = require("./RouteHandler/WebPart/bookings");
const webCart = require("./RouteHandler/WebPart/cart");

// ======================================== Image Folder ===========================================//
const UPLOAD_FOLDER = path.join(__dirname, './Upload/product/images');
// const UPLOAD_FOLDER = path.join('/tmp', './Upload/product/images');

const UPLOAD_PROFILE = path.join(__dirname, './Upload/profile/images');
// const UPLOAD_PROFILE = path.join('/tmp', './Upload/profile/images'); 

const UPLOAD_LOGO = path.join(__dirname, './Upload/logo');
// const UPLOAD_PROFILE = path.join('/tmp', './Upload/profile/images'); 
// ======================================== Image Folder ===========================================//

app.use("/upload/product/images", express.static(UPLOAD_FOLDER));
app.use("/upload/profile/images", express.static(UPLOAD_PROFILE));
app.use("/upload/logo", express.static(UPLOAD_LOGO));

mongoose
  .connect(process.env.CONNECTION_URI)
  .then(() => console.log("Database Connect Successfully"))
  .catch((err) => console.log(err));


app.use("/api", auth);
app.use("/api", userHandler);
app.use("/api", categoryHandler);
app.use("/api", productHandler);
app.use("/api", bookings);
app.use("/api", allCollection);
app.use("/api", profile);
app.use("/api", contact);
app.use("/api", expenseCategory);
app.use("/api", expense);
app.use("/api", role);
app.use("/api", stockHandler);
app.use("/api", saleHandler);
app.use("/api", stockCategoryHandler);
app.use("/api", report);
app.use("/api", bulkReport);
app.use("/api", monthlyReport);
app.use("/api", brand);
app.use("/api", tag);
app.use("/api", webProducts);
app.use("/api", webBookings);
app.use("/api", webCart);

app.get("/", (req, res) => {
  res.send("Tech Hub is running!");
});

app.listen(port, () => {
  console.log(`Tech Hub is running on port ${port}`);
});
