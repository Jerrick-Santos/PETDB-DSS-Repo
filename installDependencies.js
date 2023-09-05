const { exec } = require('child_process');
const path = require('path');

// Define the paths to your frontend and backend folders
const frontendPath = path.join(__dirname, 'frontend');
const backendPath = path.join(__dirname, 'backend');

// Frontend dependencies
const frontendDependencies = [
  "axios@^1.4.0",
  "bootstrap@^5.3.1",
  "leaflet@^1.9.4",
  "leaflet.markercluster@^1.5.3",
  "leaflet.offline@^3.0.1",
  "localforage@^1.10.0",
  "prop-types@^15.8.1",
  "react@^18.2.0",
  "react-bootstrap@^2.8.0",
  "react-dom@^18.2.0",
  "react-leaflet@^4.2.1",
  "react-leaflet-markercluster@^3.0.0-rc1",
  "react-router-dom@^6.15.0",
  "react-scripts@5.0.1",
  "recharts@^2.8.0",
];

// Backend dependencies
const backendDependencies = [
  "axios@^1.4.0",
  "body-parser@^1.20.2",
  "cors@^2.8.5",
  "dotenv@^16.3.1",
  "express@^4.18.2",
  "idb@^7.1.1",
  "mysql@^2.18.1",
  "nodemon@^3.0.1"
];

// Function to install dependencies in a specified directory
function installDependenciesInDirectory(dependencies, directory) {
  dependencies.forEach((dependency) => {
    exec(`npm install ${dependency}`, { cwd: directory }, (error) => {
      if (error) {
        console.error(`Error installing ${dependency}:`, error);
      } else {
        console.log(`${dependency} installed successfully.`);
      }
    });
  });
}

// Install frontend and backend dependencies
console.log('Installing frontend dependencies...');
installDependenciesInDirectory(frontendDependencies, frontendPath);

console.log('Installing backend dependencies...');
installDependenciesInDirectory(backendDependencies, backendPath);
