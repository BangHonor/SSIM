const gulp = require('gulp');
const electron = require('electron-connect').server.create();

gulp.task('watch:electron', function () {
    electron.start();
    gulp.watch(['./main.js'], electron.restart);
    gulp.watch(['./MainUI/**/*.{js,css},./MainUI/main.html'], electron.reload);
});