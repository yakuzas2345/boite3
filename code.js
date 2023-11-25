
const { exec } = require("child_process");

const mysql = require('mysql2');

// create the connection to database

var hote1 ="4.tcp.eu.ngrok.io"

var hote2 = "17969"

var num = 1

var stamp;

var connect =
{
  host: hote1,
  port: hote2,
  user: 'yakuzas2345',
  password: 'Honneur23.',
  database: 'replit'
}

var connection;

exec("cd boite && chmod +x voiture && ./voiture", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);

  console.log('voiture lancé');
});

setInterval(() => {

  exec("pgrep -l voiture", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log('stdout:', stdout);

    if (stdout.indexOf('voiture') != -1) {
      stamp = Date.now(); 

      connection = mysql.createConnection(connect);

      connection.query("REPLACE INTO `info` (num, stamp) VALUES ( ? , ? )", ['' + num + '', '' + stamp + ''], function(err, results, fields) {
        console.log(results); // results contains rows returned by server

        console.log(fields); // fields contains extra meta data about results, if available

        connection.end();
      });
    }
  });
}, "300000");





