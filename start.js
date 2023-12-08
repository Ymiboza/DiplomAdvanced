const { spawn } = require('child_process');

const serverProcess = spawn('npm', ['start'], { cwd: 'js-advanced-diploma' });
const clientProcess = spawn('npm', ['start'], { cwd: 'js-advanced-diploma-client' });

process.on('exit', () => {
  serverProcess.kill();
  clientProcess.kill();
});
