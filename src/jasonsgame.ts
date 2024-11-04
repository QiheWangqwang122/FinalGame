
import "./style.css";

// Game configuration constants
const CONFIG = {
    gameName: "Money Money Money 💰💰💰",
    initialCounter: 0,
    initialGrowthRate: 0,
    items: [
        { name: "Item A", cost: 10, rate: 0.5 },
        { name: "Item B", cost: 50, rate: 1.5 },
        { name: "Item C", cost: 100, rate: 2.5 }
    ]
};

// Find the div with the id of app in HTML
const app: HTMLDivElement = document.querySelector("#app")!;

// Helper function to create and append elements
function createElement(tag: string, content: string, parent: HTMLElement) {
    const element = document.createElement(tag);
    element.innerHTML = content;
    parent.append(element);
    return element;
}

// Set game title
document.title = CONFIG.gameName;
createElement("h1", CONFIG.gameName, app);

// Display for the counter and growth rate
let counter = CONFIG.initialCounter;
const counterDisplay = createElement("div", `${counter.toFixed(2)} units`, app);

let growthRate = CONFIG.initialGrowthRate;
const growthRateDisplay = createElement("div", `Production Rate: ${growthRate.toFixed(2)} units/sec`, app);

// Display for items purchased
const itemsPurchasedDisplay = createElement("div", "Items purchased: ", app);

// Function to update displays
function updateDisplay() {
    counterDisplay.innerHTML = `${counter.toFixed(2)} units`;
    growthRateDisplay.innerHTML = `Production Rate: ${growthRate.toFixed(2)} units/sec`;
}

// Event to simulate purchasing items
function purchaseItem(item) {
    if (counter >= item.cost) {
        counter -= item.cost;
        growthRate += item.rate;
        updateDisplay();
        itemsPurchasedDisplay.innerHTML += ` ${item.name},`;
    }
}

// Render available items for purchase
CONFIG.items.forEach((item) => {
    const itemButton = createElement("button", `Buy ${item.name} - Cost: ${item.cost}`, app);
    itemButton.addEventListener("click", () => purchaseItem(item));
});

// Main game loop for incrementing counter by growth rate
setInterval(() => {
    counter += growthRate / 60;
    updateDisplay();
}, 1000 / 60);
