const dotenv = require("dotenv");
const express = require("express");
const { spawn, spawnSync } = require("child_process");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
dotenv.config();
const Text = require("./Models/Text");
const User = require("./Models/User");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.get("/upload", (req, res) => { //POST REQUEST=> INPUT: TEXT, PASSWORD

  const data = "hello the world of cats and hello cats"
  const password = "helloworld"

  //CLEAN THE TEXT
  const preprocess = spawnSync("python", ["D:/work/BTP/CODE/Main/preprocess.py", data]);
  const cleaned_doc = preprocess.output.toString('utf8');
  console.log(cleaned_doc)
  
  //ENCRYPT THE TEXT
  const encryptingDoc = spawnSync("python", ["D:/work/BTP/CODE/Main/encrypt_text.py", cleaned_doc, password]);
  const encr_text = encryptingDoc.output.toString('utf8');
  console.log(encr_text);

  User.find({password:password})
  .then(user => {
      const docNo = user[0].doc_no
      console.log("THE DOCUMENT NUMBER I GIVE IS ", docNo)

  //SAVING THE ENCRYPTED TEXT
  const newText = new Text({text: encr_text});
  newText
    .save()
    .then((savedText) => {
      const id = savedText._id.toString(); 
      console.log("Encrypted text is saved!", "id is ", id)

      //Creating the Index Table
      const indexing = spawnSync("python", [
        "D:/work/BTP/CODE/Main/indexing.py",
        cleaned_doc, id, docNo
      ]);
      const idx_table = indexing.output.toString('utf8');
      console.log("table is", idx_table)
      // Encrypting the Index Table
      const encrypt = spawnSync("python", [
        "D:/work/BTP/CODE/Main/encrypt_index.py",
        idx_table, password
      ]);
      
      // const jsonData = JSON.parse(encrypt.stdout);
      // console.log(jsonData)

      const encr_idx = encrypt.output.toString('utf8')
      //Saving the Encrypted Table
      User.findOneAndUpdate({password:password}, {index:encr_idx, doc_no: docNo+1}, {new:true})
      .catch(err => console.log(err))
      res.json(encr_idx)
    })
    .catch((err) => console.log(err));
  })
  .catch(err => console.log(err))
  // console.log("THE DOCUMENT NUMBER FETCHED IS ", docNo)

  });


app.get('/search', (req, res)=>{ //POST =>  KEYWORD, PASSWORD
  const keyword = "cats";
  const password = "helloworld"

  //CLEAN THE KEYWORDS
  const preprocess = spawnSync("python", ["D:/work/BTP/CODE/Main/preprocess.py", keyword]);
  const cleaned_keyword = preprocess.output.toString('utf8');
  console.log(cleaned_keyword)

  const trapdoor = spawnSync("python", [
    "D:/work/BTP/CODE/Main/trapdoor.py",
    cleaned_keyword, password
  ]);
  const trapdoor_set = trapdoor.output.toString('utf-8')
  console.log(trapdoor_set)
  User.find({password:password})
  .then(user => 
    {
        const ind_table = user[0].index;
        const search = spawnSync("python", [
          "D:/work/BTP/CODE/Main/search.py", trapdoor_set, ind_table
        ]);
        const search_res = search.output.toString('utf-8')
        console.log(search_res)
        // res.send(search_res)

        const fetchArray = spawnSync("python", ["D:/work/BTP/CODE/Main/findnsort.py", search_res]);
        const documents = fetchArray.output.toString('utf-8')
        console.log(documents)
        res.send(documents)
    })
  .catch(err => res.json(err))
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);