import "./style.css";
// find the div with the id of app in html.
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Click me!😈";

button.onclick = () => {
  alert("Button was clicked!");
};

app.append(button);

let cookieCount = 0;

function updateCounterDisplay() {
  button.innerHTML = `${cookieCount} devils clicked!😈`;
}

button.onclick = () => {
  cookieCount++;
  updateCounterDisplay();
  setInterval(() => {
    cookieCount++;
    updateCounterDisplay();
  }, 1000);
};

// Append the button to the app element
app.append(button);
