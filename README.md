rentcar-app

This is the backend of the rentcar-app application, which allows managing car rentals. It is built with Node, Express, Mongo, Mongoose for schemas, bcrypt for secure password management, and JWT for authentication.

Prerequisites
Before you begin, make sure you have the following items installed in your computer:
1. Install node and npm
2. Install mongoDB

Installation
1. Clone the repository to your computer from: https://github.com/ramndiazg/rentcar-backend
2. Go to the backend folder: >cd rentcar-backend
3. Install the project dependencies using npm: >npm install

Environment variables
To configure the environment variables needed for the application, create a .env file in the backend directory with the following content:
1. MONGO_URI="your mongo bd route"
2. JWT_SECRET="your secret key"
3. PORT=3546 || "your port"

Start the application
1. Start the development server inside the backend directory with nodemon: >npm run dev
2. If everything is configured correctly, the server will be running at http://localhost:3546

Test the application
1. Test the development server inside the backend directory with: >npm test

To test the routes you can use Postman or the app of your choice.

Deployment link: https://rentcar-backend.onrender.com
