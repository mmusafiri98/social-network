// backend/server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',// Remplace par ton mot de passe MySQL
    database: 'social_network'        // Assure-toi d'avoir créé cette base dans MySQL
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Endpoint d'inscription des utilisateurs
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hachage du mot de passe avant de le stocker
    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error("Erreur d'enregistrement:", err);
            return res.status(500).send({ message: "Erreur lors de l'enregistrement" });
        }
        res.send({ message: "Utilisateur enregistré avec succès!" });
    });
});

// Lancement du serveur
app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});
