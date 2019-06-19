const download = require("./download")
const restartsrs = require("./restart")
const fs = require('fs');
const express = require('express')
const srsconfig = require('./srsconfig')
const app = express()
const port = 3000

const data = [] 

const courts_conf = {
    1: {
       "mid": "match_id_court1",
       "sid": "stream_id_court1",
    },
    2: {
       "mid": "match_id_court2",
       "sid": "stream_id_court2",
    },
    3: {
       "mid": "match_id_court3",
       "sid": "stream_id_court3",
    },
    4: {
       "mid": "match_id_court4",
       "sid": "stream_id_court4",
    }
}

app.get('/', async(req, res) => {

    if (!req.query.matchId) {
        res.send("Oppgi matchId");
        return;
    }
    if (!req.query.eventId) {
        res.send("Oppgi eventId");
        return;
    }
    if (!req.query.courtNum) {
        res.send("Oppgi courtNum");
        return;
    }
    if (!req.query.tournamentNum) {
        res.send("Oppgi tournamentNum");
        return;
    }

    const tournamentid = req.query.tournamentId;
    const eventid = req.query.eventId;
    const courtnum = req.query.courtNum;
    const matchid = req.query.matchId;

	if (courtnum > 4 || courtnum < 0) {
        res.send("Invalid court number. Should be 1-4");
        return;
	}

	courts_conf[courtnum]["mid"] = matchid;
	courts_conf[courtnum]["sid"] = eventid;

	srsconfig(
		courts_conf[1]["mid"], courts_conf[1]["sid"],
		courts_conf[2]["mid"], courts_conf[2]["sid"],
		courts_conf[3]["mid"], courts_conf[3]["sid"],
		courts_conf[4]["mid"], courts_conf[4]["sid"]
	)
	restartsrs()

    if(data.some((obj) => obj === matchid)) {
        res.send("Prosesseres allerede")
        return;
    }

    data.push(matchid)
    repeatTwoHours(matchid)
    await download(matchid)

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
