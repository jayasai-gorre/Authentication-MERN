# [MERN Authentication 🎟️🔐](https://authentication-mern-2rgf.onrender.com) | Live Link 🔗



Welcome to the **MERN Authentication** project! This application demonstrates how to implement authentication in a MERN (MongoDB, Express.js, React, Node.js) stack.

## SignUp
<img width="1404" alt="image" src="https://github.com/user-attachments/assets/c6e8e990-3159-47ab-bf89-70bc24d841a2">

##

<img width="1397" alt="image" src="https://github.com/user-attachments/assets/f6367527-4dbb-4486-9160-d34a5bce4efb">

##

<img width="1391" alt="image" src="https://github.com/user-attachments/assets/da6697f0-7ff6-4483-8540-e7d0e566b98b">


## 🚀 Features

- **User Registration** 📋
  - Allows users to create an account by providing their details such as name, email, and password. The password is hashed for security.

- **User Login** 🔑
  - Enables users to log in using their registered email and password. Upon successful authentication, a JSON Web Token (JWT) is issued to the user for session management.

- **Token-based Authentication** 🎟️
  - Utilizes JWTs to manage user sessions. Tokens are stored client-side and sent with each request to authenticate users and access protected routes.

- **Password Hashing** 🔒
  - Employs `bcrypt.js` to hash passwords before storing them in the database. This ensures that even if the database is compromised, user passwords remain secure.

- **Protected Routes** 🚧
  - Secures specific routes or endpoints so that only authenticated users with a valid token can access them. This ensures that sensitive information is not exposed to unauthorized users.

- **OTP Mail Verification** 📧🔑
  - Sends a one-time password (OTP) to users' email addresses for account verification during registration. Ensures that users have provided a valid email address.

- **Forgot Password** 🔄
  - Allows users to reset their password if they forget it. Users receive a password reset link or OTP via email to securely change their password.

## 📦 Technologies Used

- **MongoDB** 🗃️
  - A NoSQL database used for storing user information, including hashed passwords and user tokens. MongoDB is chosen for its flexibility and scalability in handling various types of data.

- **Express.js** 🖥️
  - A web application framework for Node.js that simplifies the process of building server-side logic. It handles routing, middleware, and HTTP requests.

- **React** ⚛️
  - A JavaScript library for building user interfaces. React is used for creating the front-end of the application, providing a dynamic and responsive user experience.

- **Node.js** 🟢
  - A JavaScript runtime built on Chrome's V8 engine. Node.js is used for running server-side code, managing server operations, and interacting with the database.

- **JWT (JSON Web Token)** 🧾
  - A compact, URL-safe token format used for securely transmitting information between parties. In this project, JWTs are used for managing user sessions and protecting routes.

- **bcrypt.js** 🔐
  - A library used for hashing passwords. It provides a secure way to store passwords by applying a one-way hashing function, making it difficult for attackers to retrieve the original password.

- **MailTrap** 📧
  - A service for testing and debugging email functionality. MailTrap simulates email sending and receiving in a secure environment, making it useful for testing email features like user registration and password reset without sending real emails.



## 🛠️ Setup .env file
```bash
MONGO_URI=your_mongo_uri
PORT=7777
JWT_SECRET=your_secret_key
NODE_ENV=development
MAILTRAP_TOKEN=your_mailtrap_token
MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
CLIENT_URL= http://localhost:5173
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm run start
```

