module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { code } = req.body;

    if (!code) {
      res.status(400).json({ error: 'Código não fornecido' });
      return;
    }

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    console.log('CLIENT_ID:', CLIENT_ID ? 'OK' : 'MISSING');
    console.log('CLIENT_SECRET:', CLIENT_SECRET ? 'OK' : 'MISSING');
    console.log('REDIRECT_URI:', REDIRECT_URI ? 'OK' : 'MISSING');

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
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
      const error = await tokenResponse.text();
      console.error('Token error:', error);
      throw new Error('Falha ao obter token: ' + error);
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

    res.status(200).json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
      },
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
};
