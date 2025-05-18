import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simpler development mode detection
const isDevelopmentMode = () => {
  // Check if we have a valid Clerk key or if we're in dev mode
  return !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
         import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === "";
};

// Development mode login form
const DevModeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    
    // Mock authentication - in a real app, you'd validate against a backend
    // For dev mode, we're just checking for any non-empty values
    if (email && password) {
      // Store authentication state
      sessionStorage.setItem('devModeAcknowledged', 'true');
      sessionStorage.setItem('devModeUser', JSON.stringify({
        email,
        name: email.split('@')[0],
        loggedInAt: new Date().toISOString()
      }));
      
      navigate('/');
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4 text-center">
        <div className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full inline-block mb-2">Development Mode</div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter any credentials to login
        </p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Forgot password?
            </a>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sign In
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Don't have an account?</span>{" "}
        <a href="/sign-up" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Sign up
        </a>
      </div>
    </div>
  );
};

// ClerkSignIn wrapper that handles errors
const ClerkSignInWithErrorHandling = () => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return <DevModeLogin />;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <ClerkSignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
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
          console.error("Clerk SignIn error:", err);
          setHasError(true);
        }}
      />
    </div>
  );
};

const SignIn = () => {
  const devMode = isDevelopmentMode();
  
  return (
    <AuthLayout>
      {devMode ? <DevModeLogin /> : <ClerkSignInWithErrorHandling />}
    </AuthLayout>
  );
};

export default SignIn; 