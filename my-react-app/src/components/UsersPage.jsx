import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UsersPage = () => {
  // Dummy user data
  const users = [
    {
      id: 1,
      name: "Alex Morgan",
      email: "alex@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "Just now",
      avatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=0D8ABC&color=fff"
    },
    {
      id: 2,
      name: "Sam Wilson",
      email: "sam@example.com",
      role: "Editor",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "https://ui-avatars.com/api/?name=Sam+Wilson&background=F59E0B&color=fff"
    },
    {
      id: 3,
      name: "Taylor Swift",
      email: "taylor@example.com",
      role: "Viewer",
      status: "Inactive",
      lastActive: "3 days ago",
      avatar: "https://ui-avatars.com/api/?name=Taylor+Swift&background=10B981&color=fff"
    },
    {
      id: 4,
      name: "Jamie Rodriguez",
      email: "jamie@example.com",
      role: "Viewer",
      status: "Pending",
      lastActive: "1 week ago",
      avatar: "https://ui-avatars.com/api/?name=Jamie+Rodriguez&background=8B5CF6&color=fff"
    },
    {
      id: 5,
      name: "Casey Jones",
      email: "casey@example.com",
      role: "Editor",
      status: "Active",
      lastActive: "5 minutes ago",
      avatar: "https://ui-avatars.com/api/?name=Casey+Jones&background=EF4444&color=fff"
    },
    {
      id: 6,
      name: "Jordan Lee",
      email: "jordan@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "1 day ago",
      avatar: "https://ui-avatars.com/api/?name=Jordan+Lee&background=6366F1&color=fff"
    },
  ];

  // User activity data for the engagement chart
  const userActivity = [
    { day: "Mon", logins: 120, actions: 340 },
    { day: "Tue", logins: 150, actions: 390 },
    { day: "Wed", logins: 180, actions: 480 },
    { day: "Thu", logins: 170, actions: 420 },
    { day: "Fri", logins: 200, actions: 510 },
    { day: "Sat", logins: 110, actions: 280 },
    { day: "Sun", logins: 90, actions: 220 },
  ];

  // Function to get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Inactive":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case "Editor":
        return <Badge className="bg-blue-100 text-blue-800">Editor</Badge>;
      case "Viewer":
        return <Badge className="bg-gray-100 text-gray-800">Viewer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="bg-primary">Add New User</Button>
      </div>

      <Tabs defaultValue="all-users" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="editors">Editors</TabsTrigger>
          <TabsTrigger value="viewers">Viewers</TabsTrigger>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
        </TabsList>

        {/* All Users Tab */}
        <TabsContent value="all-users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Users</CardTitle>
                <div className="w-72">
                  <Input placeholder="Search users..." />
                </div>
              </div>
              <CardDescription>Manage all users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Last Active</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-muted-foreground text-xs">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{getRoleBadge(user.role)}</td>
                          <td className="p-4 align-middle">{getStatusBadge(user.status)}</td>
                          <td className="p-4 align-middle">{user.lastActive}</td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role-based tabs */}
        {["admins", "editors", "viewers"].map((role) => (
          <TabsContent key={role} value={role}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{role.charAt(0).toUpperCase() + role.slice(1)}</CardTitle>
                  <div className="w-72">
                    <Input placeholder={`Search ${role}...`} />
                  </div>
                </div>
                <CardDescription>Users with {role.slice(0, -1)} permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Last Active</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .filter(user => user.role.toLowerCase() === role.slice(0, -1))
                          .map((user) => (
                            <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-muted-foreground text-xs">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">{getStatusBadge(user.status)}</td>
                              <td className="p-4 align-middle">{user.lastActive}</td>
                              <td className="p-4 align-middle text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        {/* User Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* User metrics cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Active users in your system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{users.length}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 12%</span> from last month
                </div>
                <div className="h-[4px] w-full bg-secondary mt-4">
                  <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">75% towards goal</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Users active in last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 8%</span> from last month
                </div>
                <div className="h-[4px] w-full bg-secondary mt-4">
                  <div className="h-full bg-primary" style={{ width: "67%" }}></div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">67% of all users</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>New Signups</CardTitle>
                <CardDescription>Users joined in last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500">↓ 5%</span> from last month
                </div>
                <div className="h-[4px] w-full bg-secondary mt-4">
                  <div className="h-full bg-primary" style={{ width: "33%" }}></div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">33% of target</div>
              </CardContent>
            </Card>

            {/* User engagement chart */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Weekly logins and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] relative">
                  <div className="absolute inset-0 flex items-end justify-around px-4">
                    {userActivity.map((day, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 w-full">
                        {/* Login bar */}
                        <div
                          className="w-6 bg-blue-500 rounded-sm"
                          style={{ height: `${(day.logins / 200) * 200}px` }}
                        ></div>
                        
                        {/* Actions bar */}
                        <div
                          className="w-6 bg-purple-500 rounded-sm"
                          style={{ height: `${(day.actions / 510) * 200}px` }}
                        ></div>
                        
                        <div className="text-xs font-medium mt-2">{day.day}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute top-0 right-4 flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                      <span className="text-xs">Logins</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
                      <span className="text-xs">Actions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role distribution */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
                <CardDescription>User access levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { role: "Admin", count: users.filter(u => u.role === "Admin").length, color: "bg-purple-500" },
                    { role: "Editor", count: users.filter(u => u.role === "Editor").length, color: "bg-blue-500" },
                    { role: "Viewer", count: users.filter(u => u.role === "Viewer").length, color: "bg-gray-500" }
                  ].map((role) => (
                    <div key={role.role} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{role.role}</span>
                        <span className="text-sm text-muted-foreground">{role.count} users</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div
                          className={`h-2 rounded-full ${role.color}`}
                          style={{ width: `${(role.count / users.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status distribution */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Status Overview</CardTitle>
                <CardDescription>User activity status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { status: "Active", count: users.filter(u => u.status === "Active").length, color: "bg-green-500" },
                    { status: "Inactive", count: users.filter(u => u.status === "Inactive").length, color: "bg-gray-500" },
                    { status: "Pending", count: users.filter(u => u.status === "Pending").length, color: "bg-yellow-500" }
                  ].map((status) => (
                    <div key={status.status} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{status.status}</span>
                        <span className="text-sm text-muted-foreground">{status.count} users</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div
                          className={`h-2 rounded-full ${status.color}`}
                          style={{ width: `${(status.count / users.length) * 100}%` }}
                        ></div>
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

export default UsersPage; 