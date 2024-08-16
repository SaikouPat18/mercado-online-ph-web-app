import React, { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const PasswordSetup = () => {
    const [user] = useAuthState(getAuth());
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('No user is signed in.');
            return;
        }

        try {
            await updatePassword(user, newPassword);
            setSuccess('Password updated successfully.');
        } catch (error) {
            setError('Error updating password: ' + error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Set Your Password</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-lg">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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

export default PasswordSetup;
