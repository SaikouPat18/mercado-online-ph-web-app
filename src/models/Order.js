export default class Order {
    constructor(id, userId, productIds, quantities, status = 'pending') {
        this.id = id;
        this.userId = userId; // ID of the User who placed the order
        this.productIds = productIds; // Array of product IDs
        this.quantities = quantities; // Array of quantities corresponding to product IDs
        this.status = status; // 'pending', 'shipped', 'delivered', 'canceled'
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    getOrderSummary() {
        return {
            userId: this.userId,
            productIds: this.productIds,
            quantities: this.quantities,
            status: this.status,
        };
    }
}
