import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/firebaseService';
import Sidebar, { SidebarItem } from '../Sidebar';
import { UserIcon } from '@heroicons/react/24/outline';

function UserHome() {
    const [user] = useAuthState(getAuth());
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        loadProducts();
    }, [user]);

    const handleLogout = async () => {
        try {
            await firebaseSignOut(getAuth());
            navigate('/'); // Redirect after logout
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Collapsible Sidebar */}
            <Sidebar user={user} onLogout={handleLogout} userType="vendor">
                {/* Sidebar Items */}
                {/* Add vendor-specific items if needed */}
            </Sidebar>

            {/* Main Content Area */}
            <div className="flex-1 p-4 transition-all duration-300 bg-gray-150">
                <h2 className="text-lg font-semibold mb-4">Vendor Dashboard</h2>
                <div className="space-y-4">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p className="text-gray-700">{product.description}</p>
                                <p className="text-blue-500 mt-2">{product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserHome;
