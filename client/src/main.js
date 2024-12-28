import './style.css'

document.querySelector("#header").innerHTML = `
    <h1>Command & Conquer Chess</h1>
`
function click() {
    alert('Clicked')
}

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Testing</h1>
    <button id="card">Play</button>
  </div>
`;

document.querySelector("#card").addEventListener("click", click);
