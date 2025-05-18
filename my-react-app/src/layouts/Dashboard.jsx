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

// Default user for the dashboard
const defaultUser = {
  fullName: "Demo User",
  firstName: "Demo",
  email: "demo@example.com",
  emailAddresses: [{ emailAddress: "demo@example.com" }],
  imageUrl: null
};

// Dashboard Layout Component
const Dashboard = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [user] = useState(defaultUser);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
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

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar for desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full z-40">
        <Sidebar />
      </div>
      
      {/* Main Content - with padding to account for fixed sidebar */}
      <div className="flex-1 md:ml-64">
        {/* Fixed Header/Navbar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-6 shadow-sm">
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
          
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden sm:flex">
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></span>
            </Button>
            
            {/* User Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2 rounded-full pr-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                    <AvatarFallback>
                      {user?.firstName ? user.firstName.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block mr-2">
                    {user?.fullName || user?.email?.split('@')[0] || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {user.emailAddresses && user.emailAddresses[0]?.emailAddress}
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content - with padding to account for fixed header */}
        <main className="pt-20 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 