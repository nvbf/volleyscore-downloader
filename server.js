const download = require("./download")
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

const data = [] 
app.get('/', async(req, res) => {
    if (!req.query.matchId) {
        res.send("Oppgi matchId");
        return;
    }

    if(data.some((obj) => obj === req.query.matchId)) {
        res.send("Prosesseres allerede")
        return;
    }

    data.push(req.query.matchId)
    repeatTwoHours(req.query.matchId)
    await download(req.query.matchId)

    res.send("Done")
})

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

function repeatTwoHours(matchId) {
    
    const intervalId = setInterval(() => download(matchId), 5000)
    setTimeout(() => {
        clearInterval(intervalId)
        delete data[data.indexOf(matchId)]
       fs.unlink(__dirname + "/" + matchId + ".png", () => console.log("Deleted " + matchId))
    }, 72000000)
}