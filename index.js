const fs = require('fs');
const pdf = require('pdf-parse');

async function searchTextInPDF(pdfPath, searchText) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);

    const data = await pdf(dataBuffer);

    const pagesText = data.text.split('\f');

    pagesText.forEach((pageText, pageIndex) => {
      const lines = pageText.split('\n'); 
      lines.forEach((line, lineIndex) => {
        if (line.includes(searchText)) {
          console.log(`Page ${pageIndex + 1}, Line ${lineIndex + 1}: ${line}`);
        }
      });
    });

  } catch (error) {
    console.error('Error reading or parsing PDF:', error);
  }
}

const pdfPath = './ssc.pdf';
const searchText = '10014131816';

searchTextInPDF(pdfPath, searchText);
