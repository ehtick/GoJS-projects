import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Handles light and dark themes, toggled via the theme button

let isDark = false;
if (browser) {
  if (localStorage.getItem('colorTheme')) {
    isDark = localStorage.getItem('colorTheme') === 'dark';
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

export const currentTheme = writable<'light' | 'dark'>(isDark ? 'dark' : 'light');

currentTheme.subscribe(theme => {
  if (browser) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('colorTheme', theme);
  }
});
