const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();

/*
==================================================
CONFIG
==================================================
*/
const PORT = process.env.PORT || 5000;

/*
==================================================
MIDDLEWARES
==================================================
*/
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/*
==================================================
HOME
==================================================
*/
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Verify Instagram API</title>
                <style>
                    body{
                        font-family: Arial;
                        background:#0f172a;
                        color:white;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height:100vh;
                        margin:0;
                        text-align:center;
                    }

                    .box{
                        background:#1e293b;
                        padding:40px;
                        border-radius:15px;
                        box-shadow:0 0 20px rgba(0,0,0,.4);
                    }

                    h1{
                        color:#22c55e;
                    }

                    code{
                        background:#111827;
                        padding:5px 10px;
                        border-radius:5px;
                        display:block;
                        margin-top:10px;
                    }
                </style>
            </head>

            <body>
                <div class="box">
                    <h1>✅ API funcionando</h1>
                    <p>Servidor online no Render</p>

                    <code>/health</code>
                    <code>/check/instagram</code>
                </div>
            </body>
        </html>
    `);
});

/*
==================================================
HEALTH CHECK
==================================================
*/
app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'online',
        api: 'Verify Instagram',
        timestamp: new Date().toISOString()
    });
});

/*
==================================================
CHECK USERNAME
==================================================
*/
app.get('/check/:username', (req, res) => {

    const username = req.params.username;

    console.log(`[API] Verificando @${username}`);

    // python3 no Render Linux
    const pythonProcess = spawn('python', [
        path.join(__dirname, 'checker.py'),
        username
    ]);

    let output = '';
    let errorOutput = '';
    let responded = false;

    /*
    ==============================================
    STDOUT
    ==============================================
    */
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    /*
    ==============================================
    STDERR
    ==============================================
    */
    pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.log('[PYTHON ERROR]', data.toString());
    });

    /*
    ==============================================
    PROCESS CLOSE
    ==============================================
    */
    pythonProcess.on('close', (code) => {

        if (responded) return;
        responded = true;

        console.log(`[PYTHON] Finalizado com código ${code}`);

        if (code !== 0) {

            return res.status(500).json({
                success: false,
                exists: false,
                error: 'Erro no checker.py',
                details: errorOutput
            });
        }

        try {

            const jsonMatch = output.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {

                return res.status(500).json({
                    success: false,
                    exists: false,
                    error: 'Resposta inválida do Python',
                    raw: output
                });
            }

            const result = JSON.parse(jsonMatch[0]);

            return res.json(result);

        } catch (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                exists: false,
                error: 'Erro ao processar JSON',
                details: err.message
            });
        }
    });

    /*
    ==============================================
    TIMEOUT
    ==============================================
    */
    setTimeout(() => {

        if (responded) return;

        responded = true;

        pythonProcess.kill();

        return res.status(408).json({
            success: false,
            exists: false,
            error: 'Timeout ao verificar usuário'
        });

    }, 15000);
});

/*
==================================================
404
==================================================
*/
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Rota não encontrada'
    });
});

/*
==================================================
START SERVER
==================================================
*/
app.listen(PORT, () => {

    console.log(`
╔══════════════════════════════════════╗
║                                      ║
║     🚀 API FUNCIONANDO NO RENDER     ║
║                                      ║
║     Porta: ${PORT}
║                                      ║
╚══════════════════════════════════════╝
    `);
});