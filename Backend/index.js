const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000
app.get('/', (req, res) => {
 
 var dataToSend;
 const data = "India, officially the Republic of India, is a country in South Asia. It is the seventh largest country by area, the second most populous country, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Thailand, Myanmar, and Indonesia. The nation's capital city is New Delhi."

 // spawn new child process to call the python script
 const python = spawn('python', ['D:/work/BTP/CODE/Main/indexing.py', data]);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
//  // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
 });
})

app.get('/encrypt',  (req, res)=> {

    var dataToSend;
    const python =  spawn('python', ["D:/work/BTP/CODE/Main/encrypt_index.py"]);
    
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`encrypt child process close all stdio with code ${code}`);
      // send data to browser
      res.send(dataToSend);
    });
  })
  
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))