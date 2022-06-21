var express = require("express");
var cors = require("cors");
var app = express();
var axios = require("axios");

app.use(cors());

app.set("port", 3621);
app.listen(app.get("port"));

app.get("/:post_id", async (req, res) => {
  const response = await axios.get("https://webhook.mekongdigitaltv.com/");
  let comments_filter = response.data.filter(function (comment) {
    return (
      comment.entry[0].changes[0].value.item == "comment" &&
      comment.entry[0].changes[0].value.post_id == req.params.post_id &&
      comment.entry[0].changes[0].value.message
    );
  });
  res.send(JSON.stringify(comments_filter));
});

app.get("/", (req, res) => {
  res.send("running...");
});

app.listen(() => {
  console.log("Listening port 3621");
});
