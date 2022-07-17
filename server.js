// const { shopItemsData } = require("./public/javascript/Data");
// const { x } = require("./public/javascript/cart");

// localStorage for Node.js
const LocalStorage = require("node-localstorage").LocalStorage,
  myLocalStorage = new LocalStorage("./public/javascript/cart");
//

// *********** JSDOM ************
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const myFile = JSDOM.fromFile("./public/cart.html").then((dom) => {
  return dom.window.document
    .getElementById("total-price")
    .getElementsByTagName("span")[0]
    .innerHTML.replace(" $", "");
});

// console.log(myFile);
// console.log(myFile.window.document.getElementById("total-price"));

// console.log(myFile.getElementById("total-price"));

// *********** JSDOM ************

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
// const { log } = require("console");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const orderSchema = {
  userName: String,
  email: String,
  phone: String,
  adress: String,
  date: String,
  time: String,
  order: String,
};
const Order = mongoose.model("Order", orderSchema);

// routes
app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});
app.get("/cart", (req, res) => {
  res.sendFile("public/cart.html");
});
app.post("/cart", (req, res) => {
  const date = new Date();
  let newOrder = new Order({
    userName: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    adress: req.body.address,
    order: req.body.user_order,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  });
  newOrder.save();
  // console.log(req.body);
  // console.log(newOrder);
  res.redirect("back");
});

app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});
