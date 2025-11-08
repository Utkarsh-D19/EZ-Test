const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/contact-us", contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
