const fs = require('fs');

fs.readdirSync('./').map((v) => {
  console.log('aaa::', v);
  return v;
});
