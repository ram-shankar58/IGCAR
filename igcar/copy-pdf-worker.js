const fs = require('fs');
const path = require('path');

// Path to the pdf.worker.min.js in node_modules
const pdfWorkerSrc = path.join(__dirname, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.js');

// Destination path in the public directory
const pdfWorkerDest = path.join(__dirname, 'public', 'pdf.worker.min.js');

// Copy the worker script
fs.copyFileSync(pdfWorkerSrc, pdfWorkerDest);
console.log('pdf.worker.min.js copied to public directory');
