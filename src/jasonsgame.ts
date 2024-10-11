import "./style.css";

// Find the div with the id of app in HTML
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing game";
document.title = gameName;

// Add the game name as a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button with the initial text
const button = document.createElement("button");
button.innerHTML = "Click me! 😈";

// Append the button to the app
app.append(button);

// Initialize variables for counting
let counter = 0;
let lastFrameTime = 0; // Track time between frames

button.onclick = () => {
  // Reset the counter when the button is clicked
  counter = 0;

  // Define the function to update the counter
  function updateCounter(timestamp: number) {
    if (lastFrameTime === 0) {
      lastFrameTime = timestamp; // Initialize the time tracker
    }

    const deltaTime = timestamp - lastFrameTime; // Time since last frame
    lastFrameTime = timestamp;

    // Increment the counter based on time passed (1 unit per second)
    counter += deltaTime / 1000;

    // Update the button text with the counter value and emoji
    button.innerHTML = `${counter.toFixed(2)} units 🖤`;

    // Request the next frame
    requestAnimationFrame(updateCounter);
  }

  // Start the animation
  requestAnimationFrame(updateCounter);
};
