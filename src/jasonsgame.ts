import "./style.css";

// Find the div with the id of app in HTML
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Money Money Money! 💸";
document.title = gameName;

// Add the game name as a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button with the initial text
const button = document.createElement("button");
button.innerHTML = "Click me! 😈";

// Create the upgrade button and money counter display
const upgradeButton = document.createElement("button");
const moneyCounterDisplay = document.createElement("div");
upgradeButton.innerHTML = "Upgrade! 💰";
upgradeButton.disabled = true; // Initially disabled
app.append(button);
app.append(upgradeButton);
app.append(moneyCounterDisplay);

let counter = 0;
let lastFrameTime = 0;
let moneyCounter = 0;

// Function to update the counter display in the button
function updateCounterDisplay() {
  button.innerHTML = `${counter.toFixed(2)} units 🖤`;
}

// Function to update the money counter display
function updateMoneyCounter() {
  moneyCounterDisplay.innerHTML = `Upgrades: ${moneyCounter}`;
  if (counter >= 10) {
    upgradeButton.disabled = false; // Enable upgrade button if counter >= 10
  } else {
    upgradeButton.disabled = true; // Disable it otherwise
  }
}

// Handle upgrade button clicks
upgradeButton.onclick = () => {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units from the counter
    moneyCounter += 1; // Increase the money counter
    updateCounterDisplay(); // Update the displayed counter
    updateMoneyCounter(); // Update the money counter display
  }
};

// Handle the main button click and start the counter
button.onclick = () => {
  // Frame-based counter update
  function updateCounter(timestamp: number) {
    if (lastFrameTime === 0) {
      lastFrameTime = timestamp; // Initialize the time tracker
    }

    const deltaTime = timestamp - lastFrameTime; // Time since last frame
    lastFrameTime = timestamp;

    // Increment the counter based on time passed (1 unit per second)
    counter += deltaTime / 1000;

    // Update the button text with the counter value and emoji
    updateCounterDisplay();

    // Update the state of the upgrade button
    updateMoneyCounter();

    // Request the next frame
    requestAnimationFrame(updateCounter);
  }

  // Start the animation (only once)
  requestAnimationFrame(updateCounter);
};
