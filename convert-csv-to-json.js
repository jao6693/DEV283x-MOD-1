// use core file system module
const fs = require('fs')
// use core path module
const path = require('path')
// use npm module
const csv=require('csvtojson')

// define a function to convert a csv file to a well-formatted json file
const processFile = (csvFile) => {
  console.log('CSV source file', csvFile);
  const jsonFile = 'customer-data.json';
  let jsonData = [];
  // read file in current folder
  csv()
    .fromFile(csvFile)
    .on('json', (jsonObj) => {
      // console.log('JSON object stringified', JSON.stringify(jsonObj));
      jsonData.push(JSON.stringify(jsonObj));
    })
    .on('done', (error) => {
      if (error) {
        console.log('Error occured')
      } else {
        console.log('JSON target file', jsonFile);
        jsonData = '[' + jsonData + ']';
        fs.writeFileSync(path.join(__dirname, jsonFile), jsonData)
        console.log('File processed successfully!!')
      }
  })
}

// use the arguments passed from the CLI to get the csv file name
processFile(process.argv[2])