import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../services/firebaseService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [userType, setUserType] = useState('user'); // State for user type
    const navigate = useNavigate();

    const handleEmailSignIn = async () => {
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            // Redirect based on user type
            navigate(`/${userType}/home`);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            if (user) {
                // Check if the user has a password
                const hasPassword = user.providerData.some(provider => provider.providerId === 'password');
                if (!hasPassword) {
                    navigate('/add-password'); // Redirect to password setup if no password
                } else {
                    // Redirect based on user type
                    navigate(`/${userType}/home`);
                }
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>

                {/* User Type Selector */}
                <div className="relative flex items-center justify-center mb-6">
                    <div className="relative w-64 h-10 rounded-full border border-gray-300 bg-gray-100">
                        <div
                            className={`absolute top-0 left-0 h-full rounded-full transition-transform duration-300 ease-in-out ${userType === 'user' ? 'bg-blue-500 w-1/2 transform translate-x-0' : 'bg-gray-800 w-1/2 transform translate-x-full'
                                }`}
                        />
                        <button
                            className={`absolute left-0 top-0 w-1/2 h-full flex items-center justify-center text-white font-semibold ${userType === 'user' ? 'bg-blue-500' : 'bg-gray-300'
                                } rounded-full`}
                            onClick={() => setUserType('user')}
                        >
                            Customer
                        </button>
                        <button
                            className={`absolute right-0 top-0 w-1/2 h-full flex items-center justify-center text-white font-semibold ${userType === 'vendor' ? 'bg-gray-800' : 'bg-gray-300'
                                } rounded-full`}
                            onClick={() => setUserType('vendor')}
                        >
                            Vendor
                        </button>
                    </div>
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleEmailSignIn}
                    className="w-full py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Sign In with Google
                </button>
                <p className="mt-4 text-center">
                    {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
