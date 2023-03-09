const fetch = require('node-fetch');
const fs = require('fs');
const { spawn } = require('child_process');

const imageName = 'portainer/portainer-ce';
const imageTag = 'latest';

// Pull the image from Docker Hub
fetch(`https://registry.hub.docker.com/v2/repositories/${imageName}/tags/${imageTag}`)
  .then(response => response.json())
  .then(data => {
    const imageDigest = data.images[0].digest;

    // Save the image digest to a file
    fs.writeFileSync('image_digest.txt', imageDigest);

    // Run the deployment script
    const deployProcess = spawn('./deploy.sh');

    deployProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    deployProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    deployProcess.on('close', (code) => {
      console.log(`Deployment script exited with code ${code}.`);
    });
  })
  .catch(error => {
    console.error('Error pulling image:', error);
  });
