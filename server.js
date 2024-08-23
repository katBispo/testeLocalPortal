const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const config = {
  user: 'seu_usuario',
  password: 'sua_senha',
  server: 'seu_servidor.database.windows.net',
  database: 'seu_banco_de_dados',
  options: {
    encrypt: true
  }
};

sql.connect(config).then(pool => {
  if (pool.connected) {
    console.log('Conectado ao banco de dados');
  }

  app.get('/dados', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM sua_tabela');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch(err => console.log(err));
