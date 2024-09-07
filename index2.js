const fs = require('fs');
const pdf = require('pdf-parse');
const readline = require('readline');

function clearConsoleLine() {
  readline.cursorTo(process.stdout, 0);
  readline.clearLine(process.stdout, 0);
}

async function searchTextInPDF(pdfPath, searchText) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    const text = data.text;

    const lines = text.split(/\r?\n/); 

    let found = false;

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      clearConsoleLine();
      process.stdout.write(`Scanning Line ${index + 1}: ${line}`);

      await new Promise(resolve => setTimeout(resolve, 1));

      if (line.includes(searchText)) {
        clearConsoleLine();
        console.log(` [ MATCH FOUND ] Line ${index + 1}: ${line}`);
        found = true;
        break;
      }
    }

    if (!found) {
      clearConsoleLine();
      console.log(` [ NOT FOUND ] Text "${searchText}" not found in the PDF.`);
    }
  } catch (error) {
    console.error('Error reading or parsing PDF:', error);
  }
}

const pdfPath = './ssc.pdf'; 
const searchText = '10014131816'; 

searchTextInPDF(pdfPath, searchText);
