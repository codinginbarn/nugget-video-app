const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');



// if (process.platform === "darwin") {
//   if (!isDev) {
//     ffmpeg.setFfmpegPath(path.join(path.dirname(app.getAppPath()), '..', './Resources', 'bin/ffmpeg'));
//     ffmpeg.setFfprobePath(path.join(path.dirname(app.getAppPath()), '..', './Resources', 'bin/ffprobe'));
//   } else {
//     ffmpeg.setFfmpegPath(path.join(__dirname, '.', 'bin/osx/ffmpeg'));
//     ffmpeg.setFfprobePath(path.join(__dirname, '.', 'bin/osx/ffprobe'));
//   }
// } 

// else {
//   ffmpeg.setFfmpegPath(path.join(__dirname, '.', 'bin/win64/ffmpeg.exe'));
//   ffmpeg.setFfprobePath(path.join(__dirname, '.', 'bin/win64/ffprobe.exe'));
// }

if (isDev) {
	console.log('Running in development');
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
} else {
	console.log('Running in production');
}



function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#252729',
    icon: path.join(__dirname, 'assets/icons/png/512x512.png')
  })


  mainWindow.loadFile('app/index.html')
  // let command = ffmpeg('/Users/hhj/Desktop/_FILES/_Video/test.mov')
  //   .fps(29.7)
  //   .size('640x?')
  //   .aspect('4:3')
  //   .output('/Users/hhj/Desktop/_FILES/_Video/s1.mp4')
  //   .on('end', function() {
  //     console.log('Finished processing');
  //   })
  //   .run();

  // console.log(command)

}

let dir = "/Users/hhj"
let result = {}



ipcMain.on('REQ_ALL_DIR', (evt, payload) => {
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      let isDirectory = fs.lstatSync(`${dir}/${file}`).isDirectory() 
      result[String(file)] = {
        isDirectory: isDirectory,
        title: file
      }
    });
    console.log(result)
    evt.sender.send('RES_ALL_DIR', dir, result)
  });
  
})

app.whenReady().then(() => {
  createWindow()
  


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})