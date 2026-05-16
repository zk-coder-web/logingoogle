const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Configurações (use variáveis de ambiente)
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Rota para trocar código por token
  if (pathname === '/api/auth/token' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const code = data.code;

        if (!code) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Código não fornecido' }));
          return;
        }

        // Trocar código por token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Falha ao obter token');
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Obter informações do usuário
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!userResponse.ok) {
          throw new Error('Falha ao obter dados do usuário');
        }

        const userData = await userResponse.json();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          user: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
          },
          accessToken,
        }));
      } catch (error) {
        console.error('Erro:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
    return;
  }

  // Servir arquivos estáticos
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const fs = require('fs');
    res.end(fs.readFileSync('./index.html'));
    return;
  }

  if (pathname === '/callback.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const fs = require('fs');
    res.end(fs.readFileSync('./callback.html'));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
