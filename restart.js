const { exec } = require('child_process');

function restart() {
    exec('sudo service srs reload', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
}

module.exports = restart