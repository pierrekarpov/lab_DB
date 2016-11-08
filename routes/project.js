var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback

  //console.log(projectID);
  //console.log("In find 1");
  //console.log(projects);

  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    //console.log("In find 2");
    //console.log(projects[0].id);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);


  var newProject = models.Project({
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url
  });

  console.log(newProject);
  newProject.save(afterSaving);

  function afterSaving(err) {
    if (err) {console.log(err); res.send(500);}
    res.send();
  };
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterQuery);

function afterQuery(err, projects) {
  if(err) console.log(err);
  //console.log("In find 2");
  //console.log(projects[0].id);
  res.send();
}
}
