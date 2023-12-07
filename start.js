const { exec } = require('child_process');

// Запуск сервера
const serverProcess = exec('npm start', { cwd: 'js-advanced-diploma' });

// Запуск клиента
const clientProcess = exec('npm start', { cwd: 'js-advanced-diploma-client' });

// Обработка события завершения процесса сервера
serverProcess.on('exit', (code, signal) => {
  console.log(`Server process exited with code ${code} and signal ${signal}`);
  // Здесь вы можете выполнить дополнительные действия при завершении сервера
});

// Обработка события завершения процесса клиента
clientProcess.on('exit', (code, signal) => {
  console.log(`Client process exited with code ${code} and signal ${signal}`);
  // Здесь вы можете выполнить дополнительные действия при завершении клиента
});

// Обработка события завершения скрипта
process.on('exit', () => {
  // Здесь вы можете выполнить дополнительные действия при завершении скрипта
  // Например, завершить процессы сервера и клиента
  serverProcess.kill();
  clientProcess.kill();
});