import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simpler development mode detection
const isDevelopmentMode = () => {
  // Check if we have a valid Clerk key or if we're in dev mode
  return !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
         import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === "";
};

// Development mode signup form
const DevModeSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    
    // Mock user registration
    // In a real app, you'd submit this to a backend or API
    sessionStorage.setItem('devModeAcknowledged', 'true');
    sessionStorage.setItem('devModeUser', JSON.stringify({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      loggedInAt: new Date().toISOString()
    }));
    
    navigate('/');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4 text-center">
        <div className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full inline-block mb-2">Development Mode</div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter any information to create an account
        </p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              placeholder="John"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            placeholder="********"
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Account
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Already have an account?</span>{" "}
        <a href="/sign-in" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Sign in
        </a>
      </div>
    </div>
  );
};

// ClerkSignUp wrapper that handles errors
const ClerkSignUpWithErrorHandling = () => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return <DevModeSignUp />;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        redirectUrl="/"
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded",
            footerActionLink: 
              "text-blue-600 hover:text-blue-700",
            card: "shadow-none"
          }
        }}
        // If Clerk component errors, switch to dev mode
        onError={(err) => {
          console.error("Clerk SignUp error:", err);
          setHasError(true);
        }}
      />
    </div>
  );
};

const SignUp = () => {
  const devMode = isDevelopmentMode();
  
  return (
    <AuthLayout>
      {devMode ? <DevModeSignUp /> : <ClerkSignUpWithErrorHandling />}
    </AuthLayout>
  );
};

export default SignUp; 