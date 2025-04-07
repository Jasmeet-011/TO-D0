# 📝 TaskFlow - To-Do App

**TaskFlow** is a full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js) that allows users to **register**, **log in**, and **manage their personal tasks** with features like create, edit, delete, and completion tracking. The app features **authentication with JWT**, a **responsive UI using Material UI**, **theme toggling**, and supports **user-specific task data isolation**.

---

## 🌐 Live Demo

- **Frontend (Vercel)**: [Live App](https://to-do-git-main-jasmeets-projects-1357f70f.vercel.app/)
- **Backend (Render)**: [Backend API](https://to-d0-aonk.onrender.com/api)

---


## 🚀 Features

- 🔐 **Authentication**: Secure login/register with JWT
- 🧑‍💻 **User-Specific Tasks**: Each user can only view/edit their own tasks
- ✍️ **CRUD Operations**: Create, Read, Update, Delete tasks
- 🌗 **Light/Dark Mode**: Theme toggle with local preference storage
- 📋 **Dashboard Overview**: Summary of completed and pending tasks
- ⚙️ **Responsive UI**: Built with Material UI for a smooth experience on all devices
- 🌐 **Fully Deployed**: Frontend on Vercel, Backend on Render

---

## 🧠 Tech Stack

| Frontend        | Backend       | Database  | Deployment  |
|----------------|---------------|-----------|-------------|
| React, Vite, Material UI | Node.js, Express | MongoDB Atlas | Vercel (FE), Render (BE) |

---

## 🛠️ Installation & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/to-do-app.git
cd to-do-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```
#### Create .env file in backend/ with:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=7d
```
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
####
Create .env in frontend/ with:
```env
VITE_API_URL=http://localhost:5000/api
```
```bash
npm run dev
```


## 📁 Folder Structure
```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
├── frontend
│   ├── components
│   ├── contexts
│   ├── pages
│   ├── services
│   ├── hooks
│   ├── App.jsx
│   └── main.jsx
```

## 🛡️ License
This project is licensed under the MIT License. See the `LICENSE` file for more details.


##👤 Author
**Jasmeet Singh**

Email: your.jasmeetsingh5003@gmail.com


## 🤝 Contributing
- Contributions, issues, and feature requests are welcome!
- Feel free to fork the repository and submit a pull request.


## 💬 Feedback
- If you have any feedback, don't hesitate to get in touch with me on [LinkedIn](https://www.linkedin.com/in/jasmeet-singh-wadhwa/) or open an issue on [GitHub](https://github.com/Jasmeet-011/TO-D0/issues).
