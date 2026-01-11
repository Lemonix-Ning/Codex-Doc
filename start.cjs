const { exec } = require('child_process');
const path = require('path');

console.log('Code2Doc 正在启动...\n');

// 启动服务器进程
const serverPath = path.join(__dirname, 'server.js');
const server = exec(`node "${serverPath}"`, { 
  env: { ...process.env, NODE_ENV: 'production' }
});

server.stdout.on('data', (data) => {
  console.log(data.toString());
  
  // 检测到服务器启动成功后打开浏览器
  if (data.toString().includes('Server running')) {
    console.log('正在打开浏览器...\n');
    
    // Windows 打开默认浏览器
    exec('start http://localhost:3000', (err) => {
      if (!err) {
        console.log('✓ 浏览器已打开\n');
        console.log('提示: 关闭此窗口将停止服务器\n');
      }
    });
  }
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

// 监听退出信号
process.on('SIGINT', () => {
  console.log('\n正在退出...');
  server.kill();
  process.exit();
});

process.on('exit', () => {
  server.kill();
});
