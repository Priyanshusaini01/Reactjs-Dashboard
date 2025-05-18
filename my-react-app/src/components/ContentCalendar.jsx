import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Helper function to get days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper to get day of the week (0-6, where 0 is Sunday)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Helper to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Sample content data
const contentData = [
  {
    id: "CS-001",
    title: "10 SEO Strategies for 2023",
    type: "Blog Post",
    status: "Published",
    scheduledDate: "2023-06-01",
    author: "AI Writer",
    category: "SEO"
  },
  {
    id: "CS-002",
    title: "Content Marketing Guide",
    type: "Guide",
    status: "Scheduled",
    scheduledDate: "2023-06-15",
    author: "AI Writer",
    category: "Content"
  },
  {
    id: "CS-003",
    title: "Social Media Tips for Small Businesses",
    type: "Blog Post",
    status: "Draft",
    scheduledDate: "2023-06-18",
    author: "AI Writer",
    category: "Social Media"
  },
  {
    id: "CS-004",
    title: "E-commerce SEO Best Practices",
    type: "Case Study",
    status: "Scheduled",
    scheduledDate: "2023-06-22",
    author: "AI Writer",
    category: "E-commerce"
  },
  {
    id: "CS-005",
    title: "Voice Search Optimization Guide",
    type: "Guide",
    status: "Draft",
    scheduledDate: "2023-06-25",
    author: "AI Writer",
    category: "SEO"
  },
  {
    id: "CS-006",
    title: "Email Marketing Campaign Tips",
    type: "Blog Post",
    status: "Scheduled",
    scheduledDate: "2023-06-28",
    author: "AI Writer",
    category: "Email"
  },
  {
    id: "CS-007",
    title: "Video Marketing for Beginners",
    type: "Tutorial",
    status: "Scheduled",
    scheduledDate: "2023-07-02",
    author: "AI Writer",
    category: "Video"
  },
  {
    id: "CS-008",
    title: "Content Distribution Strategies",
    type: "Blog Post",
    status: "Draft",
    scheduledDate: "2023-07-05",
    author: "AI Writer",
    category: "Content"
  },
  {
    id: "CS-009",
    title: "Instagram Marketing Guide",
    type: "Guide",
    status: "Scheduled",
    scheduledDate: "2023-07-10",
    author: "AI Writer",
    category: "Social Media"
  },
  {
    id: "CS-010",
    title: "Keyword Research Techniques",
    type: "Tutorial",
    status: "Draft",
    scheduledDate: "2023-07-15",
    author: "AI Writer",
    category: "SEO"
  },
  {
    id: "CS-011",
    title: "AI in Content Creation",
    type: "Blog Post",
    status: "Scheduled",
    scheduledDate: "2023-07-18",
    author: "AI Writer",
    category: "AI"
  },
  {
    id: "CS-012",
    title: "Content Repurposing Strategies",
    type: "Guide",
    status: "Draft",
    scheduledDate: "2023-07-22",
    author: "AI Writer",
    category: "Content"
  }
];

// Content ideas
const contentIdeas = [
  {
    id: "ID-001",
    title: "AI Tools for Content Writers",
    type: "Blog Post",
    status: "Idea",
    category: "AI"
  },
  {
    id: "ID-002",
    title: "Local SEO for Small Businesses",
    type: "Guide",
    status: "Idea",
    category: "SEO"
  },
  {
    id: "ID-003",
    title: "Social Media Trends for 2024",
    type: "Blog Post",
    status: "Idea",
    category: "Social Media"
  },
  {
    id: "ID-004",
    title: "Mobile-First Indexing Guide",
    type: "Tutorial",
    status: "Idea",
    category: "SEO"
  },
  {
    id: "ID-005",
    title: "Content Marketing ROI Measurement",
    type: "Case Study",
    status: "Idea",
    category: "Content"
  }
];

// Content themes for different months
const contentThemes = [
  {
    month: "January",
    theme: "New Year Goal Setting",
    focus: "Planning & Strategy"
  },
  {
    month: "February",
    theme: "Customer Engagement",
    focus: "Relationship Building"
  },
  {
    month: "March",
    theme: "Tech Innovations",
    focus: "Industry Trends"
  },
  {
    month: "April",
    theme: "Sustainable Practices",
    focus: "Corporate Responsibility"
  },
  {
    month: "May",
    theme: "Analytics & Insights",
    focus: "Data-Driven Decisions"
  },
  {
    month: "June",
    theme: "Social Media Strategy",
    focus: "Community Building"
  },
  {
    month: "July",
    theme: "Mid-Year Review",
    focus: "Performance Optimization"
  },
  {
    month: "August",
    theme: "Mobile Experience",
    focus: "User Experience"
  },
  {
    month: "September",
    theme: "Back to Business",
    focus: "Efficiency & Productivity"
  },
  {
    month: "October",
    theme: "Customer Journey",
    focus: "User Experience"
  },
  {
    month: "November",
    theme: "Holiday Preparation",
    focus: "Seasonal Marketing"
  },
  {
    month: "December",
    theme: "Year-End Reflection",
    focus: "Growth & Planning"
  }
];

const ContentCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeTab, setActiveTab] = useState("calendar");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "Blog Post",
    category: "Content",
    scheduledDate: formatDate(today),
    status: "Draft"
  });
  const [editingContent, setEditingContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  // Get content for a specific date
  const getContentForDate = (dateStr) => {
    return contentData.filter(item => item.scheduledDate === dateStr);
  };

  // Navigation for months
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Generate calendar data
  const generateCalendarData = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const calendarData = [];
    
    // Calculate preceding days from previous month
    let prevMonthDays = 0;
    if (firstDayOfMonth > 0) {
      prevMonthDays = firstDayOfMonth;
    }

    // Fill calendar with days
    let day = 1;
    for (let i = 0; i < 6; i++) { // 6 weeks max in a month view
      const week = [];
      for (let j = 0; j < 7; j++) { // 7 days in a week
        if ((i === 0 && j < firstDayOfMonth) || day > daysInMonth) {
          // Empty cell for days outside current month
          week.push(null);
        } else {
          // Format the date as YYYY-MM-DD
          const date = new Date(currentYear, currentMonth, day);
          const dateStr = formatDate(date);
          const content = getContentForDate(dateStr);
          
          week.push({
            day,
            date: dateStr,
            content
          });
          
          day++;
        }
      }
      calendarData.push(week);
      
      // Break if we've handled all days in the month
      if (day > daysInMonth) {
        break;
      }
    }
    
    return calendarData;
  };

  const calendarData = generateCalendarData();

  // Current month theme
  const currentMonthTheme = contentThemes[currentMonth];

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Idea": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Filter function for list view
  const filterContent = () => {
    let filtered = contentData;
    
    // Text search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    return filtered;
  };

  const filteredContent = filterContent();

  // Get unique categories
  const categories = [...new Set(contentData.map(item => item.category))];

  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Handle form submit for new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    // In a real app, you would add this to your database
    console.log("New content to schedule:", newEvent);
    // Reset form
    setNewEvent({
      title: "",
      type: "Blog Post",
      category: "Content",
      scheduledDate: formatDate(today),
      status: "Draft"
    });
    setShowAddEventForm(false);
  };
  
  // Handle clicking on a content item in the calendar
  const handleContentClick = (content) => {
    setEditingContent({...content});
    setEditMode(true);
  };
  
  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would update your database
    console.log("Updated content:", editingContent);
    // Clear editing state
    setEditingContent(null);
    setEditMode(false);
  };
  
  // Handle edit cancellation
  const handleEditCancel = () => {
    setEditingContent(null);
    setEditMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Page header with action buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Content Calendar</h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            className="bg-primary"
            onClick={() => setShowAddEventForm(!showAddEventForm)}
            disabled={editMode}
          >
            {showAddEventForm ? "Cancel" : "Schedule Content"}
          </Button>
          <Button variant="outline" disabled={editMode}>Import Schedule</Button>
          <Button variant="outline" disabled={editMode}>Export Calendar</Button>
        </div>
      </div>

      {/* Add Content Schedule Form */}
      {showAddEventForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Content</CardTitle>
            <CardDescription>Enter details for the new content you want to schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Content Title</label>
                <Input 
                  placeholder="Enter content title" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Content Type</label>
                  <Select 
                    value={newEvent.type} 
                    onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog Post">Blog Post</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Case Study">Case Study</SelectItem>
                      <SelectItem value="Infographic">Infographic</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Podcast">Podcast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={newEvent.category} 
                    onValueChange={(value) => setNewEvent({...newEvent, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Scheduled Date</label>
                  <Input 
                    type="date" 
                    value={newEvent.scheduledDate}
                    onChange={(e) => setNewEvent({...newEvent, scheduledDate: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={newEvent.status} 
                    onValueChange={(value) => setNewEvent({...newEvent, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="submit">Schedule Content</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {/* Edit Content Form */}
      {editMode && editingContent && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Edit Content</CardTitle>
            <CardDescription>Update details for this content item</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Content Title</label>
                <Input 
                  placeholder="Enter content title" 
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Content Type</label>
                  <Select 
                    value={editingContent.type} 
                    onValueChange={(value) => setEditingContent({...editingContent, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog Post">Blog Post</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Case Study">Case Study</SelectItem>
                      <SelectItem value="Infographic">Infographic</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Podcast">Podcast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={editingContent.category} 
                    onValueChange={(value) => setEditingContent({...editingContent, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Scheduled Date</label>
                  <Input 
                    type="date" 
                    value={editingContent.scheduledDate}
                    onChange={(e) => setEditingContent({...editingContent, scheduledDate: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={editingContent.status} 
                    onValueChange={(value) => setEditingContent({...editingContent, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleEditCancel}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Monthly Theme Card */}
      <Card className="bg-gradient-to-r from-indigo-100 to-blue-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Monthly Theme: {currentMonthTheme.theme}</h3>
              <p className="text-sm text-muted-foreground">Focus: {currentMonthTheme.focus}</p>
            </div>
            <Badge className="bg-indigo-200 text-indigo-800 text-sm px-3 py-1">
              {monthNames[currentMonth]} {currentYear}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Content Calendar Tabs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Content Schedule</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={prevMonth} disabled={editMode}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </Button>
              <span className="text-sm font-medium">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <Button variant="outline" size="sm" onClick={nextMonth} disabled={editMode}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Button>
            </div>
          </div>
          <CardDescription>Plan and schedule your content publishing strategy</CardDescription>
          
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={editMode}
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter} disabled={editMode}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Idea">Idea</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={editMode}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar" disabled={editMode}>Calendar View</TabsTrigger>
              <TabsTrigger value="list" disabled={editMode}>List View</TabsTrigger>
              <TabsTrigger value="ideas" disabled={editMode}>Content Ideas</TabsTrigger>
            </TabsList>

            {/* Calendar View Tab */}
            <TabsContent value="calendar">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                        <th key={i} className="p-2 border bg-muted font-medium text-center">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calendarData.map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week.map((dayData, dayIndex) => (
                          <td key={dayIndex} className={`border p-2 min-h-[100px] align-top ${
                            dayData && dayData.date === formatDate(today) ? 'bg-blue-50' : ''
                          }`}>
                            {dayData && (
                              <>
                                <div className="text-sm font-medium mb-1">
                                  {dayData.day}
                                </div>
                                <div className="space-y-1">
                                  {dayData.content.map((item, idx) => (
                                    <div 
                                      key={idx} 
                                      className={`text-xs p-1.5 rounded-sm truncate cursor-pointer hover:scale-105 transition-transform ${
                                        item.status === 'Published' ? 'bg-green-100 hover:bg-green-200' :
                                        item.status === 'Scheduled' ? 'bg-blue-100 hover:bg-blue-200' :
                                        'bg-yellow-100 hover:bg-yellow-200'
                                      }`}
                                      title={`Click to edit: ${item.title}`}
                                      onClick={() => handleContentClick(item)}
                                    >
                                      {item.title.length > 20 ? 
                                        item.title.substring(0, 20) + '...' : 
                                        item.title
                                      }
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* List View Tab */}
            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of your scheduled content.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">{content.title}</TableCell>
                        <TableCell>{content.type}</TableCell>
                        <TableCell>{content.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(content.status)}>
                            {content.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{content.scheduledDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleContentClick(content)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Content Ideas Tab */}
            <TabsContent value="ideas">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>Content ideas for future planning.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[350px]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contentIdeas.map((idea) => (
                      <TableRow key={idea.id}>
                        <TableCell className="font-medium">{idea.title}</TableCell>
                        <TableCell>{idea.type}</TableCell>
                        <TableCell>{idea.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(idea.status)}>
                            {idea.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Convert to Content</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button>Add New Content Idea</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              {activeTab === "list" && 
                `Showing ${filteredContent.length} of ${contentData.length} content items`
              }
              {activeTab === "ideas" && 
                `${contentIdeas.length} content ideas available for planning`
              }
              {activeTab === "calendar" && 
                `${monthNames[currentMonth]} ${currentYear} - ${contentData.filter(
                  item => {
                    const date = new Date(item.scheduledDate);
                    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                  }
                ).length} content items scheduled`
              }
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled={editMode}>Previous</Button>
              <Button variant="outline" size="sm" disabled={editMode}>Next</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentCalendar; 