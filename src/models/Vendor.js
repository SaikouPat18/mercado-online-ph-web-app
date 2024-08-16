// models/VendorProfile.js
export default class VendorProfile {
    constructor(id, storeName, products = []) {
        this.id = id; // Initialize private userId
        this.storeName = storeName;
        this.products = products; // Array of Product objects
    }

    // Method to get store details, without exposing userId
    getStoreDetails() {
        return {
            storeName: this.storeName,
            products: this.products.map(product => product.getDetails()),
        };
    }

    // Methods to manage products
    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
    }
}
