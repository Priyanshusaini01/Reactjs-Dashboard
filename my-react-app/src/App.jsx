import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Dashboard from "@/layouts/Dashboard";
import AnalyticsPage from "@/components/AnalyticsPage";
import UsersPage from "@/components/UsersPage";
import ContentDashboard from "@/components/ContentDashboard";
import ContentLibrary from "@/components/ContentLibrary";
import KeywordManager from "@/components/KeywordManager";
import ContentCalendar from "@/components/ContentCalendar";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import "./App.css";
import { useState, useEffect } from "react";

// Your Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

// Simple content component generator for placeholder pages
const SimpleContent = ({ title, description }) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

// Modified Protected Route that handles both development and production modes
const ProtectedRoute = ({ children }) => {
  // Check if we're in development mode
  const isDevelopmentMode = !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                           import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === "";
                           
  // If in development mode and authenticated with our dev login, render the children
  if (isDevelopmentMode && sessionStorage.getItem('devModeAcknowledged') === 'true') {
    return children;
  }
  
  // Otherwise use Clerk's auth
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  // Error state for Clerk initialization
  const [clerkError, setClerkError] = useState(false);
  
  // Error handler for Clerk
  const handleClerkError = (err) => {
    console.error("Clerk error:", err);
    setClerkError(true);
    // Automatically bypass auth if Clerk fails to initialize
    sessionStorage.setItem('devModeAcknowledged', 'true');
  };

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      onError={handleClerkError}
    >
      <BrowserRouter>
        <Routes>
          {/* Public auth routes */}
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard>
                <ContentDashboard />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/content" element={
            <ProtectedRoute>
              <Dashboard>
                <ContentLibrary />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/ai-generator" element={
            <ProtectedRoute>
              <Dashboard>
                <SimpleContent 
                  title="AI Content Generator" 
                  description="Create high-quality, SEO-optimized content with advanced AI technology." 
                />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/keywords" element={
            <ProtectedRoute>
              <Dashboard>
                <KeywordManager />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/media" element={
            <ProtectedRoute>
              <Dashboard>
                <SimpleContent 
                  title="Media Library" 
                  description="Manage all your images, videos, and other media assets." 
                />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Dashboard>
                <AnalyticsPage />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/gsc-import" element={
            <ProtectedRoute>
              <Dashboard>
                <SimpleContent 
                  title="Google Search Console Import" 
                  description="Import and analyze keyword data directly from Google Search Console." 
                />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Dashboard>
                <ContentCalendar />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <Dashboard>
                <UsersPage />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Dashboard>
                <SimpleContent 
                  title="Settings" 
                  description="Configure your account settings and preferences." 
                />
              </Dashboard>
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <Dashboard>
                <SimpleContent 
                  title="Help Center" 
                  description="Find answers to frequently asked questions and get support." 
                />
              </Dashboard>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
