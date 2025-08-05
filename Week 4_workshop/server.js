
var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');

app.get('/api/projects', async (req, res) => {
 const projects = await Project.find({});
 res.json({ statusCode: 200, data: projects, message: "Success" });
})

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
  mongoose.connection.on('connected', () => {
   console.log('Connected to MongoDB!');
});

const ProjectSchema= new mongoose.Schema({
 title: String,
 image: String,
 link: String,
 description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

app.post('/api/projects', async (req, res) => {
  try {
    const { title, image, link, description } = req.body;
    const newProject = new Project({ title, image, link, description });
    await newProject.save();
    res.json({ statusCode: 201, message: "Project added successfully", data: newProject });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error saving project", error: error.message });
  }
});

$(document).ready(function() {
  
    $('#projectForm').submit(function(e) {
    e.preventDefault();
    const newProject = {
      title: $('#title').val(),
      image: $('#image').val(),
      link: $('#link').val(),
      description: $('#description').val()
    };

    $.post('/api/projects', newProject, (response) => {
      if(response.statusCode === 201) {
        M.toast({ html: 'Project added!' });
        $('#addProjectModal').modal('close');
        location.reload(); // reload to fetch and display new project
      } else {
        M.toast({ html: 'Failed to add project' });
      }
    });
  });
  getProjects();
});