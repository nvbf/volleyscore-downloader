const http = require('https');
const fs = require('fs');

function download(matchId) {
  console.log(matchId)
  const request = http.get("https://cryptic-plateau-12043.herokuapp.com/scoreboard/png?matchId=" + matchId, function(response) {
    const file = fs.createWriteStream(__dirname + "/" + matchId + ".png")  
    response.pipe(file);
  });
}

module.exports = download