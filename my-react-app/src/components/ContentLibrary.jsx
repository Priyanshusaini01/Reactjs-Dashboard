import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy data for articles
const articlesData = [
  {
    id: "ART-001",
    title: "10 Ways to Improve Your Website's SEO in 2023",
    type: "Blog Post",
    status: "Published",
    date: "2023-06-12",
    views: 1254,
    keywords: ["SEO", "Website Optimization", "Digital Marketing"],
    author: "AI Writer"
  },
  {
    id: "ART-002",
    title: "The Ultimate Guide to Content Marketing Strategy",
    type: "Guide",
    status: "Draft",
    date: "2023-06-10",
    views: 0,
    keywords: ["Content Marketing", "Strategy", "Lead Generation"],
    author: "AI Writer"
  },
  {
    id: "ART-003",
    title: "How to Use Social Media to Drive Traffic to Your Blog",
    type: "Blog Post",
    status: "Scheduled",
    date: "2023-06-15",
    views: 0,
    keywords: ["Social Media", "Blog Traffic", "Content Promotion"],
    author: "AI Writer"
  },
  {
    id: "ART-004",
    title: "E-commerce SEO: Best Practices for Product Pages",
    type: "Case Study",
    status: "Published",
    date: "2023-06-08",
    views: 876,
    keywords: ["E-commerce", "SEO", "Product Pages"],
    author: "AI Writer"
  },
  {
    id: "ART-005",
    title: "Understanding Google's Latest Algorithm Update",
    type: "Blog Post",
    status: "Published",
    date: "2023-06-05",
    views: 2145,
    keywords: ["Google Algorithm", "SEO Updates", "Search Rankings"],
    author: "AI Writer"
  },
  {
    id: "ART-006",
    title: "Content Optimization for Voice Search: A Complete Guide",
    type: "Guide",
    status: "Published",
    date: "2023-06-03",
    views: 954,
    keywords: ["Voice Search", "SEO", "Content Optimization"],
    author: "AI Writer"
  },
  {
    id: "ART-007",
    title: "How to Create a Successful YouTube Channel for Your Business",
    type: "Tutorial",
    status: "Draft",
    date: "2023-06-09",
    views: 0,
    keywords: ["YouTube", "Video Marketing", "Business Growth"],
    author: "AI Writer"
  },
  {
    id: "ART-008",
    title: "The Benefits of Long-Form Content for SEO",
    type: "Blog Post",
    status: "Published",
    date: "2023-06-01",
    views: 1632,
    keywords: ["Long-Form Content", "SEO", "Content Strategy"],
    author: "AI Writer"
  },
  {
    id: "ART-009",
    title: "How to Build Backlinks That Actually Boost Your Rankings",
    type: "Guide",
    status: "Scheduled",
    date: "2023-06-18",
    views: 0,
    keywords: ["Backlinks", "SEO", "Link Building"],
    author: "AI Writer"
  },
  {
    id: "ART-010",
    title: "Mobile-First Indexing: What You Need to Know",
    type: "Blog Post",
    status: "Published",
    date: "2023-05-28",
    views: 2478,
    keywords: ["Mobile-First Indexing", "SEO", "Mobile Optimization"],
    author: "AI Writer"
  }
];

// Dummy data for pages
const pagesData = [
  {
    id: "PG-001",
    title: "About Us",
    type: "About Page",
    status: "Published",
    date: "2023-01-15",
    views: 3524,
    author: "AI Writer"
  },
  {
    id: "PG-002",
    title: "Services",
    type: "Service Page",
    status: "Published",
    date: "2023-01-15",
    views: 2876,
    author: "AI Writer"
  },
  {
    id: "PG-003",
    title: "Contact Us",
    type: "Contact Page",
    status: "Published",
    date: "2023-01-15",
    views: 1987,
    author: "AI Writer"
  },
  {
    id: "PG-004",
    title: "Privacy Policy",
    type: "Legal Page",
    status: "Published",
    date: "2023-01-15",
    views: 543,
    author: "AI Writer"
  },
  {
    id: "PG-005",
    title: "Terms of Service",
    type: "Legal Page",
    status: "Published",
    date: "2023-01-15",
    views: 412,
    author: "AI Writer"
  }
];

// Dummy data for landing pages
const landingPagesData = [
  {
    id: "LP-001",
    title: "Summer Sale 2023",
    type: "Promotional",
    status: "Published",
    date: "2023-05-20",
    views: 4567,
    conversions: 123,
    author: "AI Writer"
  },
  {
    id: "LP-002",
    title: "Free SEO Audit",
    type: "Lead Generation",
    status: "Published",
    date: "2023-04-10",
    views: 2845,
    conversions: 87,
    author: "AI Writer"
  },
  {
    id: "LP-003",
    title: "Product Launch: Pro Analytics Suite",
    type: "Product Launch",
    status: "Draft",
    date: "2023-06-09",
    views: 0,
    conversions: 0,
    author: "AI Writer"
  },
  {
    id: "LP-004",
    title: "Marketing Webinar Registration",
    type: "Event",
    status: "Scheduled",
    date: "2023-06-20",
    views: 0,
    conversions: 0,
    author: "AI Writer"
  }
];

const ContentLibrary = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Filter function
  const filterData = (data) => {
    let filtered = data;
    
    // Text search filter
    if (searchTerm) {
      filtered = filtered.filter(item => {
        return Object.values(item).some(
          value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(item => item.type === typeFilter);
    }
    
    return filtered;
  };
  
  const filteredArticles = filterData(articlesData);
  const filteredPages = filterData(pagesData);
  const filteredLandingPages = filterData(landingPagesData);

  // Get unique content types for filter
  const getContentTypes = (data) => {
    const types = new Set(data.map(item => item.type));
    return Array.from(types);
  };

  const articleTypes = getContentTypes(articlesData);
  const pageTypes = getContentTypes(pagesData);
  const landingPageTypes = getContentTypes(landingPagesData);
  
  return (
    <div className="space-y-6">
      {/* Page header with action buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Content Library</h1>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-primary">Create New Content</Button>
          <Button variant="outline">Import Content</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Browse, search, and manage all your AI-generated content in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {activeTab === "articles" && articleTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                  {activeTab === "pages" && pageTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                  {activeTab === "landing-pages" && landingPageTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">Articles & Blog Posts</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="landing-pages">Landing Pages</TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of your articles and blog posts.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[350px]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(article.status)}>
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell>{article.views.toLocaleString()}</TableCell>
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
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

            {/* Pages Tab */}
            <TabsContent value="pages">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of your website pages.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[350px]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>{page.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(page.status)}>
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{page.date}</TableCell>
                        <TableCell>{page.views.toLocaleString()}</TableCell>
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
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

            {/* Landing Pages Tab */}
            <TabsContent value="landing-pages">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of your landing pages.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[350px]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLandingPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>{page.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(page.status)}>
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{page.date}</TableCell>
                        <TableCell>{page.views.toLocaleString()}</TableCell>
                        <TableCell>{page.conversions.toLocaleString()}</TableCell>
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
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentLibrary; 