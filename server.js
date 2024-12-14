// Importar las librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Base de datos ficticia para este ejemplo
let usuarios = [
  { id: 1, username: 'admin', password: '1234', role: 'admin' },
  { id: 2, username: 'colaborador', password: '1234', role: 'colaborador' }
];

let contactos = [];
let rutas = [];

// Rutas
// Autenticación básica
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find(user => user.username === username && user.password === password);
  if (usuario) {
    res.status(200).send({ message: 'Login exitoso', role: usuario.role });
  } else {
    res.status(401).send({ message: 'Credenciales incorrectas' });
  }
});

// Gestión de contactos (ejemplo)
app.post('/contactos', (req, res) => {
  const { nombre, contacto, telefono, direccion } = req.body;
  contactos.push({ id: contactos.length + 1, nombre, contacto, telefono, direccion });
  res.status(201).send({ message: 'Contacto creado exitosamente' });
});

app.get('/contactos', (req, res) => {
  res.status(200).send(contactos);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
