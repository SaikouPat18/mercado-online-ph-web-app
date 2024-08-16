import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/firebaseService';
import Sidebar from '../Sidebar';

function UserHome() {
    const [user] = useAuthState(getAuth());
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const storage = getStorage();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                // Fetch noImage URL only once
                const noImage = await getDownloadURL(ref(storage, `noimage.jpg`));
                
                // Fetch image URLs for each product
                const productsWithImages = await Promise.all(
                    productsData.map(async (product) => {
                        try {
                            // Attempt to get the product image URL
                            const imageUrl = await getDownloadURL(
                                ref(storage, `${product.vendor_id}/${product.id}/product_image.jpg`)
                            );
                            return { ...product, imageUrl };
                        } catch (error) {
                            // If the image doesn't exist, use noImage
                            return { ...product, imageUrl: noImage };
                        }
                    })
                );
                
                setProducts(productsWithImages);
            } catch (error) {
                console.error("Error fetching products or images: ", error);
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
            <Sidebar user={user} onLogout={handleLogout} userType="user">
            </Sidebar>

            {/* Main Content Area */}
            <div className="flex-1 p-4 transition-all duration-300 bg-gray-150">
                <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
                <div className="gap-4 flex">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="bg-white shadow-md flex flex-col items-start p-4 w-80 h-80 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold mb-2">{product.store_name}</h3>
                                
                                <img
                                    alt={product.name}
                                    className="w-full h-40 object-cover my6"
                                    src={product.imageUrl} // Use the fetched image URL or fallback
                                />
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
