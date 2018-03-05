const fs = require('fs');
const { exec } = require('child_process');

const { emccCmd, tempDir } = require("../config.js");

function joinCmd(arr) {
  return arr.join(' ');
}

module.exports = function rustc(source, c, options, callback) {
  var baseName = tempDir + '/emcc_h_' + Math.random().toString(36).slice(2);
  var cFile = baseName + (c ? '.c' : '.cpp');
  var jsFile = baseName + '.js';
  var memFile = baseName + '.js.mem';
  fs.writeFile(cFile, source, (err) => {
    if (err) return callback(err);

    exec(
      joinCmd([emccCmd, cFile, '-O2', '--profiling', '-o', jsFile]),
      (err, stdout, stderr) => {
        var console = stdout.toString() + stderr.toString();
        fs.readFile(jsFile, (err, content) => {
          var success = !err;
          var js = err ? undefined : content.toString('base64');
          if (success) {
            fs.unlink(jsFile, () => {});
            fs.readFile(memFile, (err, content) => {
              success = success && !err;
              var mem = err ? undefined : content.toString('base64');
              if (success) fs.unlink(memFile, () => {});
              fs.unlink(cFile, () => {});
              callback(null, { success, output: success ? [ {js}, {mem}] : success, console, });
            });
          } else {
            callback(null, { success, output: success, console, });
          }
        });
      }
    );
  });
};
