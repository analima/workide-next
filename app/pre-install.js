/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const os = require('os');

const platform = os.platform();

const isWindows = /^win/.test(platform);
const cmd = isWindows
  ? `${process.cwd()}\\bin\\pre-install.bat`
  : `${process.cwd()}/bin/pre-install.sh`;
if (!isWindows) exec('chmod +x bin/pre-install.sh');

exec(cmd, (_err, stdout, stderr) => {
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
});
