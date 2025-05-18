import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AnalyticsPage = () => {
  // Dummy data for visualizations
  const monthlyData = [
    { month: "Jan", visitors: 4200, conversions: 380, revenue: 12400 },
    { month: "Feb", visitors: 4800, conversions: 420, revenue: 14250 },
    { month: "Mar", visitors: 5100, conversions: 460, revenue: 13800 },
    { month: "Apr", visitors: 5400, conversions: 490, revenue: 16200 },
    { month: "May", visitors: 6200, conversions: 550, revenue: 18100 },
    { month: "Jun", visitors: 6800, conversions: 610, revenue: 20400 },
  ];

  // Traffic sources data
  const trafficSources = [
    { source: "Organic Search", percentage: 42, visits: 28560, prevPeriod: 38 },
    { source: "Direct", percentage: 25, visits: 17000, prevPeriod: 27 },
    { source: "Social Media", percentage: 18, visits: 12240, prevPeriod: 16 },
    { source: "Referrals", percentage: 10, visits: 6800, prevPeriod: 12 },
    { source: "Email", percentage: 5, visits: 3400, prevPeriod: 7 },
  ];

  // Conversion metrics
  const conversionMetrics = [
    { page: "Home Page", views: 25400, conversions: 1270, rate: 5.0 },
    { page: "Product Listing", views: 18200, conversions: 1092, rate: 6.0 },
    { page: "Product Detail", views: 12400, conversions: 868, rate: 7.0 },
    { page: "Checkout", views: 3200, conversions: 2240, rate: 70.0 },
    { page: "Thank You", views: 2240, conversions: 2240, rate: 100.0 },
  ];

  // Key performance indicators
  const kpis = [
    { 
      name: "Revenue", 
      value: "$95,150", 
      change: "+12.3%", 
      trend: "up", 
      description: "vs. previous month" 
    },
    { 
      name: "Avg. Order Value", 
      value: "$85.28", 
      change: "+5.4%", 
      trend: "up", 
      description: "vs. previous month" 
    },
    { 
      name: "Conversion Rate", 
      value: "3.8%", 
      change: "+0.5%", 
      trend: "up", 
      description: "vs. previous month" 
    },
    { 
      name: "Active Users", 
      value: "12,846", 
      change: "+18.2%", 
      trend: "up", 
      description: "vs. previous month" 
    },
  ];

  // Device breakdown
  const deviceData = [
    { device: "Mobile", percentage: 58 },
    { device: "Desktop", percentage: 36 },
    { device: "Tablet", percentage: 6 },
  ];

  // Dummy data for user behavior flow
  const userFlow = [
    { stage: "Visit", users: 68000, dropoff: 28000 },
    { stage: "Browse", users: 40000, dropoff: 15000 },
    { stage: "Add to Cart", users: 25000, dropoff: 13000 },
    { stage: "Checkout", users: 12000, dropoff: 3000 },
    { stage: "Purchase", users: 9000, dropoff: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-1.5">
                <CardDescription>{kpi.name}</CardDescription>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{kpi.value}</CardTitle>
                  <Badge 
                    variant={kpi.trend === "up" ? "default" : "destructive"}
                    className={kpi.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Monthly Trends - Takes 4 columns */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>
                  Visitor counts and conversions over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] relative">
                  {/* Line Chart Visualization */}
                  <div className="absolute inset-0 flex items-end px-4">
                    {monthlyData.map((item, i) => (
                      <div key={i} className="relative flex-1 flex flex-col items-center">
                        {/* Visitors bar */}
                        <div 
                          className="w-full max-w-[40px] mx-auto bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                          style={{ 
                            height: `${(item.visitors / 7000) * 100}%`,
                            opacity: 0.8
                          }}
                        ></div>
                        
                        {/* Month label */}
                        <div className="absolute -bottom-6 text-xs">{item.month}</div>
                        
                        {/* Line for conversions */}
                        <div 
                          className="absolute w-full" 
                          style={{ 
                            bottom: `${(item.conversions / 700) * 100}%`, 
                            left: i === 0 ? '50%' : '0%', 
                            right: i === monthlyData.length - 1 ? '50%' : '0%'
                          }}
                        >
                          {i < monthlyData.length - 1 && (
                            <div className="absolute right-0 w-[calc(100%+40px)] h-0.5 bg-green-500"></div>
                          )}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute top-0 right-4 flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                      <span className="text-xs">Visitors</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                      <span className="text-xs">Conversions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Device Breakdown - Takes 3 columns */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>
                  Visits by device type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deviceData.map((device) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{device.device}</span>
                        <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                    </div>
                  ))}
                  
                  {/* Simple pie chart */}
                  <div className="mt-8 relative h-[120px] w-[120px] mx-auto">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full w-full bg-blue-400"
                        style={{
                          clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
                          transform: 'rotate(0deg)'
                        }}
                      ></div>
                      <div 
                        className="absolute h-full w-full bg-indigo-500"
                        style={{
                          clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                          transform: 'rotate(208deg)'
                        }}
                      ></div>
                      <div 
                        className="absolute h-full w-full bg-purple-400"
                        style={{
                          clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 20%, 50% 20%)',
                          transform: 'rotate(129deg)'
                        }}
                      ></div>
                      <div className="absolute inset-[15%] bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">68K Users</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Acquisition Tab */}
        <TabsContent value="acquisition">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Traffic Sources */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {trafficSources.map((source, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{source.source}</span>
                        <span className="text-sm">{source.percentage}%</span>
                      </div>
                      <div className="space-y-1">
                        <Progress value={source.percentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{source.visits.toLocaleString()} visits</span>
                          <span className={source.percentage > source.prevPeriod ? "text-green-500" : "text-red-500"}>
                            {source.percentage > source.prevPeriod ? "↑" : "↓"} {Math.abs(source.percentage - source.prevPeriod)}% vs. prev.
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campaigns Performance */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  ROI for your marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { campaign: "Summer Sale", spent: "$3,200", conversions: 320, roi: 2.4 },
                    { campaign: "New Product Launch", spent: "$5,400", conversions: 485, roi: 1.8 },
                    { campaign: "Retargeting Ads", spent: "$1,800", conversions: 210, roi: 3.2 },
                    { campaign: "Email Newsletter", spent: "$800", conversions: 98, roi: 2.9 },
                  ].map((campaign, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">{campaign.campaign}</div>
                        <div className="text-xs text-muted-foreground">Spent: {campaign.spent}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{campaign.conversions} conv.</div>
                        <div className="text-xs text-green-500">{campaign.roi}x ROI</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Behavior Tab */}
        <TabsContent value="behavior">
          <div className="grid gap-4 md:grid-cols-2">
            {/* User Flow */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>User Flow</CardTitle>
                <CardDescription>
                  User journey through your conversion funnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-2 h-[240px]">
                  {userFlow.map((stage, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center mb-2">
                        <div className="text-xs font-semibold">{stage.users.toLocaleString()}</div>
                        <div 
                          className="w-full max-w-[50px] bg-blue-500 rounded-t"
                          style={{ 
                            height: `${(stage.users / userFlow[0].users) * 200}px`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs truncate max-w-[60px] text-center">{stage.stage}</div>
                      
                      {/* Drop-off arrow */}
                      {i < userFlow.length - 1 && (
                        <div className="absolute" style={{ 
                          left: `calc(${(i + 0.5) * (100 / userFlow.length)}%)`,
                          top: `calc(240px - ${(stage.users / userFlow[0].users) * 200}px - 35px)`,
                          width: `calc(100% / ${userFlow.length})`,
                        }}>
                          <div className="text-xs text-red-500 text-center">
                            {stage.dropoff.toLocaleString()} drop off
                          </div>
                          <div className="flex justify-center mt-1">
                            <div className="border-l-2 border-r-2 border-t-2 border-red-300 w-3 h-3 transform rotate-45"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6 text-sm">
                  <div>
                    <div className="font-semibold">Funnel Conversion Rate</div>
                    <div className="text-2xl font-bold">{((userFlow[userFlow.length - 1].users / userFlow[0].users) * 100).toFixed(1)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Total Conversions</div>
                    <div className="text-2xl font-bold">{userFlow[userFlow.length - 1].users.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Page Performance */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>
                  Top pages by visits and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "Homepage", visits: 32400, avgTime: "2:40", bounceRate: "38%" },
                    { page: "Product Listing", visits: 28100, avgTime: "3:12", bounceRate: "29%" },
                    { page: "Product Details", visits: 16400, avgTime: "4:05", bounceRate: "22%" },
                    { page: "Blog Articles", visits: 12800, avgTime: "5:20", bounceRate: "34%" },
                    { page: "Checkout", visits: 8200, avgTime: "2:55", bounceRate: "18%" },
                  ].map((page, i) => (
                    <div key={i} className="flex items-center border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="font-medium">{page.page}</div>
                        <div className="text-xs text-muted-foreground">{page.visits.toLocaleString()} visits</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-sm">{page.avgTime}</div>
                        <div className="text-xs text-muted-foreground">Avg. Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm">{page.bounceRate}</div>
                        <div className="text-xs text-muted-foreground">Bounce Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversions Tab */}
        <TabsContent value="conversions">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Conversion by Page */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Conversion by Page</CardTitle>
                <CardDescription>
                  Conversion rates across key pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conversionMetrics.map((page, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{page.page}</span>
                        <span className="text-sm font-bold">{page.rate}%</span>
                      </div>
                      <Progress value={page.rate > 10 ? 10 : page.rate} max={10} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{page.views.toLocaleString()} views</span>
                        <span>{page.conversions.toLocaleString()} conversions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Source */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
                <CardDescription>
                  Revenue distribution across channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Organic Search", revenue: "$38,240", percentage: 42 },
                    { source: "Direct", revenue: "$24,570", percentage: 27 },
                    { source: "Social Media", revenue: "$14,520", percentage: 16 },
                    { source: "Referrals", revenue: "$10,900", percentage: 12 },
                    { source: "Email", revenue: "$6,340", percentage: 7 },
                  ].map((source, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{source.source}</span>
                        <span className="text-sm font-medium">{source.revenue}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-blue-600" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-right text-muted-foreground">
                        {source.percentage}% of total
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage; 