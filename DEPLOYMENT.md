# 🚀 Deploy do Mini Sistema Google Login

## 📋 Configuração Google Console

### ✅ Origens JavaScript Autorizadas (SEM / no final)
```
http://localhost:3000
https://seu-projeto.vercel.app
```

### ✅ URIs de Redirecionamento Autorizados (COM / no caminho)
```
http://localhost:3000/google_login/callback.html
https://seu-projeto.vercel.app/callback.html
```

**Importante**: O Google Console não aceita `/` no final das Origens JavaScript!

---

## 🚀 Deploy no Vercel

### Passo 1: Preparar o Projeto
A pasta `google_login` contém:
- `index.html` - Página principal
- `callback.html` - Callback do Google
- `README.md` - Instruções

### Passo 2: Deploy via Vercel CLI
```bash
# Instalar Vercel CLI (se não tiver)
npm install -g vercel

# Ir para a pasta
cd google_login

# Fazer deploy
vercel
```

### Passo 3: Deploy via GitHub
1. Faça push da pasta para GitHub
2. Vá para https://vercel.com
3. Clique em **Add New** → **Project**
4. Selecione seu repositório
5. Em **Root Directory**, coloque: `google_login`
6. Clique em **Deploy**

### Passo 4: Atualizar Google Console
Depois que o Vercel gerar a URL (ex: `https://google-login-xyz.vercel.app`):

1. Vá para Google Console
2. Edite seu OAuth Client
3. Atualize as URLs:
   - **Origens JavaScript**: `https://google-login-xyz.vercel.app`
   - **URIs de Redirecionamento**: `https://google-login-xyz.vercel.app/callback.html`
4. Salve e aguarde 5-30 minutos

---

## 🧪 Testar

### Local
```bash
# Abrir no navegador
http://localhost:3000/google_login/index.html
```

### Produção (Vercel)
```
https://seu-projeto.vercel.app/index.html
```

---

## 📝 Estrutura de Arquivos

```
google_login/
├── index.html          # Página principal com formulário
├── callback.html       # Callback do Google
├── README.md          # Instruções de uso
└── DEPLOYMENT.md      # Este arquivo
```

---

## ⚠️ Pontos Importantes

1. **Sem / no final das Origens**: `https://seu-projeto.vercel.app` ✅
2. **Com / no caminho dos URIs**: `https://seu-projeto.vercel.app/callback.html` ✅
3. **Aguarde 5-30 minutos** após atualizar Google Console
4. **Teste local primeiro** antes de fazer deploy
5. **Salve o Client ID** para usar no formulário

---

## 🔗 Links Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- [Google Console](https://console.cloud.google.com)

---

**Última atualização**: 16 de Maio de 2026
