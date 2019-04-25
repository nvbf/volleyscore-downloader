const download = require("./download")
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

app.get('/', async(req, res) => {
    repeatTwoHours(req.query.matchId)
    await download(req.query.matchId)
    res.send("done")
})

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

function repeatTwoHours(matchId) {
    const intervalId = setInterval(() => download(matchId), 1000)
    setTimeout(() => {
        clearInterval(intervalId)
       fs.unlink(__dirname + "/" + matchId + ".png", () => console.log("deleted " + matchId))
    }, 7200000)
}