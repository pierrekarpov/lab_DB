
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/
var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'lab7';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = /*'mongodb://heroku_mz4j8b60:ihn6kgm71pdhmgnjvlus5koa45@ds147797.mlab.com:47797/heroku_mz4j8b60';*/process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || local_database_uri
mongoose.connect(database_uri, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + database_uri + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + database_uri);
  }
});


// Do the initialization here

// Step 1: load the JSON data
var projects_json = require('./projects.json');

// Step 2: Remove all existing documents
models.Project
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = projects_json.length;
  for(var i=0; i<projects_json.length; i++) {
    var json = projects_json[i];
    var proj = new models.Project(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}
