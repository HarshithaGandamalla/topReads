const fetch = require('node-fetch');
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

//var books={};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

    
fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=7f0f22c09d544373bfccc451fa6f76bb', {
    method: 'get',
  })
  .then(response => { return response.json()});

    

app.get('https://www.googleapis.com/books/v1/volumes', (req, res) => {
    console.log("Query on.. "+req.query.q);
    res.send("HEY!");
//   fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + AIzaSyCAze_N32MeHmpoh5ZK7_6skpJPf5tVjmw, {method: 'get'})
//                         .then(data => {data.json()
//                         // console.log("Fetching images..");
//                         // var img = data.json().items[0].volumeInfo.imageLinks.thumbnail;
//                          //img = img.replace(/^http:\/\//i, 'https://');
//                          })  
//                          .catch(error=> {   
//                            console.log(error);
//                          }); 
//                              
//                       });
});


 
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
