// Import Express.js module
import express from 'express';
import projectsModule from './projects.js';

import path from 'path';
const __dirname = path.resolve();

// Initialize the Express application
const app = express();

// Define the port number for the server to listen on
const port = parseInt(process.env.PORT) || 8080;

// Define a route for the root URL ('/') and specify the response
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send 'Hello, World!' as the response
});

// Send HTML file to web browser for the URL ('/index')
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/getAllProjects', async function(req, res) {
    let retVal = await projectsModule.GetAllProjects("test");
    res.json({ success: true, message: "OK", projects: retVal.projects });
});

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating the server is running
});