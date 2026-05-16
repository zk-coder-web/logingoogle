# 🔐 Google Login Test

Mini sistema para testar autenticação com Google OAuth 2.0 com backend Node.js

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js instalado

### Passo 1: Rodar o Servidor
```bash
cd google_login
node server.js
```

Você verá:
```
Servidor rodando em http://localhost:3000
Acesse: http://localhost:3000
```

### Passo 2: Testar
1. Abra `http://localhost:3000` no navegador
2. Cole seu **Google Client ID**
3. Clique em "Login com Google"
4. Selecione sua conta Google
5. Você verá seu **nome, email e foto**! 🎉

---

## 📋 Como Usar

### 1. Configurar
- **Google Client ID**: Seu ID do Google Console
- **Redirect URI**: `http://localhost:3000/callback`

### 2. Salvar Configurações
- Clique em "💾 Salvar Config"
- As configurações são salvas no localStorage

### 3. Fazer Login
- Clique em "🔵 Login com Google"
- Você será redirecionado para o Google
- Selecione sua conta Google
- Será redirecionado de volta com seus dados!

### 4. Resultado
- ✅ Nome
- ✅ Email
- ✅ ID do Google
- ✅ Foto de Perfil

---

## 🔧 Configuração no Google Console

1. Vá para https://console.cloud.google.com
2. Crie um novo projeto ou selecione um existente
3. Vá em **Credenciais** → **Criar Credenciais** → **ID do Cliente OAuth 2.0**
4. Selecione **Aplicativo da Web**
5. Em **Origens JavaScript autorizadas**, adicione (SEM / no final):
   - `http://localhost:3000` (desenvolvimento)
6. Em **URIs de redirecionamento autorizados**, adicione:
   - `http://localhost:3000/callback` (desenvolvimento)
7. Copie o **Client ID** e cole no formulário

---

## 📝 Arquivos

- **index.html** - Página principal com formulário
- **callback.html** - Página que recebe os dados do usuário
- **server.js** - Backend Node.js que troca código por token
- **README.md** - Este arquivo

---

## 🔐 Como Funciona

1. **Frontend** (index.html):
   - Redireciona para Google OAuth
   - Recebe o código de autorização

2. **Backend** (server.js):
   - Troca o código por um token de acesso
   - Obtém os dados do usuário do Google
   - Retorna os dados para o frontend

3. **Frontend** (callback.html):
   - Exibe os dados do usuário (nome, email, foto)

---

## ⚠️ Segurança

- ✅ `Client Secret` fica apenas no backend (server.js)
- ✅ Frontend não expõe secrets
- ✅ Comunicação segura entre frontend e backend
- ⚠️ Em produção, use HTTPS e variáveis de ambiente

---

## 🚀 Deploy em Produção

Para fazer deploy em produção:

1. Use um serviço como Heroku, Railway ou Vercel
2. Configure as variáveis de ambiente:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `REDIRECT_URI`
3. Atualize o Google Console com as URLs de produção

---

## 🐛 Troubleshooting

### "Erro: redirect_uri_mismatch"
- Verifique se o Redirect URI no Google Console é exatamente igual
- Inclua o protocolo (http:// ou https://)

### "Erro: invalid_client"
- Verifique se o Client ID está correto
- Certifique-se de que o projeto está ativo

### Servidor não inicia
- Verifique se a porta 3000 está disponível
- Tente: `node server.js`

### Dados do usuário não aparecem
- Verifique o console do navegador (F12)
- Certifique-se de que o servidor está rodando

---

## 📚 Referências

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)
- [Node.js HTTP Server](https://nodejs.org/en/docs/guides/nodejs-http-server/)

