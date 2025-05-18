import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import { BellIcon, SearchIcon, MoonIcon, SunIcon, XIcon, LogOut, UserIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Try-catch import for Clerk to handle both dev and production
let useUser, useClerk;
try {
  const clerkModule = require("@clerk/clerk-react");
  useUser = clerkModule.useUser;
  useClerk = clerkModule.useClerk;
} catch (error) {
  console.error("Error importing Clerk:", error);
  // Mock implementations if Clerk fails to load
  useUser = () => ({ user: null, isLoaded: true });
  useClerk = () => ({ signOut: async () => {} });
}

// Sample search data (in a real app, this would come from your global state or API)
const searchableContent = [
  { id: 1, title: "10 Ways to Improve Your Website's SEO in 2023", type: "Blog Post", path: "/" },
  { id: 2, title: "Content Marketing Guide", type: "Guide", path: "/" },
  { id: 3, title: "Social Media Tips for Small Businesses", type: "Blog Post", path: "/" },
  { id: 4, title: "E-commerce SEO Best Practices", type: "Guide", path: "/" },
  { id: 5, title: "Voice Search Optimization", type: "Tutorial", path: "/" },
  { id: 6, title: "Keyword Research Techniques", type: "Article", path: "/keywords" },
  { id: 7, title: "Content Calendar Planning", type: "Tutorial", path: "/calendar" },
  { id: 8, title: "AI Content Creation Tools", type: "Review", path: "/" },
  { id: 9, title: "Google Analytics Setup Guide", type: "Tutorial", path: "/analytics" },
  { id: 10, title: "User Engagement Metrics", type: "Dashboard", path: "/analytics" },
];

// Dashboard Layout Component
const Dashboard = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check authentication once on mount
  useEffect(() => {
    if (authChecked) return; // Skip if already checked

    // If using dev mode, check if authenticated
    const isDevMode = !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                     import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === "";
    
    // In dev mode, check if we have the acknowledgment flag
    if (isDevMode && sessionStorage.getItem('devModeAcknowledged') !== 'true') {
      navigate('/sign-in', { replace: true });
    }
    
    setAuthChecked(true);
    // In real Clerk mode, auth is handled by the ProtectedRoute component
  }, [navigate, authChecked]);
  
  // Get mock user from session storage if in development mode
  const getDevModeUser = () => {
    const userJson = sessionStorage.getItem('devModeUser');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        return null;
      }
    }
    return null;
  };
  
  // Mock user for development mode
  const mockUser = getDevModeUser() || {
    fullName: "Demo User",
    firstName: "Demo",
    emailAddresses: [{ emailAddress: "demo@example.com" }],
    imageUrl: null
  };
  
  const [isUsingMockUser, setIsUsingMockUser] = useState(false);
  const { user } = useUser ? useUser() : { user: null };
  const { signOut } = useClerk ? useClerk() : { signOut: async () => {} };
  
  // If Clerk didn't load a user after 1 second, fall back to mock user
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        setIsUsingMockUser(true);
        console.log("Using mock user due to no Clerk user detected");
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user]);
  
  // User to display in UI - either real Clerk user or mock
  const displayUser = user || (isUsingMockUser ? mockUser : null);
  
  // Click outside to close search results
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      // Filter content based on search query
      const filteredResults = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      
      setSearchResults(filteredResults);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleSignOut = async () => {
    try {
      // If using real user, use clerk signOut
      if (user && signOut) {
        await signOut();
      } else {
        // In dev mode, clear the session storage
        sessionStorage.removeItem('devModeAcknowledged');
        sessionStorage.removeItem('devModeUser');
      }
      // Redirect to sign-in regardless of mode
      navigate('/sign-in');
    } catch (error) {
      console.error("Error signing out:", error);
      navigate('/sign-in');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 shadow-sm">
          <MobileSidebar />
          
          {/* Search */}
          <div ref={searchRef} className="relative hidden md:block flex-1 max-w-md">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search content, keywords, pages..." 
              className="pl-8 pr-8 rounded-lg bg-background/60 backdrop-blur-sm border-muted" 
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.trim() !== "" && setShowSearchResults(true)}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <ul className="py-1">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-muted/50 flex items-start"
                          onClick={() => handleSearchResultClick(result.path)}
                        >
                          <div>
                            <p className="font-medium text-sm">{result.title}</p>
                            <p className="text-xs text-muted-foreground">{result.type}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-amber-300" />
              ) : (
                <MoonIcon className="h-5 w-5 text-slate-600" />
              )}
            </Button>
            
            {/* Notification Button */}
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            
            {/* User Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-9 w-9">
                  <Avatar className="h-9 w-9 ring-2 ring-background">
                    {displayUser?.imageUrl ? (
                      <AvatarImage src={displayUser.imageUrl} alt={displayUser?.fullName || "User"} />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {displayUser?.firstName?.charAt(0) || displayUser?.emailAddresses?.[0]?.emailAddress?.charAt(0)?.toUpperCase() || "D"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{displayUser?.fullName || displayUser?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{displayUser?.emailAddresses?.[0]?.emailAddress || displayUser?.email || ""}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-6">
          {/* Main content wrapper with glass effect */}
          <div className="rounded-xl backdrop-blur-[2px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 