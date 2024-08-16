export default class User {
    constructor(id, name, email, address, roles = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.roles = roles; // Array of roles, e.g., ['customer', 'vendor']
    }

    addRole(role) {
        if (!this.roles.includes(role)) {
            this.roles.push(role);
        }
    }

    removeRole(role) {
        this.roles = this.roles.filter(r => r !== role);
    }

    hasRole(role) {
        return this.roles.includes(role);
    }

    getProfile() {
        return {
            name: this.name,
            email: this.email,
            address: this.address,
            roles: this.roles,
        };
    }
}
