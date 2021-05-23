window.onload = () => {
  let template = document.createElement('template');
  template.innerHTML =
    `
  <style>
      *{
          margin:0;
          padding:0;
          box-sizing:border-box;
      }
      .container-box{
          background-color: rgb(83, 80, 80);
          position: relative;
          height:30vh;
          width:100vw;
          font-family: 'Raleway', serif;
      }
  #button {
      position:absolute;
      color:white;
      top:calc(50% - (27px/2) - 10px);
      left:calc(50% - (114px/2) - 30px);
      padding:10px 30px;
      background-color:rgb(64, 67, 247);
      border-radius:5px;
      font-size:1.5rem;
      transform: translateY(0);
      box-shadow:0px 5px 10px rgba(0, 0, 0, 0.377);
      overflow: hidden;
  }
  #button:hover {
      cursor:pointer;
  }
  #button .ripple {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.377);
      transform: scale(0);
      position:absolute;
      animation:ripple 0.3s linear;
  }
  @keyframes ripple {
      to {
          transform: scale(2.5);
          opacity: 0;
      }
  }
  .press {
      animation:press 0.2s ease-in-out;
  }
  @keyframes press {
      to{
          transform:translateY(4px);
          box-shadow: 2px 4px rgba(46, 45, 45, 0.377);
      }
  }
  </style>
  <div class="container-box">
          <span id="button">Cool button</span>
  </div>
  `;
  customElements.define('cool-button', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
    };
    connectedCallback() {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      const button = this.shadowRoot.getElementById('button');
      button.addEventListener('click', e => this.ripple(e, button));
    };

    ripple(event, elem) {
      if (elem.classList.contains('press')) {
        elem.classList.remove('press');
      }
      let span = document.createElement('span');
      span.classList.add('ripple');
      span.style.left = event.clientX - 100 / 2 - elem.offsetLeft + 'px';
      span.style.top = event.clientY - 100 / 2 - elem.offsetTop + 'px';
      span.addEventListener('animationend', e => span.remove());
      elem.classList.toggle('press');
      elem.appendChild(span);
    };
  });
  let cool = document.querySelector('.cool-div');
  cool.classList.add('hide');
  document.querySelector('cool-button').addEventListener('click', (e) => {
    cool.classList.toggle('hide');
  });
};