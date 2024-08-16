import React, { useState } from 'react';
import { getAuth, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            setError('No user is signed in.');
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await linkWithCredential(user, credential);
            setSuccess('Password added successfully.');
            navigate('/home'); // Redirect to home page
        } catch (error) {
            setError('Error adding password: ' + error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Set a Password for Your Account</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-lg">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Set Password
                </button>
            </form>
        </div>
    );
};

export default AddPassword;
