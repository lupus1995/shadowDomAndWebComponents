class MyCounter extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  get count(): string | number | null {
    return this.getAttribute('count');
  }

  set count(val: string | number | null) {
    if (val) {
      const currentVal: string = typeof val === 'string' ? val : val.toString();
      this.setAttribute('count', currentVal);
    }
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(prop: string, oldVal: any, newVal: any) {
    if (prop === 'count') {
      this.render();
      const btn = this.shadow.querySelector('#btn');
      if (btn) {
        btn.addEventListener('click', this.inc.bind(this));
      }
    }
  }

  inc() {
    if (typeof this.count === 'string') {
      this.count = parseInt(this.count, 0) + 1;
    }
  }

  connectedCallback() {
    this.render();
    const btn = this.shadow.querySelector('#btn');
    if (btn) {
      btn.addEventListener('click', this.inc.bind(this));
    }
  }

  render() {
    this.shadow.innerHTML = `
        <h1>Counter</h1>
        ${this.count}
        <button id="btn">Increment</button>
      `;
  }
}

customElements.define('my-counter', MyCounter);
