# AutoPrime Electric

Site de venda de veículos elétricos com chatbot de IA e WhatsApp.

## Estrutura
- `index.html`, `style.css`, `app.js`: o site (sem build, é só subir).
- `stock.json`: **estoque**. Edite aqui (nome, preço, fotos em `img/`) e o site atualiza.
- `img/`: fotos com fundo removido (WebP transparente).
- `api/chat.js`: chatbot com IA (Claude). `api/whatsapp.js`: resposta automática no WhatsApp.

## Publicar na Vercel
1. Crie um repositório no GitHub com esta pasta e importe em vercel.com/new (ou rode `npx vercel` dentro da pasta).
2. Em **Settings → Environment Variables**, cadastre `ANTHROPIC_API_KEY` (chave em console.anthropic.com). Sem ela o chat usa respostas simples por palavras-chave. Opcional: `ANTHROPIC_MODEL`.
3. Troque `WA_NUMBER` no topo de `app.js` pelo número da loja (DDI+DDD+número, ex.: 5562999999999).

## WhatsApp automático com IA (opcional)
Exige conta Meta for Developers com WhatsApp Business Cloud API.
1. Cadastre `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` e `WHATSAPP_VERIFY_TOKEN` (uma senha sua) na Vercel.
2. No painel da Meta, configure o webhook: `https://SEU-SITE.vercel.app/api/whatsapp` com o mesmo verify token e assine o campo `messages`.

## Atenção
- As fotos atuais têm a marca "3MODELS.ORG" na placa e vêm de renders de terceiros. Para vender de verdade, use fotos reais do seu estoque ou imagens licenciadas.
- Nomes, preços, autonomia e taxas são exemplos. Confira tudo antes de publicar.
