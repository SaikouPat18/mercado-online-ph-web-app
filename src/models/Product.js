export default class Product {
    constructor(id, name, price, description,store_name, vendorId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.store_name = store_name;
        this.vendorId = vendorId; // ID of the VendorProfile who sells this product
    }

    updatePrice(newPrice) {
        this.price = newPrice;
    }

    getDetails() {
        return {
            name: this.name,
            price: this.price,
            description: this.description,
            store_name: this.store_name,
        };
    }
}
