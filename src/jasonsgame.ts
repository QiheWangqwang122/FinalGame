import "./style.css";

// Find the div with the id of app in HTML
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Money Money Money 💰💰💰";
document.title = gameName;

// Add the game name as a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a display for the current counter value
const counterDisplay = document.createElement("div");
let counter = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} units`;
app.append(counterDisplay);

const growthRateDisplay = document.createElement("div");
let growthRate = 0; // Initial growth rate
growthRateDisplay.innerHTML = `Production Rate: ${growthRate.toFixed(2)} units/sec`;
app.append(growthRateDisplay);

// Create a display for the items purchased
const itemsPurchasedDisplay = document.createElement("div");
itemsPurchasedDisplay.innerHTML = `Items purchased: `;
app.append(itemsPurchasedDisplay);

// Define the available items with names, costs, rates, and descriptions
interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Worker 🛠️",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "Hires a worker to help increase production.",
  },
  {
    name: "Machine ⚙️",
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "Invest in a machine for more automated production.",
  },
  {
    name: "Factory 🏭",
    cost: 1000,
    rate: 50.0,
    count: 0,
    description: "Build a factory to mass-produce units.",
  },
  {
    name: "Corporate Executive 👨‍💼",
    cost: 5000,
    rate: 100,
    count: 0,
    description: "Hire an executive to lead production strategies.",
  },
  {
    name: "AI System 🤖",
    cost: 10000,
    rate: 500,
    count: 0,
    description: "Install an AI system for ultimate efficiency.",
  },
];

// Display available items and their buttons
const itemButtons: HTMLButtonElement[] = [];

availableItems.forEach((item, index) => {
  const itemButton = document.createElement("button");
  itemButton.innerHTML = `Buy ${item.name} (${item.cost} units, +${item.rate} units/sec) - ${item.description}`;
  itemButton.disabled = true;
  itemButtons.push(itemButton);
  app.append(itemButton);

  // Handle click for each item
  itemButton.onclick = () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      availableItems[index].count += 1;
      availableItems[index].cost *= 1.15; // Increase cost by 15% after each purchase
      updateDisplays();
    }
  };
});

let isFirstClick = false;

// Function to update all displays
function updateDisplays() {
  counterDisplay.innerHTML = `${counter.toFixed(2)} units`;
  growthRateDisplay.innerHTML = `Production Rate: ${growthRate.toFixed(2)} units/sec`;

  // Update item button labels and enable/disable buttons based on available units
  availableItems.forEach((item, index) => {
    itemButtons[index].innerHTML =
      `Buy ${item.name} (${item.cost.toFixed(2)} units, +${item.rate} units/sec) - ${item.description}`;
    itemButtons[index].disabled = counter < item.cost;
  });

  // Update items purchased display
  itemsPurchasedDisplay.innerHTML = `Items purchased: ${availableItems.map((item) => `${item.name}: ${item.count}`).join(", ")}`;
}

// Growth over time using requestAnimationFrame
let lastFrameTime = 0;

function updateCounter(timestamp: number) {
  if (lastFrameTime === 0) {
    lastFrameTime = timestamp;
  }

  const deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  // Increment counter based on growth rate and time passed
  counter += (growthRate * deltaTime) / 1000;
  updateDisplays();

  // Continue the loop
  requestAnimationFrame(updateCounter);
}

const button = document.createElement("button");
button.innerHTML = "Click me! 😈";
app.append(button);

button.onclick = () => {
  if (!isFirstClick) {
    isFirstClick = true;
    growthRate = 1; // Start the default growth rate of 1 unit/sec
    requestAnimationFrame(updateCounter); // Start automatic growth
  }
  counter++; // Increment on click
  button.innerHTML = `🤑 ${counter.toFixed(2)} units`;

  updateDisplays();
};
