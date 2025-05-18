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
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Dummy data for keywords
const keywordsData = [
  {
    id: "KW-001",
    keyword: "content marketing strategy",
    category: "Marketing",
    difficulty: 42,
    volume: 5400,
    position: 8,
    status: "Tracking",
    trend: "up",
    cpc: 3.24
  },
  {
    id: "KW-002",
    keyword: "seo best practices 2023",
    category: "SEO",
    difficulty: 56,
    volume: 8200,
    position: 3,
    status: "Ranking",
    trend: "up",
    cpc: 4.15
  },
  {
    id: "KW-003",
    keyword: "social media marketing tips",
    category: "Social Media",
    difficulty: 35,
    volume: 12500,
    position: 0,
    status: "Research",
    trend: "neutral",
    cpc: 2.87
  },
  {
    id: "KW-004",
    keyword: "email marketing automation",
    category: "Email",
    difficulty: 48,
    volume: 6700,
    position: 5,
    status: "Ranking",
    trend: "up",
    cpc: 3.65
  },
  {
    id: "KW-005",
    keyword: "artificial intelligence content creation",
    category: "AI",
    difficulty: 62,
    volume: 3200,
    position: 12,
    status: "Tracking",
    trend: "down",
    cpc: 5.78
  },
  {
    id: "KW-006",
    keyword: "video marketing trends",
    category: "Video",
    difficulty: 41,
    volume: 7300,
    position: 0,
    status: "Research",
    trend: "neutral",
    cpc: 3.12
  },
  {
    id: "KW-007",
    keyword: "content optimization tips",
    category: "SEO",
    difficulty: 38,
    volume: 4900,
    position: 7,
    status: "Tracking",
    trend: "up",
    cpc: 2.95
  },
  {
    id: "KW-008",
    keyword: "ecommerce seo strategy",
    category: "E-commerce",
    difficulty: 53,
    volume: 6200,
    position: 4,
    status: "Ranking",
    trend: "up",
    cpc: 4.45
  },
  {
    id: "KW-009",
    keyword: "blog post writing guide",
    category: "Content",
    difficulty: 32,
    volume: 5800,
    position: 6,
    status: "Ranking",
    trend: "down",
    cpc: 2.78
  },
  {
    id: "KW-010",
    keyword: "local seo optimization",
    category: "SEO",
    difficulty: 45,
    volume: 4300,
    position: 9,
    status: "Tracking",
    trend: "neutral",
    cpc: 3.85
  },
  {
    id: "KW-011",
    keyword: "voice search optimization",
    category: "SEO",
    difficulty: 61,
    volume: 2900,
    position: 15,
    status: "Tracking",
    trend: "up",
    cpc: 4.25
  },
  {
    id: "KW-012",
    keyword: "content marketing roi",
    category: "Marketing",
    difficulty: 49,
    volume: 3800,
    position: 8,
    status: "Tracking",
    trend: "up",
    cpc: 5.12
  },
  {
    id: "KW-013",
    keyword: "instagram marketing strategy",
    category: "Social Media",
    difficulty: 39,
    volume: 9200,
    position: 2,
    status: "Ranking",
    trend: "up",
    cpc: 3.54
  },
  {
    id: "KW-014",
    keyword: "mobile seo optimization",
    category: "SEO",
    difficulty: 47,
    volume: 5100,
    position: 11,
    status: "Tracking",
    trend: "down",
    cpc: 3.95
  },
  {
    id: "KW-015",
    keyword: "content distribution channels",
    category: "Content",
    difficulty: 36,
    volume: 4200,
    position: 0,
    status: "Research",
    trend: "neutral",
    cpc: 2.68
  }
];

// Dummy data for keyword clusters
const keywordClustersData = [
  {
    id: "CL-001",
    name: "SEO Optimization",
    keywordCount: 8,
    avgDifficulty: 48,
    totalVolume: 28700,
    priority: "High"
  },
  {
    id: "CL-002",
    name: "Content Marketing",
    keywordCount: 6,
    avgDifficulty: 42,
    totalVolume: 19200,
    priority: "Medium"
  },
  {
    id: "CL-003",
    name: "Social Media Strategies",
    keywordCount: 5,
    avgDifficulty: 37,
    totalVolume: 23500,
    priority: "High"
  },
  {
    id: "CL-004",
    name: "E-commerce Marketing",
    keywordCount: 4,
    avgDifficulty: 51,
    totalVolume: 15400,
    priority: "Medium"
  },
  {
    id: "CL-005",
    name: "AI Content Creation",
    keywordCount: 3,
    avgDifficulty: 59,
    totalVolume: 8300,
    priority: "Low"
  }
];

// Top performing keywords for the dashboard cards
const topKeywords = [
  { keyword: "content marketing strategy", position: 2, change: 3 },
  { keyword: "seo best practices 2023", position: 1, change: 0 },
  { keyword: "ecommerce seo strategy", position: 3, change: 2 },
  { keyword: "instagram marketing strategy", position: 2, change: 5 }
];

const KeywordManager = () => {
  const [activeTab, setActiveTab] = useState("all-keywords");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddKeywordForm, setShowAddKeywordForm] = useState(false);
  const [newKeyword, setNewKeyword] = useState({
    keyword: "",
    category: "SEO",
    status: "Research"
  });
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Ranking": return "bg-green-100 text-green-800";
      case "Tracking": return "bg-blue-100 text-blue-800";
      case "Research": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return (
        <span className="text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </span>
      );
      case "down": return (
        <span className="text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      );
      default: return (
        <span className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </span>
      );
    }
  };
  
  // Filter function
  const filterKeywords = () => {
    let filtered = keywordsData;
    
    // Text search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    return filtered;
  };
  
  const filteredKeywords = filterKeywords();

  // Get unique categories for filter
  const categories = [...new Set(keywordsData.map(item => item.category))];
  
  // Handle form submit for new keyword
  const handleAddKeyword = (e) => {
    e.preventDefault();
    // In a real app, you would add this to your database
    console.log("New keyword to add:", newKeyword);
    // Reset form
    setNewKeyword({
      keyword: "",
      category: "SEO",
      status: "Research"
    });
    setShowAddKeywordForm(false);
  };

  // Calculate keyword metrics
  const keywordMetrics = {
    total: keywordsData.length,
    ranking: keywordsData.filter(k => k.status === "Ranking").length,
    tracking: keywordsData.filter(k => k.status === "Tracking").length,
    research: keywordsData.filter(k => k.status === "Research").length,
  };
  
  return (
    <div className="space-y-6">
      {/* Page header with action buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Keyword Manager</h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            className="bg-primary"
            onClick={() => setShowAddKeywordForm(!showAddKeywordForm)}
          >
            {showAddKeywordForm ? "Cancel" : "Add Keyword"}
          </Button>
          <Button variant="outline">Import Keywords</Button>
          <Button variant="outline">Export Keywords</Button>
        </div>
      </div>

      {/* Add Keyword Form */}
      {showAddKeywordForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Keyword</CardTitle>
            <CardDescription>Enter details for the new keyword you want to track</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddKeyword} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Keyword</label>
                <Input 
                  placeholder="Enter keyword or phrase" 
                  value={newKeyword.keyword}
                  onChange={(e) => setNewKeyword({...newKeyword, keyword: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={newKeyword.category} 
                    onValueChange={(value) => setNewKeyword({...newKeyword, category: value})}
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
                
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={newKeyword.status} 
                    onValueChange={(value) => setNewKeyword({...newKeyword, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Tracking">Tracking</SelectItem>
                      <SelectItem value="Ranking">Ranking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="submit">Add Keyword</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Keyword Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Total Keywords</span>
              <span className="text-2xl font-bold">{keywordMetrics.total}</span>
              <div className="mt-2">
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Ranking Keywords</span>
              <span className="text-2xl font-bold">{keywordMetrics.ranking}</span>
              <div className="mt-2">
                <Progress value={(keywordMetrics.ranking / keywordMetrics.total) * 100} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Tracking Keywords</span>
              <span className="text-2xl font-bold">{keywordMetrics.tracking}</span>
              <div className="mt-2">
                <Progress value={(keywordMetrics.tracking / keywordMetrics.total) * 100} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Research Keywords</span>
              <span className="text-2xl font-bold">{keywordMetrics.research}</span>
              <div className="mt-2">
                <Progress value={(keywordMetrics.research / keywordMetrics.total) * 100} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Ranking Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Keywords</CardTitle>
          <CardDescription>Your keywords with the highest rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topKeywords.map((kw, index) => (
              <Card key={index} className="border-2 hover:border-primary cursor-pointer transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="text-2xl font-bold">#{kw.position}</div>
                    <div className={`flex items-center text-sm ${kw.change > 0 ? 'text-green-600' : kw.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {kw.change > 0 && '+'}
                      {kw.change}
                      {kw.change > 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      ) : kw.change < 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium truncate">{kw.keyword}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main content with tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Management</CardTitle>
          <CardDescription>Research, organize, and track keywords for your content strategy</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Ranking">Ranking</SelectItem>
                  <SelectItem value="Tracking">Tracking</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Keyword Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all-keywords">All Keywords</TabsTrigger>
              <TabsTrigger value="clusters">Keyword Clusters</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            </TabsList>

            {/* All Keywords Tab */}
            <TabsContent value="all-keywords">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of your keywords for SEO and content strategy.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Keyword</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>CPC ($)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeywords.map((keyword) => (
                      <TableRow key={keyword.id}>
                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                        <TableCell>{keyword.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(keyword.status)}>
                            {keyword.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{keyword.difficulty}</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  keyword.difficulty < 40 ? 'bg-green-500' : 
                                  keyword.difficulty < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${keyword.difficulty}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                        <TableCell>
                          {keyword.position > 0 ? keyword.position : "-"}
                        </TableCell>
                        <TableCell>{getTrendIcon(keyword.trend)}</TableCell>
                        <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
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
                              <DropdownMenuItem>Add to Cluster</DropdownMenuItem>
                              <DropdownMenuItem>Create Content</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Keyword Clusters Tab */}
            <TabsContent value="clusters">
              <div className="rounded-md border">
                <Table>
                  <TableCaption>Your keyword clusters for organizing related keywords.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Cluster Name</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Avg. Difficulty</TableHead>
                      <TableHead>Total Volume</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordClustersData.map((cluster) => (
                      <TableRow key={cluster.id}>
                        <TableCell className="font-medium">{cluster.name}</TableCell>
                        <TableCell>{cluster.keywordCount}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{cluster.avgDifficulty}</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  cluster.avgDifficulty < 40 ? 'bg-green-500' : 
                                  cluster.avgDifficulty < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${cluster.avgDifficulty}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{cluster.totalVolume.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadgeColor(cluster.priority)}>
                            {cluster.priority}
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
                              <DropdownMenuItem>View Keywords</DropdownMenuItem>
                              <DropdownMenuItem>Edit Cluster</DropdownMenuItem>
                              <DropdownMenuItem>Create Content Plan</DropdownMenuItem>
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
                <Button>Create New Cluster</Button>
              </div>
            </TabsContent>

            {/* Competitor Analysis Tab */}
            <TabsContent value="competitors">
              <div className="p-8 text-center">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Competitor Analysis</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Track your competitors' keywords and analyze their content strategy.
                  This feature will be available soon.
                </p>
                <Button variant="outline">Get Notified When Available</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredKeywords.length}</strong> of <strong>{keywordsData.length}</strong> keywords
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default KeywordManager; 