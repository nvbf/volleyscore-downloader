const axios = require('axios');
const fs = require('fs');

function download(matchId) {
  
  console.log(matchId)
  const request = 
  axios.get("https://cryptic-plateau-12043.herokuapp.com/scoreboard/png", {
    params: {
      matchId: matchId
    },
    responseType: "stream"
  })
  .then(function (response) {
    console.log("ok: matchid " + matchId)
    const file = fs.createWriteStream(__dirname + "/" + matchId + ".png")  
    response.data.pipe(file)
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = download