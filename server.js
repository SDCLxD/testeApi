const express = require('express');
const app = express();
const PORT = 3000; // Porta do servidor

// Middleware para interpretar JSON
app.use(express.json());

// Banco de dados em memória (para teste)
let playerData = {};

// Rota para receber a quantidade de Hyperchromes
app.post('/api/atualizar_hyperchromes', (req, res) => {
    const { playerId, hyperchromeCount } = req.body;

    if (!playerId || hyperchromeCount == null) {
        return res.status(400).json({ message: 'Dados inválidos!' });
    }

    // Armazena os dados em um "banco de dados" temporário
    playerData[playerId] = { hyperchromeCount, lastUpdate: new Date() };

    console.log(`Dados do jogador ${playerId} atualizados:`, playerData[playerId]);
    res.json({ message: 'Dados recebidos com sucesso!', data: playerData[playerId] });
});

// Rota para visualizar os dados dos jogadores
app.get('/api/jogadores', (req, res) => {
    res.json(playerData);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
