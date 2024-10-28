const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const nlp = require('compromise');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve a simple HTML form for uploading PDFs
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PDF Question Answering</title>
        <style>
          /* Basic Reset */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #333;
          }

          .container {
            background: #fff;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 90%;
            text-align: center;
          }

          h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          input[type="file"], input[type="text"] {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 20px;
            transition: border-color 0.3s;
          }

          input[type="text"]:focus {
            border-color: #0077ff;
            outline: none;
          }

          button {
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            background-color: #0077ff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #005fcc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Upload PDF and Ask a Question</h1>
          <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="pdf" accept="application/pdf" required>
            <input type="text" name="question" placeholder="Ask a question about the PDF" required>
            <button type="submit">Upload and Ask</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// Handle PDF upload and question processing
app.post('/upload', upload.single('pdf'), (req, res) => {
  const pdfBuffer = req.file.buffer;
  const question = req.body.question;

  // Parse the PDF
  pdf(pdfBuffer).then(data => {
    const text = data.text;

    // Use compromise for basic NLP processing (you can expand this)
    const doc = nlp(text);

    // A simple answer based on the question (modify this logic as needed)
    const found = doc.match(question);
    if (found.found) {
      res.send(`Answer: ${found.out('text')}`);
    } else {
      res.send('Sorry, I could not find an answer to your question.');
    }
  }).catch(error => {
    res.status(500).send('Error processing the PDF: ' + error.message);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
