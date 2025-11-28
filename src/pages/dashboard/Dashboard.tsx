import { User, Activity, CalendarDays, FilePlus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UsageCard from "./UsageCard";
import SocketStatusCard from "./SocketStatusCard";
import QueueStatusCard from "./QueueStatusCard";

const statsData = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+12%",
    icon: User,
    trend: "up" as const,
  },
  {
    title: "Suspicious Users",
    value: "245",
    change: "+8%",
    icon: FilePlus,
    trend: "up" as const,
  },
  {
    title: "Online Users",
    value: "3342",
    change: "live sockets",
    icon: Activity,
    trend: "up" as const,
  },
  {
    title: "CPU Usage",
    value: "57%",
    change: "live",
    icon: CalendarDays,
    trend: "up" as const,
  },
];

const chartData = [
  { name: "Jan", revenue: 4000, users: 400 },
  { name: "Feb", revenue: 3000, users: 300 },
  { name: "Mar", revenue: 5000, users: 500 },
  { name: "Apr", revenue: 4500, users: 450 },
  { name: "May", revenue: 6000, users: 600 },
  { name: "Jun", revenue: 5500, users: 550 },
];

const activityData = [
  { user: "John Doe", action: "Created new account", time: "2 minutes ago" },
  { user: "Jane Smith", action: "Updated profile", time: "5 minutes ago" },
  { user: "Bob Johnson", action: "Placed order #1234", time: "10 minutes ago" },
  {
    user: "Alice Brown",
    action: "Cancelled subscription",
    time: "15 minutes ago",
  },
  { user: "Charlie Wilson", action: "Left a review", time: "20 minutes ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
            <div className="flex items-center justify-between mb-3">
                App Downloader{" "}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Day</SelectItem>
                  <SelectItem value="dark">Week</SelectItem>
                  <SelectItem value="system">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </CardTitle>
           
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users registered each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Server Health Monitor</CardTitle>
          {/* <CardDescription>
            Latest user activities and system events
          </CardDescription> */}
        </CardHeader>
        <CardContent>
         <div className="bg-white p-6 rounded-xl shadow-md pt-0">
      {/* <h2 className="text-lg font-semibold mb-4">🔧 Server Health Monitor</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UsageCard label="CPU Usage" value={60} />
        <UsageCard label="RAM Usage" value={45} />
        <UsageCard label="Disk Usage" value={75} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SocketStatusCard status="connected" socketCount={132} />
        {/* <QueueStatusCard label="Message Queue" count={12} />
        <QueueStatusCard label="Media Queue" count={4} /> */}
      </div>
    </div>
        </CardContent>
      </Card>

      
    </div>
  );
}
