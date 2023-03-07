let express = require("express");
const app = express();
let path = require("path");
let request = require("request");
let port = 4000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  let query = req.query.search;
  request(
    "https://api.themoviedb.org/3/search/movie?api_key=cdb4c69ec1881ffcd6f4b663867125ec&query=" +
      query,
    (err, response, body) => {
      if (err) console.log(err);
      let data = JSON.parse(body);
      console.log("polo");
      console.log(data);
      res.render("results", { data: data, searchQuery: query });
    }
  );
});

app.listen(port, () => {
  console.log("app started on ", { port });
});
