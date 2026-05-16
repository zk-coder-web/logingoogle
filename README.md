# 🔐 Google Login Test

Mini sistema para testar autenticação com Google OAuth 2.0 (HTML + JavaScript)

## 🚀 Como Usar

### 1. Abrir o Sistema
- Abra `index.html` no navegador
- Ou acesse: `https://logingoogle-flame.vercel.app`

### 2. Configurar
- **Google Client ID**: Seu ID do Google Console
- **Redirect URI**: `https://logingoogle-flame.vercel.app/callback.html`

### 3. Salvar Configurações
- Clique em "💾 Salvar Config"
- As configurações são salvas no localStorage

### 4. Fazer Login
- Clique em "🔵 Login com Google"
- Você será redirecionado para o Google
- Selecione sua conta Google
- Será redirecionado de volta com o código de autorização

### 5. Resultado
- Se bem-sucedido, você verá o código de autorização
- Este código deve ser trocado por um token de acesso no seu backend

---

## 🔧 Configuração no Google Console

1. Vá para https://console.cloud.google.com
2. Crie um novo projeto ou selecione um existente
3. Vá em **Credenciais** → **Criar Credenciais** → **ID do Cliente OAuth 2.0**
4. Selecione **Aplicativo da Web**
5. Em **Origens JavaScript autorizadas**, adicione (SEM / no final):
   - `https://logingoogle-flame.vercel.app`
6. Em **URIs de redirecionamento autorizados**, adicione:
   - `https://logingoogle-flame.vercel.app/callback.html`
7. Copie o **Client ID** e cole no formulário

---

## 📝 Arquivos

- **index.html** - Página principal com formulário
- **callback.html** - Página que recebe o código do Google
- **README.md** - Este arquivo

---

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
     "redirect_uri": "https://logingoogle-flame.vercel.app/callback.html",
     "grant_type": "authorization_code"
   }
   ```

3. Use o token de acesso para obter informações do usuário:
   ```bash
   GET https://www.googleapis.com/oauth2/v2/userinfo
   Authorization: Bearer seu-access-token
   ```

---

## ⚠️ Segurança

- **Nunca** compartilhe seu `Client Secret`
- **Nunca** coloque o `Client Secret` no frontend
- O `Client Secret` deve ficar apenas no backend
- Este é apenas um teste - em produção, use um backend seguro

---

## 📚 Referências

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)

