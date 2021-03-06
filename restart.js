const { exec } = require('child_process');

async function restart() {
  const promise = new Promise((resolve, reject) => {

   
  exec('sudo service srs reload', (err, stdout, stderr) => {
      if (err) {
        
        // node couldn't execute the command
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        reject(err)
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      resolve(true)
    });
  })
  return await promise 
}

module.exports = restart