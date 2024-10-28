# pdf-qa-app

This is a full-stack application that allows users to upload PDF documents and ask questions regarding the content. The backend processes the PDF documents and uses NLP to provide answers to the questions posed by the users. The project is built with Node.js, Express, and uses the `pdf-parse` and `compromise` libraries for PDF parsing and basic NLP, respectively.

## Features

- **PDF Upload**: Users can upload PDF documents to the application.
- **Question Answering**: Users can ask questions about the uploaded PDF's content.
- **NLP Integration**: Basic NLP processing is implemented with the `compromise` library to match answers from the PDF content.
- **Simple and User-Friendly Interface**: A form-based UI for uploading PDFs and asking questions.

## Prerequisites

- **Node.js** (version 14 or above)
- **npm** (comes with Node.js)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/pdf-question-answering.git
   cd pdf-question-answering
2. Install Node Modules:
   Run the following command to install the required dependencies:
   ```bash
   node app.js
   
3. Run the Application:
   Start the server with the following command:
   ```bash
   node app.js
4. Access the Application:
Open your web browser and go to http://localhost:3000 to access the application. You should see a form where you can upload a PDF and ask questions about its content.
