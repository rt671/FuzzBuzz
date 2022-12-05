// const express = require("express");
// const { spawn } = require("child_process");
// const app = express();
// const port = 3000;
// app.get("/", (req, res) => {
//   var dataToSend;
//   const data = "India, officially the Republic of India, is a country in South Asia. It is the seventh largest country by area, the second most populous country, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Thailand, Myanmar, and Indonesia. The nation's capital city is New Delhi."

//   const python = spawn("python", ["D:/work/BTP/CODE/Main/indexing.py", data]);
//   python.stdout.on("data", function (data) {
//     console.log("Pipe data from python script ...");
//     dataToSend = data.toString();
//   });

//   python.on("close", (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     res.send(dataToSend);
//   });
// });

// app.get("/encrypt", (req, res) => {
//   var dataToSend;
//   var data = "India, officially the Republic of India, is a country in South Asia. It is the seventh largest country by area, the second most populous country, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Thailand, Myanmar, and Indonesia. The nation's capital city is New Delhi."

//   const python = spawn("python", ["D:/work/BTP/CODE/Main/encrypt_index.py", data]);

//   python.stdout.on("data", function (data) {
//     console.log("Pipe data from python script ...");
//     dataToSend = data.toString();
//   });

//   python.on("close", (code) => {
//     console.log(`encrypt child process close all stdio with code ${code}`);
//     res.send(dataToSend);
//   });
// });

// app.get("/trapdoor", (req, res)=> {
//     dataToSend ="thankYou"
//     const keyword = "india";
//     const python = spawn("python", ["D:/work/BTP/CODE/Main/trapdoor.py", keyword]);
    
//     python.stdout.on("data", function (data) {
//       console.log("Pipe data from python script ...");
//       dataToSend = data.toString();
//     });

//     python.on("close", (code) => {
//       console.log(`child process close all stdio with code ${code}`);
//       res.send(dataToSend);
//     });
//   })

//   app.get("/search", (req, res) => {
//       const keyword = "india";
//       const python = spawn("python", ["D:/work/BTP/CODE/Main/search.py", keyword]);
      
//       python.stdout.on("data", function (data) {
//         console.log("Pipe data from python script ...");
//         dataToSend = data.toString();
//       });

//       python.on("close", (code) => {
//         console.log(`child process close all stdio with code ${code}`);
//         res.send(dataToSend);
//       });
//     });

// app.listen(port, () =>
//   console.log(`Example app listening on port 
// ${port}!`)
// );

const express = require("express");
const { spawn, spawnSync } = require("child_process");
const app = express();
const port = 3000;
 
app.get("/upload", (req, res) => {
  let dataToSend;
  const data = "India, officially the Republic of India, is a country in South Asia." 
  // It is the seventh largest country by area, the second most populous country, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Thailand, Myanmar, and Indonesia. The nation's capital city is New Delhi.";
 
  const indexing = spawnSync("python", [
    "D:/work/BTP/CODE/Main/indexing.py",
    data,
  ]);

  dataToSend = indexing.output.toString('utf8') + "\n";
  // console.log(dataToSend)
  // res.send(dataToSend)
  const encrypt = spawnSync("python", [
    "D:/work/BTP/CODE/Main/encrypt_index.py",
    data, dataToSend
  ]);

  let encr_idx;
  encr_idx = encrypt.output.toString('utf-8')
  // console.log(encr_idx)
  res.send(encr_idx)
});
 
app.get('/search', (req, res)=>{
  let dataToSend
  const keyword = "india";
  const trapdoor = spawnSync("python", [
    "D:/work/BTP/CODE/Main/trapdoor.py",
    keyword,
  ]);
  
  const search = spawnSync("python", [
    "D:/work/BTP/CODE/Main/search.py",
    keyword,
  ]);
  dataToSend = search.output.toString('utf-8')
  res.send(dataToSend)
})
 
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
 