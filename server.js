const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Adicione esta linha
const app = express();
const port = 3000;

const config = {
  host: 'database.cd2mma0w2q5w.us-east-2.rds.amazonaws.com',
  user: 'kateriny',
  password: 'Sucodeuva123!',
  database: 'databasetest',
  port: 3306
};

// Use o middleware CORS
app.use(cors()); // Adicione esta linha

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Conectado ao banco de dados');
    return connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

app.get('/dados', async (req, res) => {
  const connection = await connectToDatabase();
  if (!connection) return res.status(500).send('Erro ao conectar ao banco de dados');

  try {
    const [rows] = await connection.execute('SELECT * FROM InfoCCP');
    res.json(rows); // Certifique-se de que está retornando JSON
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    connection.end();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
