// import { User, MessageSquare, Activity, Flag, Paperclip, LucideIcon, Ban, CheckCircle } from "lucide-react";
// import { StatsCard } from "@/components/StatsCard";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   BarChart,
//   Bar,
// } from "recharts";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// import makeApiRequest from "@/services/axios";
// import { useEffect, useState } from "react";

// // Type definitions for API response
// interface Conversations {
//   total: number;
//   active: number;
//   blocked: number;
// }

// interface Messages {
//   total: number;
//   flagged: number;
//   with_attachments: number;
// }

// interface RecentMessage {
//   date: string;
//   count: number;
// }

// interface MostActiveUser {
//   user_id: number;
//   user_name: string;
//   messages_sent: number;
// }

// interface DashboardResponse {
//   success: boolean;
//   data: {
//     conversations: Conversations;
//     messages: Messages;
//     recent_messages: RecentMessage[];
//     most_active_users: MostActiveUser[];
//   };
// }

// interface StatCard {
//   title: string;
//   value: string;
//   change: string;
//   icon: LucideIcon;
//   trend: "up" | "down";
// }

// const DashboardMessages = () => {
//   const [statsData, setStatsData] = useState<StatCard[]>([]);
//   const [chartData, setChartData] = useState<Array<{ name: string; messages: number }>>([]);
//   const [activeUsers, setActiveUsers] = useState<MostActiveUser[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response: DashboardResponse = await makeApiRequest("/admin/messages/statistics", {
//         method: "GET",
//       });

//       console.log("Messages Dashboard API Response:", response);

//       if (response?.success && response?.data) {
//         const { conversations, messages } = response.data;

//         // Transform API data to StatsCard format
//         const transformedStats: StatCard[] = [
//           {
//             title: "Total Conversations",
//             value: conversations.total.toString(),
//             change: "All conversations",
//             icon: MessageSquare,
//             trend: "up" as const,
//           },
//           {
//             title: "Active Conversations",
//             value: conversations.active.toString(),
//             change: "Currently active",
//             icon: Activity,
//             trend: "up" as const,
//           },
//           {
//             title: "Blocked Conversations",
//             value: conversations.blocked.toString(),
//             change: "Blocked by users",
//             icon: Ban,
//             trend: "down" as const,
//           },
//           {
//             title: "Total Messages",
//             value: messages.total.toString(),
//             change: "All time messages",
//             icon: MessageSquare,
//             trend: "up" as const,
//           },
//           {
//             title: "Flagged Messages",
//             value: messages.flagged.toString(),
//             change: "Reported messages",
//             icon: Flag,
//             trend: "down" as const,
//           },
//           {
//             title: "With Attachments",
//             value: messages.with_attachments.toString(),
//             change: "Messages with files",
//             icon: Paperclip,
//             trend: "up" as const,
//           },
//         ];

//         setStatsData(transformedStats);

//         // Transform recent messages for chart
//         if (response.data.recent_messages && response.data.recent_messages.length > 0) {
//           const formattedChartData = response.data.recent_messages.map(msg => ({
//             name: new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//             messages: msg.count
//           }));
//           setChartData(formattedChartData);
//         }

//         // Set most active users
//         if (response.data.most_active_users) {
//           setActiveUsers(response.data.most_active_users);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching messages dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {loading ? (
//           // Loading skeleton
//           Array.from({ length: 6 }).map((_, index) => (
//             <div
//               key={index}
//               className="h-32 bg-gray-200 animate-pulse rounded-lg"
//             />
//           ))
//         ) : statsData.length > 0 ? (
//           statsData.map((stat, index) => <StatsCard key={index} {...stat} />)
//         ) : (
//           <div className="col-span-3 text-center text-gray-500">
//             No data available
//           </div>
//         )}
//       </div>

    

    
//     </div>
//   );
// };

// export default DashboardMessages;


import { User, MessageSquare, Activity, Flag, Paperclip, LucideIcon, Ban, CheckCircle, Send, Clock } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import makeApiRequest from "@/services/axios";
import { useEffect, useState } from "react";

// Type definitions for API response
interface Conversations {
  total: number;
  active: number;
  blocked: number;
}

interface Messages {
  total: number;
  flagged: number;
  with_attachments: number;
}

interface RecentMessage {
  date: string;
  count: number;
}

interface MostActiveUser {
  user_id: number;
  user_name: string;
  messages_sent: number;
}

interface DashboardResponse {
  success: boolean;
  data: {
    conversations: Conversations;
    messages: Messages;
    recent_messages: RecentMessage[];
    most_active_users: MostActiveUser[];
  };
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

interface MessageUser {
  id: number;
  name: string;
  profile_photo: string | null;
}

interface Message {
  id: number;
  conversation_id: number;
  sender: MessageUser;
  receiver: MessageUser;
  message: string;
  has_attachment: boolean;
  status: string;
  is_read: boolean;
  delivered_at: string | null;
  read_at: string | null;
  is_edited: boolean;
  sent_by_me: boolean;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

interface MessagesListResponse {
  data: Message[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

interface GroupedConversation {
  conversation_id: number;
  participants: string;
  sender: MessageUser;
  receiver: MessageUser;
  messages: Message[];
  latest_message: Message;
  message_count: number;
}

const DashboardMessages = () => {
  const [statsData, setStatsData] = useState<StatCard[]>([]);
  const [chartData, setChartData] = useState<Array<{ name: string; messages: number }>>([]);
  const [activeUsers, setActiveUsers] = useState<MostActiveUser[]>([]);
  const [conversations, setConversations] = useState<GroupedConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: DashboardResponse = await makeApiRequest("/admin/messages/statistics", {
        method: "GET",
      });

      console.log("Messages Dashboard API Response:", response);

      if (response?.success && response?.data) {
        const { conversations, messages } = response.data;

        // Transform API data to StatsCard format
        const transformedStats: StatCard[] = [
          {
            title: "Total Conversations",
            value: conversations.total.toString(),
            change: "All conversations",
            icon: MessageSquare,
            trend: "up" as const,
          },
          {
            title: "Active Conversations",
            value: conversations.active.toString(),
            change: "Currently active",
            icon: Activity,
            trend: "up" as const,
          },
          {
            title: "Blocked Conversations",
            value: conversations.blocked.toString(),
            change: "Blocked by users",
            icon: Ban,
            trend: "down" as const,
          },
          {
            title: "Total Messages",
            value: messages.total.toString(),
            change: "All time messages",
            icon: MessageSquare,
            trend: "up" as const,
          },
          {
            title: "Flagged Messages",
            value: messages.flagged.toString(),
            change: "Reported messages",
            icon: Flag,
            trend: "down" as const,
          },
          {
            title: "With Attachments",
            value: messages.with_attachments.toString(),
            change: "Messages with files",
            icon: Paperclip,
            trend: "up" as const,
          },
        ];

        setStatsData(transformedStats);

        // Transform recent messages for chart
        if (response.data.recent_messages && response.data.recent_messages.length > 0) {
          const formattedChartData = response.data.recent_messages.map(msg => ({
            name: new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            messages: msg.count
          }));
          setChartData(formattedChartData);
        }

        // Set most active users
        if (response.data.most_active_users) {
          setActiveUsers(response.data.most_active_users);
        }
      }
    } catch (error) {
      console.error("Error fetching messages dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setMessagesLoading(true);
      const response: MessagesListResponse = await makeApiRequest("/admin/messages?page=1", {
        method: "GET",
      });

      console.log("Messages List API Response:", response);

      if (response?.data && Array.isArray(response.data)) {
        // Group messages by conversation_id
        const grouped = response.data.reduce((acc: Record<number, Message[]>, message) => {
          if (!acc[message.conversation_id]) {
            acc[message.conversation_id] = [];
          }
          acc[message.conversation_id].push(message);
          return acc;
        }, {});

        // Transform to array format
        const conversationsArray: GroupedConversation[] = Object.entries(grouped).map(
          ([conversationId, messages]) => {
            const latestMessage = messages[0]; // Messages are already sorted by latest first
            return {
              conversation_id: Number(conversationId),
              participants: `${latestMessage.sender.name} & ${latestMessage.receiver.name}`,
              sender: latestMessage.sender,
              receiver: latestMessage.receiver,
              messages: messages,
              latest_message: latestMessage,
              message_count: messages.length,
            };
          }
        );

        setConversations(conversationsArray);
      }
    } catch (error) {
      console.error("Error fetching messages list:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMessages();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: LucideIcon }> = {
      sent: {
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        icon: Send,
      },
      delivered: {
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: CheckCircle,
      },
      read: {
        className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        icon: CheckCircle,
      },
    };

    const statusConfig = config[status] || config.sent;
    const Icon = statusConfig.icon;

    return (
      <Badge className={statusConfig.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 animate-pulse rounded-lg"
            />
          ))
        ) : statsData.length > 0 ? (
          statsData.map((stat, index) => <StatsCard key={index} {...stat} />)
        ) : (
          <div className="col-span-3 text-center text-gray-500">
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
                Recent Messages{" "}
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
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
                  dataKey="messages"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Trends</CardTitle>
            <CardDescription>Daily message statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="messages" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Most Active Users */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Most Active Users</CardTitle>
          <CardDescription>Users with most messages sent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeUsers.length > 0 ? (
              activeUsers.map((user, index) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{user.user_name}</p>
                      <p className="text-sm text-gray-500">
                        User ID: {user.user_id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      {user.messages_sent}
                    </p>
                    <p className="text-sm text-gray-500">messages sent</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No user data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Conversations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Conversations</CardTitle>
          <CardDescription>Latest messages from all conversations</CardDescription>
        </CardHeader>
        <CardContent>
          {messagesLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : conversations.length > 0 ? (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.conversation_id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    {/* Left Side - Participants Info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Sender Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={conversation.sender.profile_photo || undefined}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {getInitials(conversation.sender.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        {/* Conversation Header */}
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">
                            {conversation.sender.name}
                          </p>
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <p className="font-semibold">
                            {conversation.receiver.name}
                          </p>
                          <Badge variant="outline" className="ml-2">
                            #{conversation.conversation_id}
                          </Badge>
                        </div>

                        {/* Latest Message */}
                        <div className="bg-gray-50 p-3 rounded-md mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-medium text-gray-600">
                              From: {conversation.latest_message.sender.name}
                            </p>
                            <span className="text-xs text-gray-400">•</span>
                            <p className="text-xs text-gray-500">
                              {formatDateTime(conversation.latest_message.created_at)}
                            </p>
                            {conversation.latest_message.has_attachment && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <Paperclip className="w-3 h-3 text-gray-500" />
                              </>
                            )}
                            {conversation.latest_message.is_flagged && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <Flag className="w-3 h-3 text-red-500" />
                              </>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {conversation.latest_message.message}
                          </p>
                        </div>

                        {/* Message Stats */}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {conversation.message_count} messages
                          </span>
                          {conversation.latest_message.is_read ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Read
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                              <Clock className="w-3 h-3 mr-1" />
                              Unread
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Status */}
                    <div className="ml-4">
                      {getStatusBadge(conversation.latest_message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No conversations found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMessages;