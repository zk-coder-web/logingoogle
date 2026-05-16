from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configurações
CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI', 'http://localhost:3000/callback')

@app.route('/api/auth/token', methods=['POST', 'OPTIONS'])
def auth_token():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        code = data.get('code')
        
        if not code:
            return jsonify({'error': 'Código não fornecido'}), 400
        
        if not CLIENT_ID or not CLIENT_SECRET:
            return jsonify({'error': 'Variáveis de ambiente não configuradas'}), 500
        
        # Trocar código por token
        token_response = requests.post(
            'https://oauth2.googleapis.com/token',
            data={
                'code': code,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'redirect_uri': REDIRECT_URI,
                'grant_type': 'authorization_code',
            }
        )
        
        if token_response.status_code != 200:
            return jsonify({'error': 'Falha ao obter token'}), 400
        
        token_data = token_response.json()
        access_token = token_data.get('access_token')
        
        # Obter informações do usuário
        user_response = requests.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        if user_response.status_code != 200:
            return jsonify({'error': 'Falha ao obter dados do usuário'}), 400
        
        user_data = user_response.json()
        
        return jsonify({
            'success': True,
            'user': {
                'id': user_data.get('id'),
                'email': user_data.get('email'),
                'name': user_data.get('name'),
                'picture': user_data.get('picture'),
            },
            'accessToken': access_token,
        }), 200
    
    except Exception as e:
        print(f'Erro: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/')
def index():
    return open('index.html').read(), 200, {'Content-Type': 'text/html'}

@app.route('/callback')
def callback():
    return open('callback.html').read(), 200, {'Content-Type': 'text/html'}

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    app.run(debug=True, port=port)
