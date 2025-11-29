
import { User, Activity, CalendarDays, FilePlus, LucideIcon } from "lucide-react";
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
import { useEffect, useState } from "react";
import makeApiRequest from "@/services/axios";
import { apiUrl } from "@/services/api-end-point";

// Type definition for API response
interface DashboardStats {
  total_users: number;
  total_clients: number;
  total_providers: number;
  verified_users: number;
  pending_verification: number;
  active_users: number;
  suspended_users: number;
  pending_documents: number;
}

interface DashboardResponse {
  success: boolean;
  data: {
    stats: DashboardStats;
    recent_registrations: Array<{
      date: string;
      count: number;
    }>;
  };
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

const chartData = [
  { name: "Jan", revenue: 4000, users: 400 },
  { name: "Feb", revenue: 3000, users: 300 },
  { name: "Mar", revenue: 5000, users: 500 },
  { name: "Apr", revenue: 4500, users: 450 },
  { name: "May", revenue: 6000, users: 600 },
  { name: "Jun", revenue: 5500, users: 550 },
];

export default function Dashboard() {
  const [statsData, setStatsData] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: DashboardResponse = await makeApiRequest(apiUrl.dashboardStats, {
        method: "GET",
      });

      console.log("Dashboard API Response:", response);

      if (response?.success && response?.data?.stats) {
        const stats = response.data.stats;

        // Transform API data to StatsCard format
        const transformedStats: StatCard[] = [
          {
            title: "Total Users",
            value: stats.total_users.toString(),
            change: `${stats.verified_users} verified`,
            icon: User,
            trend: "up" as const,
          },
          {
            title: "Pending Verification",
            value: stats.pending_verification.toString(),
            change: `${stats.pending_documents} documents`,
            icon: FilePlus,
            trend: "up" as const,
          },
          {
            title: "Active Users",
            value: stats.active_users.toString(),
            change: "live",
            icon: Activity,
            trend: "up" as const,
          },
          {
            title: "Total Clients",
            value: stats.total_clients.toString(),
            change: `${stats.total_clients} clients`,
            icon: CalendarDays,
            trend: "up" as const,
          },
          {
            title: "Total Providers",
            value: stats.total_providers.toString(),
            change: `${stats.total_providers} providers`,
            icon: CalendarDays,
            trend: "up" as const,
          },
          {
            title: "Verified Users",
            value: stats.verified_users.toString(),
            change: `${stats.verified_users} verified`,
            icon: CalendarDays,
            trend: "up" as const,
          },
          {
            title: "Suspended Users",
            value: stats.suspended_users.toString(),
            change: `${stats.suspended_users} suspended`,
            icon: CalendarDays,
            trend: "up" as const,
          },
          {
            title: "Pending Documents",
            value: stats.pending_documents.toString(),
            change: `${stats.pending_documents} documents`,
            icon: CalendarDays,
            trend: "down" as const,
          },
        ];

        setStatsData(transformedStats);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 animate-pulse rounded-lg"
            />
          ))
        ) : statsData.length > 0 ? (
          statsData.map((stat, index) => <StatsCard key={index} {...stat} />)
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No data available
          </div>
        )}
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
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-xl shadow-md pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UsageCard label="CPU Usage" value={60} />
              <UsageCard label="RAM Usage" value={45} />
              <UsageCard label="Disk Usage" value={75} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <SocketStatusCard status="connected" socketCount={132} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}