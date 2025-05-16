// Import Express.js module
import express from 'express';
import projectsModule from './projects.js';

import path from 'path';
const __dirname = path.resolve();

// Initialize the Express application
const app = express();
app.use(express.json()); //Used to parse JSON bodies. Needed to get req.body data on POST request

// Define the port number for the server to listen on
const port = parseInt(process.env.PORT) || 8080;

//let retVal = await projectsModule.InsertProject("ClientName", "Project title");
//console.log("retVal", retVal);

// Define a route for the root URL ('/') and specify the response
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/getAllProjects', async function(req, res) {
    let retVal = await projectsModule.GetAllProjects("test");
    res.json({ success: true, message: "OK", projects: retVal.projects });
});

app.post('/postNewProject', async function(req, res) {
    let clientName = req.body.clientName;
    let projectTitle = req.body.title;
    let workDescription = req.body.workDescription;
    let estimatedWorkDays = req.body.estimatedWorkDays;
    
    let retVal = await projectsModule.InsertProject(clientName, projectTitle, workDescription, estimatedWorkDays);
    res.json({ success: retVal.success, message: retVal.message });
});

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating the server is running
});