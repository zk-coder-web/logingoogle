import json
import os
import requests
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlencode

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path != '/api/auth':
            self.send_response(404)
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Not found'}).encode())
            return

        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode())
            
            code = data.get('code')
            if not code:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Código não fornecido'}).encode())
                return

            # Configurações
            CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
            CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
            REDIRECT_URI = os.environ.get('REDIRECT_URI')

            if not CLIENT_ID or not CLIENT_SECRET or not REDIRECT_URI:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Variáveis de ambiente não configuradas'}).encode())
                return

            # Trocar código por token
            token_url = 'https://oauth2.googleapis.com/token'
            token_data = {
                'code': code,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'redirect_uri': REDIRECT_URI,
                'grant_type': 'authorization_code',
            }

            token_response = requests.post(token_url, data=token_data)
            if token_response.status_code != 200:
                raise Exception('Falha ao obter token')

            token_json = token_response.json()
            access_token = token_json.get('access_token')

            # Obter informações do usuário
            user_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
            user_response = requests.get(
                user_url,
                headers={'Authorization': f'Bearer {access_token}'}
            )

            if user_response.status_code != 200:
                raise Exception('Falha ao obter dados do usuário')

            user_data = user_response.json()

            # Resposta de sucesso
            response_data = {
                'success': True,
                'user': {
                    'id': user_data.get('id'),
                    'email': user_data.get('email'),
                    'name': user_data.get('name'),
                    'picture': user_data.get('picture'),
                },
                'accessToken': access_token,
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode())

        except Exception as error:
            print(f'Erro: {error}')
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(error)}).encode())
