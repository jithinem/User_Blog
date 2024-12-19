const express = require("express");
const router = express.Router();

const userRoute = require("./user"); 
const blogRoute = require("./blog"); 


const defaultRoutes = [
  {
    path: "/user",
    route: userRoute, 
  },
  {
    path: "/blog",
    route: blogRoute, 
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route); 
});

module.exports = router; 
