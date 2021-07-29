// load up the express framework and body-parser helper
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const data = require("./mock-data/flight-details.json");
const countryList = require("./mock-data/country-list.json");

const server = app.listen(8080, () => {
  console.log("listening on port %s...", server.address().port);
});

const getCountryList = (req, res) => {
  const responseData = countryList.map((item) => {
    if (item.name) {
      item.label = item.name;
      item.value = item.name;
      delete item.name;
    }
    return item;
  });
  res.send(responseData);
};

app.get("/search", alldata);
app.get("/countries", getCountryList);

function alldata(request, response) {
  response.send(data);
}
