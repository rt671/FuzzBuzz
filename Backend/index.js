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

  // const data = req.body.text;
  // console.log(data)
  const data = "America, officially the Republic of India, is a country in South Asia." 
  const password = "helloworld"
  
  //CLEAN THE TEXT
  const preprocess = spawnSync("python", ["D:/work/BTP/CODE/Main/preprocess.py", data]);
  const cleaned_doc = preprocess.output.toString('utf8');

  //Encrypt the Text
  const encryptingDoc = spawnSync("python", ["D:/work/BTP/CODE/Main/encrypt_text.py", cleaned_doc, password]);
  const encr_text = encryptingDoc.output.toString('utf8');

  //Saving the Encrypted Text
  const newText = new Text({text: encr_text});
  newText
    .save()
    .then((savedText) => {
      const id = savedText._id.toString(); 
      console.log("encrypted text is saved!", "id is ", id)

      //Creating the Index Table
      const indexing = spawnSync("python", [
        "D:/work/BTP/CODE/Main/indexing.py",
        cleaned_doc, id
      ]);
      const idx_table = indexing.output.toString('utf8');

      //Encrypting the Index Table
      const encrypt = spawnSync("python", [
        "D:/work/BTP/CODE/Main/encrypt_index.py",
        idx_table, password
      ]);
      const encr_idx = encrypt.output.toString('utf-8')

      //Saving the Encrypted Table
      User.findOneAndUpdate({password:password}, {index:encr_idx}, {new:true})
      .catch(err => console.log(err))

      res.json(encr_idx)

    })
    .catch((err) => console.log(err));
});


app.get('/search', (req, res)=>{ //POST =>  KEYWORD, PASSWORD
  const keyword = "india";
  const password = "helloworld"

  const trapdoor = spawnSync("python", [
    "D:/work/BTP/CODE/Main/trapdoor.py",
    keyword, password
  ]);
  const trapdoor_set = trapdoor.output.toString('utf-8')
  
  // console.log("TRAPDOOR SET IS ", trapdoor_set)

  User.find({password:password})
  .then(user => 
    {
        const ind_table = user[0].index;
        // res.send(ind_table)
        // console.log("THE TABLE IS ", ind_table);
        const search = spawnSync("python", [
          "D:/work/BTP/CODE/Main/search.py", trapdoor_set
        ]);
        const search_res = search.output.toString('utf-8')
        res.send(search_res)
    })
  .catch(err => res.json(err))
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
 