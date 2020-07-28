const host: Element | null = document.querySelector('#shadowHost');
const shadowRoot = host?.attachShadow({ mode: 'open' });
const p = document.createElement('p');
p.innerText = 'Shadow element';
p.style.color = 'red';
shadowRoot?.appendChild(p);
