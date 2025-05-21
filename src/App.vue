<template>
  <div class="telegram-mini-app" :class="colorScheme">
    <h1>{{ appTitle }}</h1>
    <p v-if="user">Welcome, {{ user.first_name }}!</p>
    
    <!-- App content -->
    <button @click="showAlert">Show Alert</button>
    <button @click="toggleMainButton">
      {{ isMainButtonVisible ? 'Hide' : 'Show' }} Main Button
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

// Inject the telegram instance from the plugin
const telegram = inject('telegram');

const appTitle = ref('Vue Telegram Mini App');
const user = ref(null);
const colorScheme = ref('light');
const isMainButtonVisible = ref(false);

onMounted(() => {
  const tg = telegram.instance;
  if (!tg) return;
  
  // Get user data
  if (tg.initDataUnsafe?.user) {
    user.value = tg.initDataUnsafe.user;
  }
  
  // Set color scheme
  colorScheme.value = tg.colorScheme;
  
  // Apply theme
  applyTheme(tg.themeParams);
});

function showAlert() {
  const tg = telegram.instance;
  if (tg) {
    tg.showAlert('This is a Vue-powered Telegram Mini App!');
  }
}

function toggleMainButton() {
  const tg = telegram.instance;
  if (!tg) return;
  
  if (!isMainButtonVisible.value) {
    tg.MainButton.setText('SUBMIT');
    tg.MainButton.onClick(() => {
      tg.showAlert('Main button clicked!');
    });
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
  
  isMainButtonVisible.value = !isMainButtonVisible.value;
}

function applyTheme(themeParams) {
  if (!themeParams) return;
  
  // Apply theme colors
  document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
  document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color);
  document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color);
  document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
}
</script>