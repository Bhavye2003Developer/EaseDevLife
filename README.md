# EaseDevLife

## Overview
EaseDevLife automates the process of creating demos for web applications and generating PDFs from URLs. It simplifies the task of creating demo videos by taking URLs as input and generating a video showcasing how each webpage looks. Additionally, it provides functionality to generate PDF files by combining multiple URLs.

## Tech Stack
- **Frontend**: React for building the user interface.
- **Backend**: Node.js for server-side logic and API endpoints.
- **Browser Automation**: Browserless for headless browser sessions to capture webpage screenshots.
- **PDF Generation**: PDF file format for creating documents from web content.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Bhavye2003Developer/EaseDevLife.git

2. Navigate to the project directory:
   ```bash
   cd EaseDevLife
   ```

3. Execute the setup script:
   ```bash
   ./setup.sh
   ```

4. Open two terminals:
   - In the first terminal, navigate to the frontend directory and start the development server:
     ```bash
     cd frontend
     npm start
     ```
   - In the second terminal, navigate to the backend directory and start the Node.js server:
     ```bash
     cd backend
     npm start
     ```

## Usage
Once the installation and setup are complete, you can access the project at the following URLs:
- Frontend (React): [http://localhost:1234](http://localhost:1234)
- Backend (Node.js): [http://localhost:8080](http://localhost:8080)

### Frontend
The frontend provides a user interface where you can input URLs to generate demo videos and PDFs.

### Backend
The backend server handles the requests from the frontend, processes the URLs, and generates demo videos using browser automation and PDFs from URLs.

## Contributing
Contributions are welcome! Please feel free to fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
