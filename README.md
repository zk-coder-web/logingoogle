# 🔐 Google Login Test

Mini sistema para testar autenticação com Google OAuth 2.0

## 📋 Como Usar

### 1. Abrir o Sistema
- Abra `index.html` no navegador
- Ou acesse: `http://localhost:3000/google_login/` (se estiver rodando em um servidor)

### 2. Configurar
- **Google Client ID**: Seu ID do Google Console
- **Redirect URI**: Deve apontar para `callback.html`
  - Exemplo: `http://localhost:3000/google_login/callback.html`
  - Em produção: `https://seu-dominio.com/google_login/callback.html`

### 3. Salvar Configurações
- Clique em "💾 Salvar Config"
- As configurações são salvas no localStorage

### 4. Fazer Login
- Clique em "🔵 Login com Google"
- Você será redirecionado para o Google
- Selecione sua conta Google
- Será redirecionado de volta com um código de autorização

### 5. Resultado
- Se bem-sucedido, você verá o código de autorização
- Este código deve ser trocado por um token de acesso no seu backend

## 🔧 Configuração no Google Console

1. Vá para https://console.cloud.google.com
2. Crie um novo projeto ou selecione um existente
3. Vá em **Credenciais** → **Criar Credenciais** → **ID do Cliente OAuth 2.0**
4. Selecione **Aplicativo da Web**
5. Em **Origens JavaScript autorizadas**, adicione (SEM / no final):
   - `http://localhost:3000` (desenvolvimento)
   - `https://seu-projeto.vercel.app` (produção - substitua pelo seu domínio)
6. Em **URIs de redirecionamento autorizados**, adicione:
   - `http://localhost:3000/google_login/callback.html` (desenvolvimento)
   - `https://seu-projeto.vercel.app/callback.html` (produção)
7. Copie o **Client ID** e cole no formulário

## 📝 Arquivos

- **index.html** - Página principal com formulário de configuração e botão de login
- **callback.html** - Página que recebe o código do Google
- **README.md** - Este arquivo

## 🚀 Próximos Passos

Depois de testar o login:

1. Pegue o código de autorização recebido
2. No seu backend, troque o código por um token de acesso:
   ```bash
   POST https://oauth2.googleapis.com/token
   
   {
     "code": "seu-codigo-aqui",
     "client_id": "seu-client-id",
     "client_secret": "seu-client-secret",
     "redirect_uri": "http://localhost:3000/google_login/callback.html",
     "grant_type": "authorization_code"
   }
   ```

3. Use o token de acesso para obter informações do usuário:
   ```bash
   GET https://www.googleapis.com/oauth2/v2/userinfo
   Authorization: Bearer seu-access-token
   ```

## ⚠️ Segurança

- **Nunca** compartilhe seu `Client Secret`
- **Nunca** coloque o `Client Secret` no frontend
- O `Client Secret` deve ficar apenas no backend
- Este é apenas um teste local - em produção, use um backend seguro

## 🐛 Troubleshooting

### "Erro: redirect_uri_mismatch"
- Verifique se o Redirect URI no Google Console é exatamente igual ao configurado aqui
- Inclua o protocolo (http:// ou https://)

### "Erro: invalid_client"
- Verifique se o Client ID está correto
- Certifique-se de que o projeto está ativo no Google Console

### Código não aparece
- Verifique o console do navegador (F12) para erros
- Certifique-se de que o JavaScript está habilitado

## 📚 Referências

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)
