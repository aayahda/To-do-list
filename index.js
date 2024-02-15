import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db= new pg.Client(
  {
    user:"postgres",
    host:"localhost",
    database:"permalist",
    password:"AadhyaRaj@0!",
    port:"5432"
  }
)

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  
];

app.get("/",async (req, res) => {
  try{const result = await db.query("select * from items order by id asc;");

  items=result.rows;
  console.log(items);
  res.render("index.ejs", {
    listTitle: "Today's tasks",
    listItems: items,
  });}
  catch(err){
    console.log(err);
  }
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
