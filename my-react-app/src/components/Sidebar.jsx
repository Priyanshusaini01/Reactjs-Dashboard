import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Icons
export const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

export const ArticlesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

export const AIGeneratorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a5 5 0 0 0-5 5v14a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
    <path d="M9 12h6" />
    <path d="M11 12v6" />
    <path d="M13 12v6" />
    <path d="M9 6h6" />
  </svg>
);

export const KeywordsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21 11-8-8-9 9V3H2v18h18v-2h-9l9-9z" />
    <path d="M6 14a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
  </svg>
);

export const MediaLibraryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="m18 9-2 3-3-4-4 5-3-4" />
  </svg>
);

export const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const GSCImportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v12" />
    <path d="m8 11 4 4 4-4" />
    <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
  </svg>
);

export const SchedulerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export const HelpCenterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

export const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const mainNavItems = [
  { icon: <DashboardIcon />, label: "Dashboard", href: "/" },
  { icon: <ArticlesIcon />, label: "Content Library", href: "/content" },
  { icon: <AIGeneratorIcon />, label: "AI Generator", href: "/ai-generator" },
  { icon: <KeywordsIcon />, label: "Keywords", href: "/keywords" },
  { icon: <MediaLibraryIcon />, label: "Media Library", href: "/media" },
  { icon: <AnalyticsIcon />, label: "Content Analytics", href: "/analytics" },
];

const resourcesNavItems = [
  { icon: <GSCImportIcon />, label: "GSC Import", href: "/gsc-import" },
  { icon: <SchedulerIcon />, label: "Content Calendar", href: "/calendar" },
  { icon: <UsersIcon />, label: "Team", href: "/users" },
  { icon: <SettingsIcon />, label: "Settings", href: "/settings" },
  { icon: <HelpCenterIcon />, label: "Help Center", href: "/help" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen w-64 border-r bg-background">
      <div 
        className="flex h-16 items-center border-b px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => navigate("/")}
      >
        <h2 className="text-lg font-semibold">AI Content Manager</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)]">
        {/* Main Navigation */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-tight">
            Content Management
          </h2>
          <nav className="flex flex-col gap-2">
            {mainNavItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex w-full justify-start gap-2"
                asChild
              >
                <Link to={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        
        <Separator className="my-2" />
        
        {/* Resources */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-tight">
            Tools & Resources
          </h2>
          <nav className="flex flex-col gap-2">
            {resourcesNavItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex w-full justify-start gap-2"
                asChild
              >
                <Link to={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        
        <Separator className="my-2" />
        
        {/* Logout Button */}
        <div className="px-4 py-2">
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-2 text-muted-foreground"
            asChild
          >
            <Link to="/logout">
              <LogoutIcon />
              Logout
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar; 