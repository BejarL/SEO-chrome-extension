const shadowHost = document.createElement('div');
document.body.appendChild(shadowHost);
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
const contentElement = document.createElement('div');
contentElement.textContent = 'Enhanced by your Chrome Extension';
shadowRoot.appendChild(contentElement);