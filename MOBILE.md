# Nossa Viagem — Transformar em app Android (APK)

O aplicativo é 100% local (armazenamento do aparelho), então funciona perfeitamente
dentro de um WebView via Capacitor — inclusive **offline** depois de instalado.

## Estrutura do projeto

```
src/
  app/            # entrada Next.js (layout, página, estilos)
  components/     # UI compartilhada (ui, nav, toasts, sheets…)
  components/pages/  # telas (Home, Roteiro, Mapa, Memórias, Mais…)
  data/           # roteiro, checklist e categorias padrão
  hooks/          # relógio, agenda calculada
  services/       # persistência local, fotos, notificações
  lib/            # tipos e utilitários de tempo/moeda
```

## Passo a passo para gerar o APK

1. **Exportar como site estático.** No `next.config.ts`, use `output: "export"`
   (as rotas são client-side; nada depende de servidor). Depois:

   ```bash
   npm run build        # gera a pasta out/
   ```

2. **Instalar o Capacitor:**

   ```bash
   npm install -D @capacitor/cli
   npm install @capacitor/core @capacitor/android
   npx cap sync
   ```

3. **Gerar o projeto Android e abrir no Android Studio:**

   ```bash
   npx cap add android
   npx cap open android
   ```

4. No Android Studio: **Build → Build Bundle(s)/APK(s) → Build APK(s)**.
   O ícone já está em `public/icons/icon-512.png` (use o *Image Asset Studio*).

## Persistência

Todos os dados (checklist, gastos, memórias, fotos, estado da surpresa,
configurações) ficam no armazenamento local do aparelho — nada se perde ao
fechar o app e nada depende de internet, exceto os mapas do Google.
