// ProxiShop JavaScript Application
class ProxiShop {
    constructor() {
        this.shoppingList = [];
        this.budget = 0;
        this.userLocation = null;
        this.nearbyStores = [];
        this.storeGroups = {};
        
        // Real store locations across South Africa with accurate coordinates
        this.storeLocations = {
            shoprite: [
                { name: 'Boxer', lat: -25.4530, lng: 28.6480, city: 'Pretoria', address: 'Moloto, Pretoria' },
                { name: 'Shoprite Sandton City', lat: -26.1077, lng: 28.0567, city: 'Johannesburg', address: 'Sandton City, Johannesburg' },
                { name: 'Shoprite Mall of Africa', lat: -25.9903, lng: 28.1289, city: 'Midrand', address: 'Mall of Africa, Midrand' },
                { name: 'Shoprite Canal Walk', lat: -33.9812, lng: 18.5021, city: 'Cape Town', address: 'Canal Walk, Century City' },
                { name: 'Shoprite Gateway', lat: -29.8587, lng: 31.0218, city: 'Durban', address: 'Gateway Theatre of Shopping, Umhlanga' },
                { name: 'Shoprite Menlyn Park', lat: -25.7847, lng: 28.2766, city: 'Pretoria', address: 'Menlyn Park, Pretoria' },
                { name: 'Shoprite Greenacres', lat: -33.9580, lng: 25.6194, city: 'Port Elizabeth', address: 'Greenacres Shopping Centre' },
                { name: 'Shoprite Eastgate', lat: -26.1392, lng: 28.2106, city: 'Johannesburg', address: 'Eastgate Shopping Centre' },
                { name: 'Shoprite Tygervalley', lat: -33.9776, lng: 18.6342, city: 'Cape Town', address: 'Tygervalley Shopping Centre' },
                { name: 'Shoprite Pavilion', lat: -29.8532, lng: 31.0189, city: 'Durban', address: 'Pavilion Shopping Centre' },
                { name: 'Shoprite Brooklyn Mall', lat: -25.7479, lng: 28.2293, city: 'Pretoria', address: 'Brooklyn Mall, Pretoria' }
            ],
            spar: [
                { name: 'Phola Spar', lat: -25.4530, lng: 28.6480, city: 'Pretoria', address: 'Moloto, Pretoria' },
                { name: 'Spar Norwood', lat: -26.1518, lng: 28.0676, city: 'Johannesburg', address: 'Norwood Mall, Johannesburg' },
                { name: 'Spar V&A Waterfront', lat: -33.9040, lng: 18.4141, city: 'Cape Town', address: 'V&A Waterfront, Cape Town' },
                { name: 'Spar Gateway', lat: -29.8587, lng: 31.0218, city: 'Durban', address: 'Gateway Theatre of Shopping' },
                { name: 'Spar Menlyn', lat: -25.7847, lng: 28.2766, city: 'Pretoria', address: 'Menlyn Park, Pretoria' },
                { name: 'Spar Bloemfontein', lat: -29.0852, lng: 26.1596, city: 'Bloemfontein', address: 'Bloem Plaza Shopping Centre' },
                { name: 'Spar Fourways', lat: -26.0407, lng: 27.9941, city: 'Johannesburg', address: 'Fourways Mall, Johannesburg' },
                { name: 'Spar Constantia', lat: -34.0289, lng: 18.4478, city: 'Cape Town', address: 'Constantia Village, Cape Town' },
                { name: 'Spar Cornubia', lat: -29.7247, lng: 31.0589, city: 'Durban', address: 'Cornubia Mall, Durban' },
                { name: 'Spar Centurion', lat: -25.8600, lng: 28.1899, city: 'Centurion', address: 'Centurion Mall, Centurion' },
                { name: 'Spar Somerset West', lat: -34.0747, lng: 18.8449, city: 'Somerset West', address: 'Somerset Mall, Somerset West' }
            ],
            checkers: [
                { name: 'Checkers Sandton', lat: -26.1077, lng: 28.0567, city: 'Johannesburg', address: 'Sandton City, Johannesburg' },
                { name: 'Checkers Canal Walk', lat: -33.9812, lng: 18.5021, city: 'Cape Town', address: 'Canal Walk, Century City' },
                { name: 'Checkers Pavilion', lat: -29.8532, lng: 31.0189, city: 'Durban', address: 'Pavilion Shopping Centre' },
                { name: 'Checkers Menlyn', lat: -25.7847, lng: 28.2766, city: 'Pretoria', address: 'Menlyn Park, Pretoria' },
                { name: 'Checkers East London', lat: -33.0153, lng: 27.9116, city: 'East London', address: 'East London Mall' },
                { name: 'Checkers Cresta', lat: -26.1392, lng: 27.9778, city: 'Johannesburg', address: 'Cresta Shopping Centre' },
                { name: 'Checkers Tygervalley', lat: -33.9776, lng: 18.6342, city: 'Cape Town', address: 'Tygervalley Shopping Centre' },
                { name: 'Checkers Gateway', lat: -29.8587, lng: 31.0218, city: 'Durban', address: 'Gateway Theatre of Shopping' },
                { name: 'Checkers Faerie Glen', lat: -25.8725, lng: 28.2442, city: 'Pretoria', address: 'Faerie Glen, Pretoria' },
                { name: 'Checkers Bayside', lat: -34.0506, lng: 18.8449, city: 'Cape Town', address: 'Bayside Mall, Table View' }
            ],
            usave: [
                { name: 'Usave Moloto', lat: -25.4530, lng: 28.6480, city: 'Pretoria', address: 'Moloto, Pretoria' },
                { name: 'Usave Soweto', lat: -26.2681, lng: 27.8319, city: 'Johannesburg', address: 'Soweto, Johannesburg' },
                { name: 'Usave Khayelitsha', lat: -34.0389, lng: 18.6722, city: 'Cape Town', address: 'Khayelitsha, Cape Town' },
                { name: 'Usave Umlazi', lat: -29.9389, lng: 30.9389, city: 'Durban', address: 'Umlazi, Durban' },
                { name: 'Usave Mamelodi', lat: -25.7167, lng: 28.3833, city: 'Pretoria', address: 'Mamelodi, Pretoria' },
                { name: 'Usave Polokwane', lat: -23.9045, lng: 29.4689, city: 'Polokwane', address: 'Polokwane CBD' },
                { name: 'Usave Alexandra', lat: -26.1167, lng: 28.1000, city: 'Johannesburg', address: 'Alexandra, Johannesburg' },
                { name: 'Usave Gugulethu', lat: -33.9681, lng: 18.5672, city: 'Cape Town', address: 'Gugulethu, Cape Town' },
                { name: 'Usave KwaMashu', lat: -29.7389, lng: 31.0389, city: 'Durban', address: 'KwaMashu, Durban' },
                { name: 'Usave Atteridgeville', lat: -25.7833, lng: 28.3167, city: 'Pretoria', address: 'Atteridgeville, Pretoria' },
                { name: 'Usave Thohoyandou', lat: -22.9167, lng: 30.4833, city: 'Thohoyandou', address: 'Thohoyandou CBD' }
            ],
            woolworths: [
                { name: 'Woolworths Sandton City', lat: -26.1077, lng: 28.0567, city: 'Johannesburg', address: 'Sandton City, Johannesburg' },
                { name: 'Woolworths V&A Waterfront', lat: -33.9040, lng: 18.4141, city: 'Cape Town', address: 'V&A Waterfront, Cape Town' },
                { name: 'Woolworths Gateway', lat: -29.8587, lng: 31.0218, city: 'Durban', address: 'Gateway Theatre of Shopping' },
                { name: 'Woolworths Menlyn', lat: -25.7847, lng: 28.2766, city: 'Pretoria', address: 'Menlyn Park, Pretoria' },
                { name: 'Woolworths Stellenbosch', lat: -33.9348, lng: 18.8697, city: 'Stellenbosch', address: 'Stellenbosch Square' },
                { name: 'Woolworths Melrose Arch', lat: -26.1077, lng: 28.0567, city: 'Johannesburg', address: 'Melrose Arch, Johannesburg' },
                { name: 'Woolworths Canal Walk', lat: -33.9812, lng: 18.5021, city: 'Cape Town', address: 'Canal Walk, Century City' },
                { name: 'Woolworths Pavilion', lat: -29.8532, lng: 31.0189, city: 'Durban', address: 'Pavilion Shopping Centre' },
                { name: 'Woolworths Brooklyn', lat: -25.7479, lng: 28.2293, city: 'Pretoria', address: 'Brooklyn Mall, Pretoria' },
                { name: 'Woolworths Constantia', lat: -34.0289, lng: 18.4478, city: 'Cape Town', address: 'Constantia Village, Cape Town' }
            ],
            roots: [
                { name: 'Roots Moloto', lat: -25.4530, lng: 28.6480, city: 'Pretoria', address: 'Moloto, Pretoria' },
                { name: 'Roots Sandton', lat: -26.1077, lng: 28.0567, city: 'Johannesburg', address: 'Sandton CBD, Johannesburg' },
                { name: 'Roots Kloof Street', lat: -33.9319, lng: 18.4169, city: 'Cape Town', address: 'Kloof Street, Cape Town' },
                { name: 'Roots Florida Road', lat: -29.8532, lng: 31.0189, city: 'Durban', address: 'Florida Road, Durban' },
                { name: 'Roots Brooklyn', lat: -25.7479, lng: 28.2293, city: 'Pretoria', address: 'Brooklyn Street, Pretoria' },
                { name: 'Roots Nelspruit', lat: -25.4743, lng: 30.9806, city: 'Nelspruit', address: 'Nelspruit CBD' },
                { name: 'Roots Maboneng', lat: -26.2041, lng: 28.0473, city: 'Johannesburg', address: 'Maboneng Precinct, Johannesburg' },
                { name: 'Roots Long Street', lat: -33.9249, lng: 18.4241, city: 'Cape Town', address: 'Long Street, Cape Town' },
                { name: 'Roots Umhlanga', lat: -29.7247, lng: 31.0589, city: 'Durban', address: 'Umhlanga Rocks, Durban' },
                { name: 'Roots Hatfield', lat: -25.7500, lng: 28.2333, city: 'Pretoria', address: 'Hatfield, Pretoria' },
                { name: 'Roots Mbombela', lat: -25.4743, lng: 30.9806, city: 'Mbombela', address: 'Mbombela CBD' }
            ]
        };
        
        this.retailers = {
            shoprite: { name: 'Shoprite', total: 0, items: [], specials: [], nearestStore: null, distance: null },
            spar: { name: 'Spar', total: 0, items: [], specials: [], nearestStore: null, distance: null },
            checkers: { name: 'Checkers', total: 0, items: [], specials: [], nearestStore: null, distance: null },
            usave: { name: 'Usave', total: 0, items: [], specials: [], nearestStore: null, distance: null },
            woolworths: { name: 'Woolworths', total: 0, items: [], specials: [], nearestStore: null, distance: null },
            roots: { name: 'Roots', total: 0, items: [], specials: [], nearestStore: null, distance: null }
        };
        
        // Sample price database for common grocery items
        this.priceDatabase = {
            'milk': { shoprite: 18.99, spar: 19.99, checkers: 17.99, usave: 16.99, woolworths: 22.99, roots: 21.99 },
            'bread': { shoprite: 15.99, spar: 16.99, checkers: 14.99, usave: 13.99, woolworths: 19.99, roots: 18.99 },
            'eggs': { shoprite: 35.99, spar: 37.99, checkers: 33.99, usave: 31.99, woolworths: 42.99, roots: 39.99 },
            'cheese': { shoprite: 65.99, spar: 68.99, checkers: 62.99, usave: 58.99, woolworths: 78.99, roots: 72.99 },
            'butter': { shoprite: 45.99, spar: 47.99, checkers: 43.99, usave: 41.99, woolworths: 52.99, roots: 49.99 },
            'rice': { shoprite: 25.99, spar: 27.99, checkers: 24.99, usave: 22.99, woolworths: 32.99, roots: 29.99 },
            'pasta': { shoprite: 22.99, spar: 24.99, checkers: 21.99, usave: 19.99, woolworths: 28.99, roots: 26.99 },
            'tomatoes': { shoprite: 12.99, spar: 13.99, checkers: 11.99, usave: 10.99, woolworths: 18.99, roots: 16.99 },
            'onions': { shoprite: 8.99, spar: 9.99, checkers: 7.99, usave: 6.99, woolworths: 12.99, roots: 11.99 },
            'potatoes': { shoprite: 15.99, spar: 16.99, checkers: 14.99, usave: 13.99, woolworths: 22.99, roots: 19.99 },
            'apples': { shoprite: 35.99, spar: 37.99, checkers: 33.99, usave: 31.99, woolworths: 45.99, roots: 42.99 },
            'bananas': { shoprite: 18.99, spar: 19.99, checkers: 17.99, usave: 16.99, woolworths: 25.99, roots: 23.99 },
            'chicken': { shoprite: 55.99, spar: 58.99, checkers: 52.99, usave: 48.99, woolworths: 68.99, roots: 64.99 },
            'beef': { shoprite: 85.99, spar: 89.99, checkers: 82.99, usave: 78.99, woolworths: 105.99, roots: 98.99 },
            'coffee': { shoprite: 75.99, spar: 78.99, checkers: 72.99, usave: 68.99, woolworths: 95.99, roots: 89.99 },
            'tea': { shoprite: 35.99, spar: 37.99, checkers: 33.99, usave: 31.99, woolworths: 48.99, roots: 45.99 },
            'sugar': { shoprite: 28.99, spar: 30.99, checkers: 27.99, usave: 25.99, woolworths: 38.99, roots: 35.99 },
            'flour': { shoprite: 22.99, spar: 24.99, checkers: 21.99, usave: 19.99, woolworths: 32.99, roots: 29.99 },
            'oil': { shoprite: 45.99, spar: 47.99, checkers: 43.99, usave: 41.99, woolworths: 58.99, roots: 54.99 },
            'yogurt': { shoprite: 18.99, spar: 19.99, checkers: 17.99, usave: 16.99, woolworths: 25.99, roots: 23.99 }
        };
        
        // Sample specials data
        this.specials = {
            shoprite: ['milk', 'bread', 'eggs'],
            spar: ['tomatoes', 'onions', 'potatoes'],
            checkers: ['chicken', 'beef', 'rice'],
            usave: ['sugar', 'flour', 'oil'],
            woolworths: ['apples', 'bananas', 'yogurt'],
            roots: ['coffee', 'tea', 'cheese']
        };
        
        this.initializeEventListeners();
        this.loadFromLocalStorage();
    }
    
    initializeEventListeners() {
        try {
            // Budget input
            const budgetInput = document.getElementById('totalBudget');
            if (budgetInput) {
                budgetInput.addEventListener('input', (e) => {
                    this.budget = parseFloat(e.target.value) || 0;
                    this.updateBudgetDisplay();
                });
            }
            
            // Add item button
            const addBtn = document.getElementById('addItemBtn');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    this.addItemFromInput();
                });
            }
            
            // Enter key for item input
            const itemInput = document.getElementById('itemInput');
            if (itemInput) {
                itemInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.addItemFromInput();
                    }
                });
            }
            
            // Paste button
            const pasteBtn = document.getElementById('pasteBtn');
            if (pasteBtn) {
                pasteBtn.addEventListener('click', () => {
                    this.importFromPaste();
                });
            }
            
            // Location button
            const locationBtn = document.getElementById('getLocationBtn');
            if (locationBtn) {
                locationBtn.addEventListener('click', () => {
                    this.getUserLocation();
                });
            }
            
            // Manual location button
            const setLocationBtn = document.getElementById('setLocationBtn');
            if (setLocationBtn) {
                setLocationBtn.addEventListener('click', () => {
                    this.setManualLocation();
                });
            }
            
            // Manual location input
            const manualLocationInput = document.getElementById('manualLocation');
            if (manualLocationInput) {
                manualLocationInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.setManualLocation();
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing event listeners:', error);
        }
    }
    
    // Utility function to escape HTML and prevent XSS
    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    addItemFromInput() {
        try {
            const itemInput = document.getElementById('itemInput');
            const quantityInput = document.getElementById('quantityInput');
            
            if (!itemInput || !quantityInput) {
                console.error('Input elements not found');
                return;
            }
            
            const itemName = itemInput.value.trim();
            const quantity = parseInt(quantityInput.value) || 1;
            
            if (!itemName) {
                console.warn('Empty item name provided');
                return;
            }
            
            if (quantity < 1 || quantity > 999) {
                console.warn('Invalid quantity:', quantity);
                return;
            }
            
            this.addItem(itemName, quantity);
            itemInput.value = '';
            quantityInput.value = '1';
            itemInput.focus();
        } catch (error) {
            console.error('Error adding item from input:', error);
        }
    }
    
    importFromPaste() {
        try {
            const pasteArea = document.getElementById('pasteArea');
            
            if (!pasteArea) {
                console.error('Paste area not found');
                return;
            }
            
            const items = pasteArea.value.split('\n').filter(item => item.trim());
            
            if (items.length === 0) {
                console.warn('No items found in paste area');
                return;
            }
            
            let addedCount = 0;
            items.forEach(itemText => {
                try {
                    const parts = itemText.trim().split(/\s+/);
                    const itemName = parts[0];
                    const quantity = parseInt(parts[1]) || 1;
                    
                    if (itemName && quantity > 0 && quantity <= 999) {
                        this.addItem(itemName, quantity);
                        addedCount++;
                    }
                } catch (error) {
                    console.error('Error processing item:', itemText, error);
                }
            });
            
            pasteArea.value = '';
            console.log(`Successfully added ${addedCount} items from paste`);
        } catch (error) {
            console.error('Error importing from paste:', error);
        }
    }
    
    addItem(itemName, quantity = 1) {
        try {
            // Validate inputs
            if (!itemName || typeof itemName !== 'string') {
                console.error('Invalid item name:', itemName);
                return;
            }
            
            if (!quantity || quantity < 1 || quantity > 999) {
                console.error('Invalid quantity:', quantity);
                return;
            }
            
            const normalizedItem = itemName.toLowerCase().trim();
            if (!normalizedItem) {
                console.error('Empty normalized item name');
                return;
            }
            
            const prices = this.getItemPrices(normalizedItem);
            if (!prices || Object.keys(prices).length === 0) {
                console.error('No prices found for item:', normalizedItem);
                return;
            }
            
            const priceValues = Object.values(prices);
            const bestPrice = Math.min(...priceValues);
            const bestRetailer = this.getBestRetailer(prices);
            
            // Generate unique ID
            const timestamp = Date.now();
            const random = Math.random().toString(36).substr(2, 9);
            const uniqueId = `${timestamp}_${random}`;
            
            const item = {
                id: uniqueId,
                name: itemName.trim(),
                normalized: normalizedItem,
                quantity: Math.max(1, Math.min(999, quantity)),
                prices: prices,
                bestPrice: bestPrice,
                bestRetailer: bestRetailer,
                addedAt: new Date().toISOString()
            };
            
            this.shoppingList.push(item);
            this.updateDisplay();
            this.saveToLocalStorage();
            
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }
    
    getItemPrices(itemName) {
        // If item exists in database, return those prices
        if (this.priceDatabase[itemName]) {
            return { ...this.priceDatabase[itemName] };
        }
        
        // Otherwise generate random prices for demonstration
        return {
            shoprite: Math.random() * 50 + 10,
            spar: Math.random() * 50 + 10,
            checkers: Math.random() * 50 + 10,
            usave: Math.random() * 50 + 10,
            woolworths: Math.random() * 50 + 10,
            roots: Math.random() * 50 + 10
        };
    }
    
    getBestRetailer(prices) {
        let bestRetailer = 'shoprite';
        let bestPrice = prices.shoprite;
        
        for (const [retailer, price] of Object.entries(prices)) {
            if (price < bestPrice) {
                bestPrice = price;
                bestRetailer = retailer;
            }
        }
        
        return bestRetailer;
    }
    
    removeItem(itemId) {
        try {
            if (!itemId) {
                console.error('No item ID provided for removal');
                return;
            }
            
            const originalLength = this.shoppingList.length;
            this.shoppingList = this.shoppingList.filter(item => item.id !== itemId);
            
            if (this.shoppingList.length === originalLength) {
                console.warn('Item not found for removal:', itemId);
                return;
            }
            
            this.updateDisplay();
            this.saveToLocalStorage();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }
    
    updateDisplay() {
        try {
            this.updateShoppingList();
            this.updatePriceComparison();
            this.updateStoreGrouping();
            this.updateBudgetDisplay();
        } catch (error) {
            console.error('Error updating display:', error);
        }
    }
    
    updateShoppingList() {
        try {
            const listContainer = document.getElementById('shoppingList');
            const totalItemsElement = document.getElementById('totalItems');
            const totalCostElement = document.getElementById('totalCost');
            
            if (!listContainer || !totalItemsElement || !totalCostElement) {
                console.error('Shopping list elements not found');
                return;
            }
            
            if (this.shoppingList.length === 0) {
                listContainer.innerHTML = '<div class="empty-state"><p>Your shopping list is empty</p><p>Add items to get started!</p></div>';
                totalItemsElement.textContent = '0';
                totalCostElement.textContent = 'R0.00';
                return;
            }
            
            let totalItems = 0;
            let totalCost = 0;
            
            listContainer.innerHTML = this.shoppingList.map(item => {
                try {
                    // Validate item data
                    if (!item || !item.id || !item.name || !item.bestPrice || !item.quantity) {
                        console.warn('Invalid item data:', item);
                        return '';
                    }
                    
                    const itemTotal = item.bestPrice * item.quantity;
                    totalItems += item.quantity;
                    totalCost += itemTotal;
                    
                    const isSpecial = this.specials[item.bestRetailer]?.includes(item.normalized);
                    const retailerName = this.retailers[item.bestRetailer]?.name || 'Unknown';
                    
                    // Escape HTML to prevent XSS
                    const safeName = this.escapeHtml(item.name);
                    const safeRetailerName = this.escapeHtml(retailerName);
                    
                    return `
                        <div class="shopping-item">
                            <div class="shopping-item-info">
                                <div class="shopping-item-name">
                                    ${safeName} ${item.quantity > 1 ? `(${item.quantity})` : ''}
                                    ${isSpecial ? '<span class="special-badge">SPECIAL</span>' : ''}
                                </div>
                                <div class="shopping-item-details">
                                    Best price at ${safeRetailerName}
                                </div>
                            </div>
                            <div class="shopping-item-price">
                                R${itemTotal.toFixed(2)}
                            </div>
                            <div class="shopping-item-actions">
                                <button class="btn-remove" onclick="proxishop.removeItem('${item.id}')">Remove</button>
                            </div>
                        </div>
                    `;
                } catch (error) {
                    console.error('Error rendering item:', item, error);
                    return '';
                }
            }).filter(html => html).join('');
            
            totalItemsElement.textContent = totalItems;
            totalCostElement.textContent = `R${totalCost.toFixed(2)}`;
        } catch (error) {
            console.error('Error updating shopping list:', error);
        }
    }
    
    updatePriceComparison() {
        // Reset retailer data
        Object.keys(this.retailers).forEach(retailer => {
            this.retailers[retailer].total = 0;
            this.retailers[retailer].items = [];
            this.retailers[retailer].specials = [];
        });
        
        // Calculate totals for each retailer
        this.shoppingList.forEach(item => {
            Object.keys(this.retailers).forEach(retailer => {
                const price = item.prices[retailer] * item.quantity;
                this.retailers[retailer].total += price;
                
                if (this.specials[retailer]?.includes(item.normalized)) {
                    this.retailers[retailer].items.push(`${item.name} (${item.quantity})`);
                    this.retailers[retailer].specials.push(item.name);
                } else if (retailer === item.bestRetailer) {
                    this.retailers[retailer].items.push(`${item.name} (${item.quantity})`);
                }
            });
        });
        
        // Update retailer cards
        Object.keys(this.retailers).forEach(retailer => {
            const retailerData = this.retailers[retailer];
            const card = document.querySelector(`[data-retailer="${retailer}"]`);
            
            if (card) {
                // Update total
                card.querySelector('.retailer-total').textContent = `R${retailerData.total.toFixed(2)}`;
                
                // Update distance
                const distanceElement = card.querySelector('.retailer-distance');
                if (distanceElement) {
                    if (retailerData.distance !== null) {
                        distanceElement.textContent = `${retailerData.distance.toFixed(1)} km`;
                    } else {
                        distanceElement.textContent = '-- km';
                    }
                }
                
                const itemsContainer = card.querySelector('.retailer-items');
                itemsContainer.innerHTML = retailerData.items.slice(0, 3).map(item => 
                    `<div class="retailer-item">${item}</div>`
                ).join('');
                
                if (retailerData.items.length > 3) {
                    itemsContainer.innerHTML += `<div class="retailer-item">+${retailerData.items.length - 3} more</div>`;
                }
                
                const specialsContainer = card.querySelector('.retailer-specials');
                specialsContainer.innerHTML = retailerData.specials.map(special => 
                    `<span class="special-badge">${special}</span>`
                ).join('');
            }
        });
        
        // Update best deal
        this.updateBestDeal();
    }
    
    updateBestDeal() {
        const bestDealInfo = document.getElementById('bestDealInfo');
        
        if (this.shoppingList.length === 0) {
            bestDealInfo.innerHTML = '<p>Add items to see the best deal!</p>';
            return;
        }
        
        let bestRetailer = 'shoprite';
        let bestTotal = this.retailers.shoprite.total;
        
        Object.keys(this.retailers).forEach(retailer => {
            if (this.retailers[retailer].total < bestTotal) {
                bestTotal = this.retailers[retailer].total;
                bestRetailer = retailer;
            }
        });
        
        const savings = Math.max(...Object.values(this.retailers).map(r => r.total)) - bestTotal;
        
        bestDealInfo.innerHTML = `
            <div>
                <strong>${this.retailers[bestRetailer].name}</strong><br>
                Total: R${bestTotal.toFixed(2)}<br>
                ${savings > 0 ? `Save R${savings.toFixed(2)} compared to most expensive!` : 'Best value option!'}
            </div>
        `;
        
        // Highlight best retailer
        document.querySelectorAll('.retailer-card').forEach(card => {
            card.classList.remove('best-price');
        });
        document.querySelector(`[data-retailer="${bestRetailer}"]`).classList.add('best-price');
    }
    
    updateBudgetDisplay() {
        const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
        const spentAmountElement = document.getElementById('spentAmount');
        const remainingAmountElement = document.getElementById('remainingAmount');
        
        const totalCost = this.shoppingList.reduce((sum, item) => sum + (item.bestPrice * item.quantity), 0);
        const remaining = this.budget - totalCost;
        
        totalBudgetDisplay.textContent = `R${this.budget.toFixed(2)}`;
        spentAmountElement.textContent = `R${totalCost.toFixed(2)}`;
        remainingAmountElement.textContent = `R${remaining.toFixed(2)}`;
        
        // Update remaining amount color
        if (remaining < 0) {
            remainingAmountElement.style.color = '#e53e3e';
        } else if (remaining < this.budget * 0.2) {
            remainingAmountElement.style.color = '#dd6b20';
        } else {
            remainingAmountElement.style.color = '#38a169';
        }
    }
    
    // Geolocation and Store Methods
    getUserLocation() {
        const locationStatus = document.getElementById('locationStatus');
        const locationBtn = document.getElementById('getLocationBtn');
        
        if (!locationStatus || !locationBtn) {
            console.error('Location elements not found');
            return;
        }
        
        locationStatus.textContent = 'Requesting location permission...';
        locationBtn.disabled = true;
        locationBtn.innerHTML = '🔄 Detecting...';
        
        if (!navigator.geolocation) {
            this.handleLocationError('Geolocation not supported by your browser', locationStatus, locationBtn);
            return;
        }
        
        // Request high accuracy location with better error handling
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.handleLocationSuccess(position, locationStatus, locationBtn);
            },
            (error) => {
                this.handleLocationError(error, locationStatus, locationBtn);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000, // Increased timeout
                maximumAge: 600000 // 10 minutes cache
            }
        );
        
        // Also try watchPosition as backup for better accuracy
        if (navigator.geolocation.watchPosition) {
            setTimeout(() => {
                const watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        // Only update if we get a better accuracy
                        if (this.userLocation && 
                            position.coords.accuracy && 
                            position.coords.accuracy < (this.userLocation.accuracy || Infinity)) {
                            this.handleLocationSuccess(position, locationStatus, locationBtn);
                            navigator.geolocation.clearWatch(watchId);
                        }
                    },
                    (error) => {
                        console.warn('Watch position error:', error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000
                    }
                );
                
                // Stop watching after 30 seconds
                setTimeout(() => {
                    navigator.geolocation.clearWatch(watchId);
                }, 30000);
            }, 1000);
        }
    }
    
    handleLocationSuccess(position, locationStatus, locationBtn) {
        try {
            this.userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
            };
            
            const accuracy = this.userLocation.accuracy ? this.userLocation.accuracy.toFixed(0) : 'unknown';
            locationStatus.innerHTML = `
                ✅ Location detected!<br>
                <small>Accuracy: ±${accuracy}m | Lat: ${this.userLocation.lat.toFixed(4)}, Lng: ${this.userLocation.lng.toFixed(4)}</small>
            `;
            
            locationBtn.disabled = false;
            locationBtn.innerHTML = '📍 Update Location';
            
            this.findNearbyStores();
            this.updateDisplay();
            
            // Save location to localStorage
            localStorage.setItem('userLocation', JSON.stringify(this.userLocation));
        } catch (error) {
            console.error('Error handling location success:', error);
            this.handleLocationError('Error processing location data', locationStatus, locationBtn);
        }
    }
    
    handleLocationError(error, locationStatus, locationBtn) {
        let errorMessage = 'Location access denied';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable. Using Johannesburg as default.';
                break;
            case error.TIMEOUT:
                errorMessage = 'Location request timed out. Using Johannesburg as default.';
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = 'Unknown location error. Using Johannesburg as default.';
                break;
            default:
                errorMessage = 'Location error occurred. Using Johannesburg as default.';
        }
        
        locationStatus.innerHTML = `⚠️ ${errorMessage}`;
        locationBtn.disabled = false;
        locationBtn.innerHTML = '📍 Retry Location';
        
        // Default to Johannesburg
        this.userLocation = { lat: -26.2041, lng: 28.0473, accuracy: null };
        this.findNearbyStores();
        this.updateDisplay();
    }
    
    findNearbyStores() {
        if (!this.userLocation) return;
        
        Object.keys(this.retailers).forEach(retailer => {
            const stores = this.storeLocations[retailer];
            let nearestStore = null;
            let minDistance = Infinity;
            
            stores.forEach(store => {
                const distance = this.calculateDistance(this.userLocation, store);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestStore = store;
                }
            });
            
            this.retailers[retailer].nearestStore = nearestStore;
            this.retailers[retailer].distance = minDistance;
        });
        
        this.displayNearbyStores();
    }
    
    calculateDistance(loc1, loc2) {
        // Haversine formula for accurate distance calculation
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(loc2.lat - loc1.lat);
        const dLng = this.toRadians(loc2.lng - loc1.lng);
        const lat1 = this.toRadians(loc1.lat);
        const lat2 = this.toRadians(loc2.lat);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return R * c;
    }
    
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    displayNearbyStores() {
        const nearbyStoresContainer = document.getElementById('nearbyStores');
        
        if (!nearbyStoresContainer) {
            console.error('Nearby stores container not found');
            return;
        }
        
        if (!this.userLocation) {
            nearbyStoresContainer.innerHTML = '<p>Click "Detect My Location" to find nearby stores</p>';
            return;
        }
        
        // Sort retailers by distance
        const sortedRetailers = Object.keys(this.retailers).sort((a, b) => {
            const distA = this.retailers[a].distance || Infinity;
            const distB = this.retailers[b].distance || Infinity;
            return distA - distB;
        });
        
        const nearbyStoresHTML = sortedRetailers.map(retailer => {
            const retailerData = this.retailers[retailer];
            const distance = retailerData.distance || 0;
            const isNearby = distance <= 25; // Within 25km for better relevance
            const isVeryNear = distance <= 10; // Within 10km
            const isFar = distance > 100; // Over 100km
            
            let distanceClass = '';
            let distanceIcon = '';
            if (isVeryNear) {
                distanceClass = 'very-near';
                distanceIcon = '🚶';
            } else if (isNearby) {
                distanceClass = 'nearby';
                distanceIcon = '📍';
            } else if (isFar) {
                distanceClass = 'far';
                distanceIcon = '🗺️';
            } else {
                distanceClass = 'moderate';
                distanceIcon = '🚗';
            }
            
            const storeInfo = retailerData.nearestStore ? 
                `<div class="store-address">${this.escapeHtml(retailerData.nearestStore.address || retailerData.nearestStore.name)}</div>` : '';
            
            return `
                <div class="store-item ${distanceClass}">
                    <div class="store-header">
                        <div class="store-name">${distanceIcon} ${this.escapeHtml(retailerData.name)}</div>
                        <div class="store-distance">${distance.toFixed(1)} km</div>
                    </div>
                    ${storeInfo}
                    <div class="store-status">
                        ${isVeryNear ? '🟢 Very Close' : isNearby ? '🟡 Nearby' : isFar ? '🔴 Far' : '🟠 Moderate Distance'}
                    </div>
                </div>
            `;
        }).join('');
        
        nearbyStoresContainer.innerHTML = nearbyStoresHTML;
    }
    
    updateStoreGrouping() {
        const storeGroupsContainer = document.getElementById('storeGroups');
        const totalStoresElement = document.getElementById('totalStores');
        const totalSavingsElement = document.getElementById('totalSavings');
        
        if (this.shoppingList.length === 0) {
            storeGroupsContainer.innerHTML = '<div class="empty-state"><p>Add items to see your optimal shopping plan!</p></div>';
            totalStoresElement.textContent = '0';
            totalSavingsElement.textContent = 'R0.00';
            return;
        }
        
        // Group items by best price store
        this.storeGroups = {};
        let totalSavings = 0;
        
        this.shoppingList.forEach(item => {
            if (!this.storeGroups[item.bestRetailer]) {
                this.storeGroups[item.bestRetailer] = {
                    retailer: this.retailers[item.bestRetailer],
                    items: [],
                    total: 0
                };
            }
            
            this.storeGroups[item.bestRetailer].items.push(item);
            this.storeGroups[item.bestRetailer].total += item.bestPrice * item.quantity;
            
            // Calculate savings vs most expensive option
            const maxPrice = Math.max(...Object.values(item.prices));
            totalSavings += (maxPrice - item.bestPrice) * item.quantity;
        });
        
        // Sort by total cost (lowest first)
        const sortedGroups = Object.values(this.storeGroups).sort((a, b) => a.total - b.total);
        
        const storeGroupsHTML = sortedGroups.map((group, index) => {
            const retailer = group.retailer;
            const itemsHTML = group.items.map(item => {
                const isSpecial = this.specials[Object.keys(this.retailers).find(r => this.retailers[r].name === retailer.name)]?.includes(item.normalized);
                
                return `
                    <div class="store-group-item">
                        <div class="store-item-name">
                            ${item.name} ${item.quantity > 1 ? `(${item.quantity})` : ''}
                            ${isSpecial ? '<span class="store-item-special">SPECIAL</span>' : ''}
                        </div>
                        <div class="store-item-price">R${(item.bestPrice * item.quantity).toFixed(2)}</div>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="store-group" style="animation-delay: ${index * 0.1}s">
                    <div class="store-group-header">
                        <div class="store-group-title">
                            🛍️ ${retailer.name}
                            ${retailer.distance ? `<span style="font-size: 0.9rem; color: #718096;">(${retailer.distance.toFixed(1)} km)</span>` : ''}
                        </div>
                        <div class="store-group-stats">
                            <div class="store-group-items">${group.items.length} items</div>
                            <div class="store-group-total">R${group.total.toFixed(2)}</div>
                        </div>
                    </div>
                    <div class="store-group-items-list">
                        ${itemsHTML}
                    </div>
                </div>
            `;
        }).join('');
        
        storeGroupsContainer.innerHTML = storeGroupsHTML;
        totalStoresElement.textContent = Object.keys(this.storeGroups).length;
        totalSavingsElement.textContent = `R${totalSavings.toFixed(2)}`;
    }
    
    async fetchRealTimePrices(itemName) {
        // Simulate API call to fetch real-time prices
        // In a real implementation, this would call actual retailer APIs
        return new Promise((resolve) => {
            setTimeout(() => {
                // Add some random variation to simulate real-time price changes
                const basePrices = this.getItemPrices(itemName);
                const realTimePrices = {};
                
                Object.keys(basePrices).forEach(retailer => {
                    const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
                    realTimePrices[retailer] = basePrices[retailer] * (1 + variation);
                });
                
                resolve(realTimePrices);
            }, 500); // Simulate network delay
        });
    }
    
    async updateItemPrices(itemId) {
        const item = this.shoppingList.find(i => i.id === itemId);
        if (!item) return;
        
        try {
            const realTimePrices = await this.fetchRealTimePrices(item.normalized);
            item.prices = realTimePrices;
            item.bestPrice = Math.min(...Object.values(realTimePrices));
            item.bestRetailer = this.getBestRetailer(realTimePrices);
            
            this.updateDisplay();
        } catch (error) {
            console.error('Error fetching real-time prices:', error);
        }
    }
    
    saveToLocalStorage() {
        try {
            const data = {
                shoppingList: this.shoppingList,
                budget: this.budget,
                userLocation: this.userLocation
            };
            
            // Validate data before saving
            if (!Array.isArray(data.shoppingList)) {
                console.error('Invalid shopping list data');
                return;
            }
            
            if (typeof data.budget !== 'number' || data.budget < 0) {
                console.error('Invalid budget data');
                return;
            }
            
            // Save data to localStorage
            localStorage.setItem('proxishopData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    
    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('proxishopData');
            if (!savedData) {
                console.log('No saved data found');
                // Try to load saved location separately
                this.loadSavedLocation();
                return;
            }
            
            const data = JSON.parse(savedData);
            
            // Validate and load shopping list
            if (Array.isArray(data.shoppingList)) {
                this.shoppingList = data.shoppingList.filter(item => 
                    item && item.id && item.name && item.quantity && item.bestPrice
                );
            } else {
                this.shoppingList = [];
            }
            
            // Validate and load budget
            if (typeof data.budget === 'number' && data.budget >= 0) {
                this.budget = data.budget;
            } else {
                this.budget = 0;
            }
            
            // Validate and load location
            if (data.userLocation && 
                typeof data.userLocation.lat === 'number' && 
                typeof data.userLocation.lng === 'number') {
                this.userLocation = data.userLocation;
            } else {
                this.userLocation = null;
            }
            
            // Update UI
            const budgetInput = document.getElementById('totalBudget');
            if (budgetInput) {
                budgetInput.value = this.budget || '';
            }
            
            if (this.userLocation) {
                this.findNearbyStores();
            } else {
                // Try to load saved location separately
                this.loadSavedLocation();
            }
            
            this.updateDisplay();
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            // Reset to safe defaults
            this.shoppingList = [];
            this.budget = 0;
            this.userLocation = null;
        }
    }
    
    loadSavedLocation() {
        try {
            const savedLocation = localStorage.getItem('userLocation');
            if (savedLocation) {
                const location = JSON.parse(savedLocation);
                if (location && 
                    typeof location.lat === 'number' && 
                    typeof location.lng === 'number') {
                    this.userLocation = location;
                    this.findNearbyStores();
                    
                    // Update location status
                    const locationStatus = document.getElementById('locationStatus');
                    const locationBtn = document.getElementById('getLocationBtn');
                    const manualLocationInput = document.getElementById('manualLocation');
                    if (locationStatus && locationBtn && manualLocationInput) {
                        const accuracy = location.accuracy ? location.accuracy.toFixed(0) : 'unknown';
                        locationStatus.innerHTML = `
                            ✅ Location loaded from cache<br>
                            <small>Accuracy: ±${accuracy}m | Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}</small>
                        `;
                        locationBtn.innerHTML = '📍 Update Location';
                        manualLocationInput.value = `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
                    }
                }
            }
        } catch (error) {
            console.error('Error loading saved location:', error);
        }
    }
    
    setManualLocation() {
        try {
            const manualLocationInput = document.getElementById('manualLocation');
            const locationStatus = document.getElementById('locationStatus');
            const locationBtn = document.getElementById('getLocationBtn');
            
            if (!manualLocationInput || !locationStatus || !locationBtn) {
                console.error('Manual location elements not found');
                return;
            }
            
            const locationText = manualLocationInput.value.trim();
            
            if (!locationText) {
                this.handleLocationError('Please enter location coordinates', locationStatus, locationBtn);
                return;
            }
            
            // Parse location input (supports various formats)
            let lat, lng;
            
            // Try to parse as "lat, lng" format
            const parts = locationText.split(',').map(p => p.trim());
            if (parts.length === 2) {
                lat = parseFloat(parts[0]);
                lng = parseFloat(parts[1]);
            }
            
            // Try to parse as single coordinate with sign
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
                // Try to extract from common formats
                const match = locationText.match(/-?\d+\.?\d*/g);
                if (match && match.length >= 2) {
                    lat = parseFloat(match[0]);
                    lng = parseFloat(match[1]);
                }
            }
            
            if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                this.handleLocationError('Invalid coordinates. Use format: -25.7479, 28.2293', locationStatus, locationBtn);
                return;
            }
            
            // Set manual location
            this.userLocation = {
                lat: lat,
                lng: lng,
                accuracy: 10, // Manual location gets default accuracy
                timestamp: Date.now(),
                source: 'manual'
            };
            
            this.findNearbyStores();
            this.updateDisplay();
            
            // Update UI
            locationStatus.innerHTML = `
                ✅ Manual location set<br>
                <small>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}</small>
            `;
            locationBtn.innerHTML = '📍 Update Location';
            
            // Save manual location
            localStorage.setItem('userLocation', JSON.stringify(this.userLocation));
            
        } catch (error) {
            console.error('Error setting manual location:', error);
            this.handleLocationError('Error setting manual location', locationStatus, locationBtn);
        }
    }
}

// Initialize the application
const proxishop = new ProxiShop();
