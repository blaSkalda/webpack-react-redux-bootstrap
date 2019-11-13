/* eslint-disable no-console */
export const isSubscribed = false;
export const promptEvent = null;

export const beforeinstallprompt = (e) => {
  e.prompt();
};

export const onStateChange = (installingWorker) => {
  switch (installingWorker.state) {
    case 'installed':
      if (navigator.serviceWorker.controller) {
        console.log('New or updated content is available.');
      } else {
        console.log('Content is now available offline!');
      }
      break;
    case 'redundant':
      console.info('The installing service worker became redundant.');
      break;
    default:
      break;
  }
};

export const onUpdateFound = (reg) => {
  const installingWorker = reg.installing;
  installingWorker.onstatechange = () => onStateChange(installingWorker);
};

export const successRegister = (reg) => {
  // eslint-disable-next-line no-param-reassign
  reg.onupdatefound = () => onUpdateFound(reg);
};

export const addBeforeInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', beforeinstallprompt);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(successRegister)
      .catch((e) => {
        console.error('Error during service worker registration:', e);
      });
  }
};
