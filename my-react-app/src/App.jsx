import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/layouts/Dashboard";
import AnalyticsPage from "@/components/AnalyticsPage";
import UsersPage from "@/components/UsersPage";
import ContentDashboard from "@/components/ContentDashboard";
import ContentLibrary from "@/components/ContentLibrary";
import KeywordManager from "@/components/KeywordManager";
import ContentCalendar from "@/components/ContentCalendar";
import "./App.css";

// Simple content component generator for placeholder pages
const SimpleContent = ({ title, description }) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard routes - no authentication needed */}
        <Route path="/" element={<Dashboard><ContentDashboard /></Dashboard>} />
        <Route path="/content" element={<Dashboard><ContentLibrary /></Dashboard>} />
        <Route path="/ai-generator" element={<Dashboard><SimpleContent title="AI Content Generator" description="Create high-quality, SEO-optimized content with advanced AI technology." /></Dashboard>} />
        <Route path="/keywords" element={<Dashboard><KeywordManager /></Dashboard>} />
        <Route path="/media" element={<Dashboard><SimpleContent title="Media Library" description="Manage all your images, videos, and other media assets." /></Dashboard>} />
        <Route path="/analytics" element={<Dashboard><AnalyticsPage /></Dashboard>} />
        <Route path="/gsc-import" element={<Dashboard><SimpleContent title="Google Search Console Import" description="Import and analyze keyword data directly from Google Search Console." /></Dashboard>} />
        <Route path="/calendar" element={<Dashboard><ContentCalendar /></Dashboard>} />
        <Route path="/users" element={<Dashboard><UsersPage /></Dashboard>} />
        <Route path="/settings" element={<Dashboard><SimpleContent title="Settings" description="Configure your account settings and preferences." /></Dashboard>} />
        <Route path="/help" element={<Dashboard><SimpleContent title="Help Center" description="Find answers to frequently asked questions and get support." /></Dashboard>} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
