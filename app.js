const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 API Kanap est en ligne !</h1>
    <p>Bienvenue sur mon backend.</p>
    <p>Routes disponibles :</p>
    <ul>
      <li><a href="/api/products">/api/products</a> - Voir tous les produits</li>
    </ul>
  `);
});
module.exports = app;
