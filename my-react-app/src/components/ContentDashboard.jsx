import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, LineChartIcon, FileTextIcon, SearchIcon, PlusIcon, BarChartIcon, TrendingUpIcon, BookOpenIcon, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContentDashboard = () => {
  const [showCreateContentForm, setShowCreateContentForm] = useState(false);
  const [newContent, setNewContent] = useState({
    title: "",
    type: "Blog Post",
    category: "SEO",
    keywords: "",
    description: ""
  });
  const navigate = useNavigate();
  
  const handleCreateContent = (e) => {
    e.preventDefault();
    console.log("Creating new content:", newContent);
    // Reset form and hide it
    setNewContent({
      title: "",
      type: "Blog Post",
      category: "SEO",
      keywords: "",
      description: ""
    });
    setShowCreateContentForm(false);
  };

  // Content metrics
  const contentMetrics = [
    { 
      name: "Published Articles", 
      value: "68", 
      change: "+12", 
      trend: "up", 
      description: "this month",
      icon: <FileTextIcon className="h-4 w-4 text-primary" />
    },
    { 
      name: "Word Count", 
      value: "142,580", 
      change: "+18.4%", 
      trend: "up", 
      description: "vs. previous month",
      icon: <BookOpenIcon className="h-4 w-4 text-indigo-500" />
    },
    { 
      name: "Avg. Reading Time", 
      value: "4:32", 
      change: "+0:42", 
      trend: "up", 
      description: "vs. previous month",
      icon: <BarChartIcon className="h-4 w-4 text-violet-500" />
    },
    { 
      name: "Keywords Targeted", 
      value: "214", 
      change: "+32", 
      trend: "up", 
      description: "this month",
      icon: <TrendingUpIcon className="h-4 w-4 text-emerald-500" />
    },
  ];

  // Recent content
  const recentContent = [
    {
      id: 1,
      title: "10 Ways to Improve Your Website's SEO in 2023",
      status: "Published",
      date: "2 hours ago",
      views: "342",
      keywords: ["SEO", "Website Optimization", "Digital Marketing"],
      author: "AI Writer"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Content Marketing Strategy",
      status: "Draft",
      date: "5 hours ago",
      views: "-",
      keywords: ["Content Marketing", "Strategy", "Lead Generation"],
      author: "AI Writer"
    },
    {
      id: 3,
      title: "How to Use Social Media to Drive Traffic to Your Blog",
      status: "Scheduled",
      date: "Tomorrow, 9:00 AM",
      views: "-",
      keywords: ["Social Media", "Blog Traffic", "Content Promotion"],
      author: "AI Writer"
    },
    {
      id: 4,
      title: "E-commerce SEO: Best Practices for Product Pages",
      status: "Published",
      date: "Yesterday",
      views: "518",
      keywords: ["E-commerce", "SEO", "Product Pages"],
      author: "AI Writer"
    },
    {
      id: 5,
      title: "Understanding Google's Latest Algorithm Update",
      status: "Published",
      date: "3 days ago",
      views: "1,247",
      keywords: ["Google Algorithm", "SEO Updates", "Search Rankings"],
      author: "AI Writer"
    },
  ];

  // Content performance data
  const performanceData = [
    { month: "Jan", articles: 42, traffic: 12400 },
    { month: "Feb", articles: 48, traffic: 14250 },
    { month: "Mar", articles: 51, traffic: 15800 },
    { month: "Apr", articles: 54, traffic: 16200 },
    { month: "May", articles: 62, traffic: 18100 },
    { month: "Jun", articles: 68, traffic: 20400 },
  ];

  // Keyword ranking changes
  const keywordRankings = [
    { keyword: "content marketing strategy", position: 4, change: 7 },
    { keyword: "ai content generator", position: 2, change: 3 },
    { keyword: "seo best practices 2023", position: 8, change: 5 },
    { keyword: "keyword research tools", position: 6, change: -2 },
    { keyword: "website audit checklist", position: 3, change: 4 },
    { keyword: "google search console guide", position: 5, change: 0 },
  ];

  // AI content generation templates
  const contentTemplates = [
    { name: "Blog Post (2000+ words)", description: "Comprehensive blog article with introduction, headings, and conclusion", usageCount: 427 },
    { name: "Product Description", description: "Compelling product details with features and benefits", usageCount: 318 },
    { name: "SEO Article", description: "Keyword-optimized content targeting search intent", usageCount: 295 },
    { name: "How-To Guide", description: "Step-by-step instructional content with examples", usageCount: 256 },
    { name: "Listicle (Top 10)", description: "Engaging list-based article with descriptions", usageCount: 213 },
  ];

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "Draft":
        return <Badge className="bg-amber-100 text-amber-800">Draft</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {showCreateContentForm && (
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10 border-b pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <PlusIcon className="w-5 h-5 mr-2 text-primary" />
                Create New Content
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => setShowCreateContentForm(false)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Fill out the form below to create new content</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleCreateContent} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Title</label>
                <Input 
                  placeholder="Enter title..." 
                  className="rounded-lg" 
                  value={newContent.title}
                  onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <Select 
                    value={newContent.type}
                    onValueChange={(value) => setNewContent({...newContent, type: value})}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog Post">Blog Post</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="Product Description">Product Description</SelectItem>
                      <SelectItem value="SEO Article">SEO Article</SelectItem>
                      <SelectItem value="Social Media">Social Media Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={newContent.category}
                    onValueChange={(value) => setNewContent({...newContent, category: value})}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEO">SEO</SelectItem>
                      <SelectItem value="Content">Content Marketing</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Keywords (comma separated)</label>
                <Input 
                  placeholder="e.g. content marketing, SEO best practices" 
                  className="rounded-lg" 
                  value={newContent.keywords}
                  onChange={(e) => setNewContent({...newContent, keywords: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Brief Description</label>
                <textarea 
                  placeholder="Enter a brief description or outline..." 
                  className="w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  value={newContent.description}
                  onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateContentForm(false)}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-lg">Create Content</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Hero section with welcome message and stats overview */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/90 to-primary p-8 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
        <div className="relative z-10">
          <div className="grid gap-6 md:grid-cols-[1fr_280px]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
              <p className="mt-2 text-primary-foreground/80">
                Your content dashboard shows strong performance this month. You have 3 scheduled posts for this week.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => setShowCreateContentForm(true)}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create New Content
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                  onClick={() => navigate("/calendar")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <h3 className="font-medium text-white">Quick Stats</h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Position</span>
                    <span className="font-medium">4.2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Engagement</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">87%</span>
                      <Badge className="bg-green-500 text-white">+5%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Words Generated</span>
                    <span className="font-medium">142k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contentMetrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center">
                    <div className="mr-2 rounded-full bg-primary/10 p-1.5">
                      {metric.icon}
                    </div>
                    <CardDescription>{metric.name}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-2xl">{metric.value}</CardTitle>
                    <Badge 
                      variant={metric.trend === "up" ? "default" : "destructive"}
                      className={metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{metric.description}</span>
                </div>
              </div>
            </CardContent>
            <div className="h-1 w-full bg-gray-100">
              <div 
                className={`h-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-indigo-500' : index === 2 ? 'bg-violet-500' : 'bg-emerald-500'}`} 
                style={{ width: `${60 + index * 10}%` }}
              ></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="recent-content" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="recent-content" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Recent Content
          </TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <LineChartIcon className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="keywords" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <SearchIcon className="mr-2 h-4 w-4" />
            Keywords
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BookOpenIcon className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Recent Content Tab */}
        <TabsContent value="recent-content">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Recently Created Content</CardTitle>
                <div className="w-72 relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search content..." className="pl-8 rounded-lg bg-muted/50" />
                </div>
              </div>
              <CardDescription>
                View and manage your recent AI-generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Views</th>
                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentContent.map((content) => (
                        <tr key={content.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">
                            <div>
                              <div className="font-medium">{content.title}</div>
                              <div className="text-muted-foreground text-xs flex flex-wrap gap-1 mt-1">
                                {content.keywords.map((keyword, i) => (
                                  <span key={i} className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{getStatusBadge(content.status)}</td>
                          <td className="p-4 align-middle">{content.date}</td>
                          <td className="p-4 align-middle">{content.views}</td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="sm" className="h-8 rounded-lg">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-3">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 24 content items
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8 rounded-lg">Previous</Button>
                <Button variant="outline" size="sm" className="h-8 rounded-lg">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>
                    Track your content metrics and traffic over time
                  </CardDescription>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-36 h-8 rounded-lg bg-muted/50">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] relative">
                {/* Chart visualization */}
                <div className="absolute inset-0 flex items-end px-4">
                  {performanceData.map((item, i) => (
                    <div key={i} className="relative flex-1 flex flex-col items-center">
                      {/* Articles count bar */}
                      <div 
                        className="w-6 bg-primary/80 rounded-t mx-auto transition-all hover:bg-primary cursor-pointer"
                        style={{ 
                          height: `${(item.articles / 70) * 120}px`,
                          opacity: 0.8
                        }}
                      ></div>
                      
                      {/* Month label */}
                      <div className="mt-2 text-xs font-medium">{item.month}</div>
                      
                      {/* Line for traffic */}
                      <div 
                        className="absolute w-full" 
                        style={{ 
                          bottom: `${(item.traffic / 21000) * 320}px`, 
                          left: i === 0 ? '50%' : '0%', 
                          right: i === performanceData.length - 1 ? '50%' : '0%'
                        }}
                      >
                        {i < performanceData.length - 1 && (
                          <div className="absolute right-0 w-[calc(100%+10px)] h-0.5 bg-emerald-500"></div>
                        )}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="absolute top-0 right-4 flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-sm mr-1"></div>
                    <span className="text-xs">Articles Published</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-sm mr-1"></div>
                    <span className="text-xs">Traffic (visits)</span>
                  </div>
                </div>

                {/* Content types breakdown */}
                <div className="absolute bottom-0 left-0 right-0 border-t pt-4 mt-8 px-4">
                  <h3 className="text-sm font-medium mb-2">Content Distribution</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { type: "Blog Posts", percentage: 45, color: "bg-primary" },
                      { type: "Product Content", percentage: 25, color: "bg-indigo-500" },
                      { type: "How-To Guides", percentage: 18, color: "bg-violet-500" },
                      { type: "Other", percentage: 12, color: "bg-slate-400" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="text-xs font-medium">{item.type}</div>
                        <div className="w-full h-2 bg-muted mt-1 rounded-full">
                          <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <div className="text-xs text-right mt-1">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keyword Rankings Tab */}
        <TabsContent value="keywords">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Keyword Rankings</CardTitle>
                  <CardDescription>
                    Track your content's position in search results
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 rounded-lg">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Keywords
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywordRankings.map((keyword, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-1">
                      <div className="font-medium">{keyword.keyword}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        Position: 
                        <span className="font-medium ml-1">#{keyword.position}</span>
                        <span className="inline-flex items-center ml-3">
                          {keyword.change !== 0 && (
                            <span className={`inline-block w-0 h-0 border-x-4 border-x-transparent ${
                              keyword.change > 0 ? 'border-b-4 border-b-green-500' : 'border-t-4 border-t-red-500'
                            } mr-1`}></span>
                          )}
                          <Badge 
                            className={
                              keyword.change > 0 
                                ? "bg-green-100 text-green-800" 
                                : keyword.change < 0 
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
                          </Badge>
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button className="rounded-lg">View All Keywords</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Templates Tab */}
        <TabsContent value="templates">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>AI Content Templates</CardTitle>
              <CardDescription>
                Quick-start your content creation with these templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contentTemplates.map((template, i) => (
                  <Card key={i} className="border hover:border-primary cursor-pointer transition-all overflow-hidden">
                    <CardHeader className="pb-2 bg-muted/30">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Used {template.usageCount} times</span>
                        <Button size="sm" className="rounded-lg">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer hover:border-primary bg-muted/10">
                  <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center mb-2">
                    <PlusIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">Create Custom Template</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick AI Tools Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pb-4">
            <CardTitle className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Content Generator
            </CardTitle>
            <CardDescription>Create new content with AI assistance</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Choose content type:</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start rounded-lg">Blog Post</Button>
                  <Button variant="outline" className="justify-start rounded-lg">Product Description</Button>
                  <Button variant="outline" className="justify-start rounded-lg">SEO Article</Button>
                  <Button variant="outline" className="justify-start rounded-lg">Social Media</Button>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Enter keywords or topic:</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="e.g., content marketing, SEO best practices" className="rounded-lg" />
                  <Button className="rounded-lg">Generate</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b pb-4">
            <CardTitle className="flex items-center">
              <SearchIcon className="w-5 h-5 mr-2 text-emerald-600" />
              Keyword Research
            </CardTitle>
            <CardDescription>Find valuable keywords for your content</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Search for keywords:</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Enter seed keyword..." className="rounded-lg" />
                  <Button className="rounded-lg">Search</Button>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Quick imports:</div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg">Import from GSC</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">Competitor Analysis</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">Topic Clusters</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDashboard; 