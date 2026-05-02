/**
 * Location-Based Store Detection System
 * Optimized for fast, reliable store distance calculations
 */

class LocationStoreDetection {
    constructor() {
        // Store coordinates database as specified
        this.stores = [
            { name: 'Shoprite', lat: -26.1234, lng: 28.0123 },
            { name: 'Woolworths', lat: -26.1456, lng: 28.0456 },
            { name: 'Checkers', lat: -26.1111, lng: 28.0222 },
            { name: 'Pick n Pay', lat: -26.1345, lng: 28.0333 }
        ];
        
        // Fallback location (Johannesburg)
        this.fallbackLocation = { lat: -26.2041, lng: 28.0473 };
        
        // Current user location
        this.userLocation = null;
    }

    /**
     * Get user's current GPS location with optimized settings
     * @returns {Promise<Object>} User location coordinates
     */
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            // Check if geolocation is supported
            if (!navigator.geolocation) {
                console.log('Geolocation not supported, using fallback');
                resolve(this.fallbackLocation);
                return;
            }

            // Optimized geolocation settings to prevent timeout
            const options = {
                timeout: 10000,           // 10 seconds timeout
                maximumAge: 300000,       // Accept cached location up to 5 mins old
                enableHighAccuracy: false  // Fast response using Wi-Fi/Cell towers
            };

            // Get current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: position.timestamp
                    };
                    console.log('Location detected:', this.userLocation);
                    resolve(this.userLocation);
                },
                (error) => {
                    console.log('Location error:', error.message, 'using fallback');
                    this.userLocation = this.fallbackLocation;
                    resolve(this.fallbackLocation);
                },
                options
            );
        });
    }

    /**
     * Calculate distance between two points using Haversine formula
     * @param {Object} point1 - First point {lat, lng}
     * @param {Object} point2 - Second point {lat, lng}
     * @returns {number} Distance in kilometers
     */
    calculateDistance(point1, point2) {
        // Earth's radius in kilometers
        const R = 6371;
        
        // Convert coordinates to radians
        const lat1 = this.toRadians(point1.lat);
        const lng1 = this.toRadians(point1.lng);
        const lat2 = this.toRadians(point2.lat);
        const lng2 = this.toRadians(point2.lng);
        
        // Calculate differences
        const dLat = lat2 - lat1;
        const dLng = lng2 - lng1;
        
        // Haversine formula
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }

    /**
     * Convert degrees to radians
     * @param {number} degrees - Angle in degrees
     * @returns {number} Angle in radians
     */
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * Calculate distances to all stores and sort by closest first
     * @param {Object} userLocation - User's current location {lat, lng}
     * @returns {Array} Stores with distances, sorted from closest to furthest
     */
    getSortedStoresByDistance(userLocation = null) {
        const location = userLocation || this.userLocation || this.fallbackLocation;
        
        // Calculate distances for each store
        const storesWithDistances = this.stores.map(store => {
            const distance = this.calculateDistance(location, store);
            return {
                ...store,
                distance: Math.round(distance * 10) / 10 // Round to 1 decimal place
            };
        });
        
        // Sort by distance (closest first)
        return storesWithDistances.sort((a, b) => a.distance - b.distance);
    }

    /**
     * Main function to detect location and get sorted stores
     * @returns {Promise<Array>} Sorted stores with distances
     */
    async detectNearbyStores() {
        try {
            // Get user location
            const location = await this.getUserLocation();
            console.log('Using location:', location);
            
            // Get sorted stores
            const sortedStores = this.getSortedStoresByDistance(location);
            
            // Log results
            console.log('Nearby stores sorted by distance:');
            sortedStores.forEach((store, index) => {
                console.log(`${index + 1}. ${store.name}: ${store.distance} km`);
            });
            
            return sortedStores;
            
        } catch (error) {
            console.error('Error detecting nearby stores:', error);
            // Return stores with fallback location
            return this.getSortedStoresByDistance(this.fallbackLocation);
        }
    }

    /**
     * Get stores within a specific radius
     * @param {number} radius - Radius in kilometers
     * @param {Object} userLocation - User's location (optional)
     * @returns {Array} Stores within the specified radius
     */
    getStoresWithinRadius(radius, userLocation = null) {
        const allStores = this.getSortedStoresByDistance(userLocation);
        return allStores.filter(store => store.distance <= radius);
    }

    /**
     * Get the nearest store
     * @param {Object} userLocation - User's location (optional)
     * @returns {Object} Nearest store with distance
     */
    getNearestStore(userLocation = null) {
        const sortedStores = this.getSortedStoresByDistance(userLocation);
        return sortedStores[0] || null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationStoreDetection;
}

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    window.LocationStoreDetection = LocationStoreDetection;
    
    // Example usage:
    /*
    const storeDetector = new LocationStoreDetection();
    
    // Detect nearby stores
    storeDetector.detectNearbyStores().then(stores => {
        console.log('Nearby stores:', stores);
        
        // Get stores within 5km radius
        const nearby5km = storeDetector.getStoresWithinRadius(5);
        console.log('Stores within 5km:', nearby5km);
        
        // Get nearest store
        const nearest = storeDetector.getNearestStore();
        console.log('Nearest store:', nearest);
    });
    */
}
