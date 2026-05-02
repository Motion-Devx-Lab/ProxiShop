// Expanded South African Product Database
const db = {
    "10kg maize meal": { Shoprite: 99.00, Spar: 105.00, Boxer: 95.00, Usave: 94.00, Checkers: 99.99, Roots: 102.00, Woolworths: 120.00 },
    "10kg rice": { Shoprite: 115.00, Spar: 125.00, Boxer: 110.00, Usave: 109.00, Checkers: 115.00, Roots: 118.00, Woolworths: 145.00 },
    "2l milk": { Shoprite: 34.99, Spar: 36.99, Boxer: 33.00, Usave: 32.99, Checkers: 35.99, Roots: 36.00, Woolworths: 39.99 },
    "white bread": { Shoprite: 15.00, Spar: 17.50, Boxer: 14.50, Usave: 14.00, Checkers: 16.00, Roots: 15.50, Woolworths: 19.00 }
};

let shoppingList = [];

// Initialize location detection on load
window.onload = () => {
    detectLocation();
};

document.getElementById('detect-btn').addEventListener('click', detectLocation);

document.getElementById('set-manual-btn').addEventListener('click', () => {
    const coords = document.getElementById('manual-coords').value.split(',');
    if (coords.length === 2) {
        updateLocationStatus(parseFloat(coords[0]), parseFloat(coords[1]), "Manually set");
    } else {
        alert("Please enter coordinates as: Lat, Lng");
    }
});

function detectLocation() {
    const status = document.getElementById('location-status');
    
    if (!navigator.geolocation) {
        status.innerHTML = "Geolocation is not supported by your browser";
        return;
    }

    status.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Detecting location...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            updateLocationStatus(lat, lng, "Live detection");
        },
        (error) => {
            status.innerHTML = "Error: " + error.message + ". Please enter coordinates manually.";
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function updateLocationStatus(lat, lng, method) {
    const status = document.getElementById('location-status');
    status.innerHTML = `
        <i class="fas fa-check-circle" style="color: #2ecc71;"></i> Location loaded via ${method}<br>
        <small>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}</small>
    `;
    
    // In a real app, this would trigger an API call to find stores near these coordinates.
    console.log(`Searching for Shoprite, Spar, etc. near ${lat}, ${lng}`);
}

// Handle Single Add and Comma-Separated Input
document.getElementById('add-btn').addEventListener('click', () => {
    const rawInput = document.getElementById('item-input').value.toLowerCase();
    const items = rawInput.split(',').map(i => i.trim());
    
    items.forEach(itemName => {
        processItem(itemName, parseInt(document.getElementById('item-qty').value));
    });
    
    document.getElementById('item-input').value = '';
});

// Handle Bulk Import (One per line)
document.getElementById('bulk-btn').addEventListener('click', () => {
    const lines = document.getElementById('bulk-items').value.split('\n');
    lines.forEach(line => {
        if(line.trim()) processItem(line.trim().toLowerCase(), 1);
    });
    document.getElementById('bulk-items').value = '';
});

function processItem(name, qty) {
    if (db[name]) {
        shoppingList.push({ name, qty });
        calculateOptimalPlan();
    } else {
        // Instead of a annoying alert, we'll log it to a status area
        console.warn(`Item "${name}" not found. Creating a smart estimate...`);
        // Basic fallback logic:
        db[name] = { Shoprite: 50, Woolworths: 70, Checkers: 55 }; // Placeholder
        shoppingList.push({ name, qty });
        calculateOptimalPlan();
    }
}

function calculateOptimalPlan() {
    const stores = ["Shoprite", "Spar", "Checkers", "Woolworths", "Boxer", "Usave", "Roots"];
    let plan = {};
    let totalSavings = 0;

    // Initialize plan object for stores
    stores.forEach(s => plan[s] = { items: [], total: 0 });

    shoppingList.forEach(listItem => {
        let bestPrice = Infinity;
        let bestStore = "";
        
        // Find the best price among retailers
        stores.forEach(store => {
            const price = db[listItem.name] ? db[listItem.name][store] : null;
            if (price && price < bestPrice) {
                bestPrice = price;
                bestStore = store;
            }
        });

        if (bestStore) {
            plan[bestStore].items.push({
                name: listItem.name,
                price: bestPrice,
                qty: listItem.qty,
                subtotal: bestPrice * listItem.qty
            });
            plan[bestStore].total += bestPrice * listItem.qty;
        }
    });

    renderPlan(plan);
}

function renderPlan(plan) {
    const container = document.getElementById('optimal-details');
    container.innerHTML = "";
    let grandTotal = 0;

    for (let store in plan) {
        if (plan[store].items.length > 0) {
            grandTotal += plan[store].total;
            
            const section = document.createElement('div');
            section.className = 'store-group';
            section.innerHTML = `
                <div class="store-header" onclick="toggleDropdown(this)">
                    <span>${store} (${plan[store].items.length} items)</span>
                    <span>R${plan[store].total.toFixed(2)} ▼</span>
                </div>
                <div class="item-list">
                    ${plan[store].items.map(i => `
                        <div class="item-row">
                            <span>${i.qty}x ${i.name}</span>
                            <span class="price-best">R${i.subtotal.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(section);
        }
    }

    document.getElementById('plan-summary').innerHTML = `
        Total Estimated Cost: R${grandTotal.toFixed(2)} | 
        Visit ${Object.values(plan).filter(s => s.items.length > 0).length} stores for maximum savings.
    `;
}

function toggleDropdown(element) {
    const list = element.nextElementSibling;
    list.style.display = list.style.display === "block" ? "none" : "block";
}