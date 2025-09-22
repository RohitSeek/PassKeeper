 

# 🔐 PassKeeper – Your Friendly Password Manager

A simple yet powerful **MERN Stack Password Manager** 💙 where you can securely store your passwords.
All your secrets are encrypted with **AES-256** before saving them in the database ⛓️ – so even if someone sneaks into the DB, your passwords will still be safe. 🦺

---

## 🚀 Features

* 🔑 **Token-based Authentication** (JWT) – No random stranger gets in.
* 🗝️ **AES-256 Encryption** – Your passwords are stored securely.
* 🖥️ **MERN Stack** – Built with MongoDB, Express, React, Node.
* 🌐 **CORS Configured** – So client ↔ server communication works smoothly.
* 🛡️ **Environment Configurable** – Set up with your own DB, secrets, and keys.

---

<a id="setup">
<h2>🛠️ Setting up the Project</h2>
</a>

Clone the repo to your system:

```sh
git clone https://github.com/010-radhe/PassKeeper.git
cd PassKeeper
```

---

## ⚡ Server Setup

1. Go inside the server folder

```sh
cd server
```

2. Create a file named **`config.env`** in the root of the `server` folder.

   Example content of `config.env` 👇

   ```env
   DATABASE=mongodb://localhost:27017/password-manager
   SECRET_KEY=hello radhe
   CRYPTO_SECRET_KEY=12345678901234567890123456789012
   CLIENT_URL1=http://localhost:3000
   ```

   ✅ **Important Notes**:

   * `DATABASE` → MongoDB connection string (local or Atlas).
   * `SECRET_KEY` → Secret used for JWT tokens.
   * `CRYPTO_SECRET_KEY` → Must be **exactly 32 characters** long (spaces also count).
   * `CLIENT_URL1` → Client URL for CORS setup.

3. Install server dependencies

```sh
npm install
```

4. Start the server (with hot-reload using nodemon)

```sh
nodemon app.js
```

Now your backend is alive 🚀

---

## ⚡ Client Setup

1. Go inside the client folder

```sh
cd client
```

2. Install client dependencies

```sh
npm install
```

3. Start the React app

```sh
npm start
```

Now your frontend is alive 🎉

---

## 🧑‍💻 Development Flow

* Start **server** first → `nodemon app.js`
* Start **client** next → `npm start`

Both must run together for the app to function properly.

---

## 🤝 How to Contribute?

We welcome contributions from everyone 👐

* 🐞 Found a bug? Open an [issue](https://github.com/010-radhe/PassKeeper/issues/new).
* 🌟 Want to add a new feature? Fork → Clone → Branch → Code → Commit → PR.
* 🔄 Always make sure your code is tested and clean before pushing.

---

## 📌 Future Enhancements

* 📲 Add multi-device sync
* 🔐 Biometric/2FA login
* 📊 Dashboard with password strength analytics

---

## 🎯 Final Words

This project is open source and made with ❤️ to help you **never forget your passwords again**.
Be safe, code safe, and keep your passwords safer! 🔒

---

👉 Would you like me to also add a **project architecture diagram (folder structure)** in the README so contributors instantly understand the flow?
