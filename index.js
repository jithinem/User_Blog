const express = require("express");
const connectDB = require("./db");  
const routes = require("./routes/index"); 
const morgan = require('morgan');



connectDB();

const app = express();


app.use(express.json());

app.use(morgan("dev"));
app.use("/api", routes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
