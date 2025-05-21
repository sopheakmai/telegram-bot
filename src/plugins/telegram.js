export default {
  install: (app) => {
    const telegramScript = document.createElement('script');
    telegramScript.src = 'https://telegram.org/js/telegram-web-app.js';
    telegramScript.onload = () => {
      app.config.globalProperties.$telegram = window.Telegram.WebApp;
      // Initialize as needed
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.enableClosingConfirmation(true)
    };
    document.head.appendChild(telegramScript);
    
    // Add a composable for Composition API access
    app.provide('telegram', {
      get instance() {
        return window.Telegram?.WebApp;
      }
    });
  }
};