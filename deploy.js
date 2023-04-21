const path = require('path');
const Client = require('ssh2-sftp-client');
const sftp = new Client();
const localPath = path.resolve(__dirname, 'dist');
const remotePath = '/usr/local/nginx/html';

async function main() {
  await sftp.connect({
    "host": "39.108.105.185",
    "port": 22,
    "user": "root",
    "password": "Hc1397533767"
  })

  if (await sftp.exists(remotePath)) {
    await sftp.rmdir(remotePath, true)
    console.log('删除成功')
  }
  await sftp.uploadDir(localPath, remotePath);
  console.log('上传成功')
  sftp.end();
  return true;
}
main();

