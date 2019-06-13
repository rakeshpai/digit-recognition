const { existsSync, copyFileSync } = require('fs');
const mkdirp = require('mkdirp');
const ghpages = require('gh-pages');

if(!existsSync('run.js')) {
  console.log('Run \"npm run train\" first.');
  process.exit();
}

mkdirp.sync('dist');

['index.html', 'run.js'].forEach(file => copyFileSync(file, `dist/${file}`));

ghpages.publish('dist', error => {
  console.log('Published. Error:', error)
});
