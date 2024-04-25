const userLanguage = navigator.language || navigator.userLanguage;

const messages = {
  en: {
    welcome: "Welcome to our extension!",
    instructions: "Please follow the instructions."
  },
  fr: {
    welcome: "Bienvenue sur notre extension!",
    instructions: "Veuillez suivre les instructions."
  }
};

const translate = (msgKey) => {
  const lang = messages[userLanguage] ? userLanguage : 'en';
  return messages[lang][msgKey];
};

document.getElementById('welcome-msg').textContent = translate('welcome');
document.getElementById('instructions-msg').textContent = translate('instructions');
