// import {
//   CreditCard,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Calendar,
//   User,
//   Building,
//   Hash,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Receipt,
//   LucideIcon,
// } from "lucide-react";
// import { StatsCard } from "@/components/StatsCard";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";

// import makeApiRequest from "@/services/axios";
// import { useEffect, useState } from "react";

// // Type definitions
// interface TransactionUser {
//   id: number;
//   name: string;
//   email: string;
//   profile_photo: string | null;
// }

// interface Transaction {
//   id: number;
//   transaction_id: string;
//   user: TransactionUser;
//   amount: number;
//   currency: string;
//   type: "credit" | "debit" | "refund" | "purchase" | "withdrawal";
//   status: "completed" | "pending" | "failed" | "cancelled";
//   payment_method: string;
//   payment_gateway: string;
//   description: string;
//   reference_number: string | null;
//   metadata: {
//     order_id?: string;
//     product_name?: string;
//     quantity?: number;
//     [key: string]: any;
//   } | null;
//   created_at: string;
//   updated_at: string;
// }

// interface TransactionStats {
//   total_transactions: number;
//   total_amount: number;
//   completed_transactions: number;
//   pending_transactions: number;
//   failed_transactions: number;
//   total_credits: number;
//   total_debits: number;
// }

// interface TransactionsResponse {
//   data: Transaction[];
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     per_page: number;
//     to: number;
//     total: number;
//   };
//   stats?: TransactionStats;
// }

// interface StatCard {
//   title: string;
//   value: string;
//   change: string;
//   icon: LucideIcon;
//   trend: "up" | "down";
// }

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
//   const [statsData, setStatsData] = useState<StatCard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [isDetailOpen, setIsDetailOpen] = useState(false);

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);
      
//       // Replace with your actual API endpoint
//       const response: TransactionsResponse = await makeApiRequest("/admin/transactions?page=1", {
//         method: "GET",
//       });

//       console.log("Transactions API Response:", response);

//       if (response?.data && Array.isArray(response.data)) {
//         setTransactions(response.data);

//         // If stats are available in response
//         if (response.stats) {
//           const stats = response.stats;
//           const transformedStats: StatCard[] = [
//             {
//               title: "Total Transactions",
//               value: stats.total_transactions.toString(),
//               change: "All time",
//               icon: Receipt,
//               trend: "up" as const,
//             },
//             {
//               title: "Total Amount",
//               value: `$${stats.total_amount.toFixed(2)}`,
//               change: "Overall revenue",
//               icon: DollarSign,
//               trend: "up" as const,
//             },
//             {
//               title: "Completed",
//               value: stats.completed_transactions.toString(),
//               change: "Successful transactions",
//               icon: CheckCircle,
//               trend: "up" as const,
//             },
//             {
//               title: "Pending",
//               value: stats.pending_transactions.toString(),
//               change: "In progress",
//               icon: Clock,
//               trend: "up" as const,
//             },
//             {
//               title: "Total Credits",
//               value: `$${stats.total_credits.toFixed(2)}`,
//               change: "Money received",
//               icon: TrendingUp,
//               trend: "up" as const,
//             },
//             {
//               title: "Total Debits",
//               value: `$${stats.total_debits.toFixed(2)}`,
//               change: "Money spent",
//               icon: TrendingDown,
//               trend: "down" as const,
//             },
//           ];
//           setStatsData(transformedStats);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const getStatusConfig = (status: string) => {
//     const config: Record<string, { className: string; icon: LucideIcon; label: string }> = {
//       completed: {
//         className: "bg-green-100 text-green-800 hover:bg-green-100",
//         icon: CheckCircle,
//         label: "Completed",
//       },
//       pending: {
//         className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//         icon: Clock,
//         label: "Pending",
//       },
//       failed: {
//         className: "bg-red-100 text-red-800 hover:bg-red-100",
//         icon: XCircle,
//         label: "Failed",
//       },
//       cancelled: {
//         className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
//         icon: AlertCircle,
//         label: "Cancelled",
//       },
//     };
//     return config[status] || config.pending;
//   };

//   const getTypeConfig = (type: string) => {
//     const config: Record<string, { className: string; icon: LucideIcon; label: string }> = {
//       credit: {
//         className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
//         icon: ArrowDownLeft,
//         label: "Credit",
//       },
//       debit: {
//         className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
//         icon: ArrowUpRight,
//         label: "Debit",
//       },
//       refund: {
//         className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
//         icon: TrendingDown,
//         label: "Refund",
//       },
//       purchase: {
//         className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
//         icon: CreditCard,
//         label: "Purchase",
//       },
//       withdrawal: {
//         className: "bg-pink-100 text-pink-800 hover:bg-pink-100",
//         icon: ArrowUpRight,
//         label: "Withdrawal",
//       },
//     };
//     return config[type] || config.debit;
//   };

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatCurrency = (amount: number, currency: string = "USD") => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: currency,
//     }).format(amount);
//   };

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const handleViewDetails = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setIsDetailOpen(true);
//   };

//   const filteredTransactions = transactions.filter((transaction) => {
//     const matchesSearch =
//       transaction.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.description.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
//     const matchesType = typeFilter === "all" || transaction.type === typeFilter;

//     return matchesSearch && matchesStatus && matchesType;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {loading ? (
//           Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
//           ))
//         ) : statsData.length > 0 ? (
//           statsData.map((stat, index) => <StatsCard key={index} {...stat} />)
//         ) : (
//           <div className="col-span-3 text-center text-gray-500">No data available</div>
//         )}
//       </div>

//       {/* Transactions Table */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-xl">Transaction History</CardTitle>
//               <CardDescription>View and manage all transactions</CardDescription>
//             </div>
//             <Button variant="outline" size="sm">
//               <Download className="w-4 h-4 mr-2" />
//               Export
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {/* Filters */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 type="text"
//                 placeholder="Search by transaction ID, user, or description..."
//                 className="pl-10"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="failed">Failed</SelectItem>
//                 <SelectItem value="cancelled">Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="Filter by type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="credit">Credit</SelectItem>
//                 <SelectItem value="debit">Debit</SelectItem>
//                 <SelectItem value="refund">Refund</SelectItem>
//                 <SelectItem value="purchase">Purchase</SelectItem>
//                 <SelectItem value="withdrawal">Withdrawal</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Table */}
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Transaction ID</TableHead>
//                   <TableHead>User</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Payment Method</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={8} className="text-center py-8">
//                       Loading transactions...
//                     </TableCell>
//                   </TableRow>
//                 ) : filteredTransactions.length > 0 ? (
//                   filteredTransactions.map((transaction) => {
//                     const statusConfig = getStatusConfig(transaction.status);
//                     const typeConfig = getTypeConfig(transaction.type);
//                     const StatusIcon = statusConfig.icon;
//                     const TypeIcon = typeConfig.icon;

//                     return (
//                       <TableRow key={transaction.id} className="hover:bg-gray-50">
//                         <TableCell className="font-mono text-sm">
//                           {transaction.transaction_id}
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center gap-3">
//                             <Avatar className="w-8 h-8">
//                               <AvatarImage src={transaction.user.profile_photo || undefined} />
//                               <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
//                                 {getInitials(transaction.user.name)}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <p className="font-medium text-sm">{transaction.user.name}</p>
//                               <p className="text-xs text-gray-500">{transaction.user.email}</p>
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <Badge className={typeConfig.className}>
//                             <TypeIcon className="w-3 h-3 mr-1" />
//                             {typeConfig.label}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <span
//                             className={`font-semibold ${
//                               transaction.type === "credit" || transaction.type === "refund"
//                                 ? "text-green-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {transaction.type === "credit" || transaction.type === "refund"
//                               ? "+"
//                               : "-"}
//                             {formatCurrency(transaction.amount, transaction.currency)}
//                           </span>
//                         </TableCell>
//                         <TableCell>
//                           <Badge className={statusConfig.className}>
//                             <StatusIcon className="w-3 h-3 mr-1" />
//                             {statusConfig.label}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4 text-gray-400" />
//                             <span className="text-sm">{transaction.payment_method}</span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-sm text-gray-600">
//                           {formatDateTime(transaction.created_at)}
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleViewDetails(transaction)}
//                           >
//                             <Eye className="w-4 h-4 mr-1" />
//                             View
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={8} className="text-center py-8 text-gray-500">
//                       No transactions found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination Info */}
//           {filteredTransactions.length > 0 && (
//             <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
//               <p>
//                 Showing {filteredTransactions.length} of {transactions.length} transactions
//               </p>
//               <div className="flex items-center gap-2">
//                 <Button variant="outline" size="sm" disabled>
//                   Previous
//                 </Button>
//                 <Button variant="outline" size="sm" disabled>
//                   Next
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Transaction Detail Modal */}
//       <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl">Transaction Details</DialogTitle>
//             <DialogDescription>
//               Complete information about this transaction
//             </DialogDescription>
//           </DialogHeader>

//           {selectedTransaction && (
//             <div className="space-y-6">
//               {/* Transaction Header */}
//               <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
//                   <p className="font-mono font-semibold text-lg">
//                     {selectedTransaction.transaction_id}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500 mb-1">Amount</p>
//                   <p
//                     className={`text-2xl font-bold ${
//                       selectedTransaction.type === "credit" ||
//                       selectedTransaction.type === "refund"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {selectedTransaction.type === "credit" ||
//                     selectedTransaction.type === "refund"
//                       ? "+"
//                       : "-"}
//                     {formatCurrency(
//                       selectedTransaction.amount,
//                       selectedTransaction.currency
//                     )}
//                   </p>
//                 </div>
//               </div>

//               {/* Status and Type */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-4 border rounded-lg">
//                   <p className="text-sm text-gray-500 mb-2">Status</p>
//                   {(() => {
//                     const config = getStatusConfig(selectedTransaction.status);
//                     const Icon = config.icon;
//                     return (
//                       <Badge className={config.className}>
//                         <Icon className="w-4 h-4 mr-2" />
//                         {config.label}
//                       </Badge>
//                     );
//                   })()}
//                 </div>
//                 <div className="p-4 border rounded-lg">
//                   <p className="text-sm text-gray-500 mb-2">Type</p>
//                   {(() => {
//                     const config = getTypeConfig(selectedTransaction.type);
//                     const Icon = config.icon;
//                     return (
//                       <Badge className={config.className}>
//                         <Icon className="w-4 h-4 mr-2" />
//                         {config.label}
//                       </Badge>
//                     );
//                   })()}
//                 </div>
//               </div>

//               <Separator />

//               {/* User Information */}
//               <div>
//                 <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   User Information
//                 </h3>
//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
//                   <Avatar className="w-12 h-12">
//                     <AvatarImage
//                       src={selectedTransaction.user.profile_photo || undefined}
//                     />
//                     <AvatarFallback className="bg-primary/10 text-primary font-semibold">
//                       {getInitials(selectedTransaction.user.name)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="font-semibold">{selectedTransaction.user.name}</p>
//                     <p className="text-sm text-gray-600">
//                       {selectedTransaction.user.email}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       User ID: {selectedTransaction.user.id}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               {/* Payment Information */}
//               <div>
//                 <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                   <CreditCard className="w-5 h-5" />
//                   Payment Information
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500 mb-1">Payment Method</p>
//                     <p className="font-medium">{selectedTransaction.payment_method}</p>
//                   </div>
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500 mb-1">Payment Gateway</p>
//                     <p className="font-medium">{selectedTransaction.payment_gateway}</p>
//                   </div>
//                   {selectedTransaction.reference_number && (
//                     <div className="p-3 bg-gray-50 rounded-lg col-span-2">
//                       <p className="text-sm text-gray-500 mb-1">Reference Number</p>
//                       <p className="font-mono text-sm">
//                         {selectedTransaction.reference_number}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <Separator />

//               {/* Description */}
//               <div>
//                 <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                   <Receipt className="w-5 h-5" />
//                   Description
//                 </h3>
//                 <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
//                   {selectedTransaction.description}
//                 </p>
//               </div>

//               {/* Metadata */}
//               {selectedTransaction.metadata && (
//                 <>
//                   <Separator />
//                   <div>
//                     <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                       <Hash className="w-5 h-5" />
//                       Additional Information
//                     </h3>
//                     <div className="grid grid-cols-2 gap-3">
//                       {Object.entries(selectedTransaction.metadata).map(([key, value]) => (
//                         <div key={key} className="p-3 bg-gray-50 rounded-lg">
//                           <p className="text-sm text-gray-500 mb-1 capitalize">
//                             {key.replace(/_/g, " ")}
//                           </p>
//                           <p className="font-medium">{String(value)}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               )}

//               <Separator />

//               {/* Timestamps */}
//               <div>
//                 <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                   <Calendar className="w-5 h-5" />
//                   Timeline
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">Created At</span>
//                     <span className="font-medium">
//                       {formatDateTime(selectedTransaction.created_at)}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">Last Updated</span>
//                     <span className="font-medium">
//                       {formatDateTime(selectedTransaction.updated_at)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-4">
//                 <Button variant="outline" className="flex-1">
//                   <Download className="w-4 h-4 mr-2" />
//                   Download Receipt
//                 </Button>
//                 <Button variant="outline" className="flex-1">
//                   Print
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TransactionHistory;

































// with mock dataa



import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Building,
  Hash,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  LucideIcon,
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import makeApiRequest from "@/services/axios";
import { useEffect, useState } from "react";

// Type definitions
interface TransactionUser {
  id: number;
  name: string;
  email: string;
  profile_photo: string | null;
}

interface Transaction {
  id: number;
  transaction_id: string;
  user: TransactionUser;
  amount: number;
  currency: string;
  type: "credit" | "debit" | "refund" | "purchase" | "withdrawal";
  status: "completed" | "pending" | "failed" | "cancelled";
  payment_method: string;
  payment_gateway: string;
  description: string;
  reference_number: string | null;
  metadata: {
    order_id?: string;
    product_name?: string;
    quantity?: number;
    [key: string]: any;
  } | null;
  created_at: string;
  updated_at: string;
}

interface TransactionStats {
  total_transactions: number;
  total_amount: number;
  completed_transactions: number;
  pending_transactions: number;
  failed_transactions: number;
  total_credits: number;
  total_debits: number;
}

interface TransactionsResponse {
  data: Transaction[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  stats?: TransactionStats;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

// Mock Data
const mockTransactions: Transaction[] = [
  {
    id: 1,
    transaction_id: "TXN-2025-001234",
    user: {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed.ali@example.com",
      profile_photo: null,
    },
    amount: 2500.00,
    currency: "USD",
    type: "purchase",
    status: "completed",
    payment_method: "Credit Card",
    payment_gateway: "Stripe",
    description: "Premium Subscription Plan - Annual",
    reference_number: "REF-STR-78945",
    metadata: {
      order_id: "ORD-001234",
      product_name: "Premium Annual Plan",
      quantity: 1,
      billing_cycle: "yearly",
    },
    created_at: "2025-12-08 10:30:00",
    updated_at: "2025-12-08 10:30:00",
  },
  {
    id: 2,
    transaction_id: "TXN-2025-001235",
    user: {
      id: 2,
      name: "Fatima Khan",
      email: "fatima.khan@example.com",
      profile_photo: null,
    },
    amount: 150.00,
    currency: "USD",
    type: "credit",
    status: "completed",
    payment_method: "Bank Transfer",
    payment_gateway: "Square",
    description: "Payment received for invoice #INV-5678",
    reference_number: "REF-SQR-45632",
    metadata: {
      invoice_id: "INV-5678",
      customer_id: "CUST-002",
    },
    created_at: "2025-12-08 09:15:00",
    updated_at: "2025-12-08 09:15:00",
  },
  {
    id: 3,
    transaction_id: "TXN-2025-001236",
    user: {
      id: 3,
      name: "Omar Hassan",
      email: "omar.hassan@example.com",
      profile_photo: null,
    },
    amount: 75.50,
    currency: "USD",
    type: "refund",
    status: "completed",
    payment_method: "Credit Card",
    payment_gateway: "Stripe",
    description: "Refund for cancelled order #ORD-9876",
    reference_number: "REF-STR-99887",
    metadata: {
      order_id: "ORD-9876",
      reason: "Customer request",
      original_transaction: "TXN-2025-001100",
    },
    created_at: "2025-12-08 08:45:00",
    updated_at: "2025-12-08 08:45:00",
  },
  {
    id: 4,
    transaction_id: "TXN-2025-001237",
    user: {
      id: 4,
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      profile_photo: null,
    },
    amount: 500.00,
    currency: "USD",
    type: "purchase",
    status: "pending",
    payment_method: "PayPal",
    payment_gateway: "PayPal",
    description: "Restaurant Equipment Purchase",
    reference_number: "REF-PPL-12345",
    metadata: {
      order_id: "ORD-001237",
      product_name: "Commercial Blender",
      quantity: 2,
      warehouse: "UAE-DXB",
    },
    created_at: "2025-12-08 07:20:00",
    updated_at: "2025-12-08 07:20:00",
  },
  {
    id: 5,
    transaction_id: "TXN-2025-001238",
    user: {
      id: 5,
      name: "Mohammed Raza",
      email: "mohammed.raza@example.com",
      profile_photo: null,
    },
    amount: 1200.00,
    currency: "USD",
    type: "debit",
    status: "failed",
    payment_method: "Credit Card",
    payment_gateway: "Stax",
    description: "Kitchen Supplies Order",
    reference_number: null,
    metadata: {
      order_id: "ORD-001238",
      error_code: "insufficient_funds",
      retry_count: 2,
    },
    created_at: "2025-12-07 18:30:00",
    updated_at: "2025-12-07 18:35:00",
  },
  {
    id: 6,
    transaction_id: "TXN-2025-001239",
    user: {
      id: 6,
      name: "Aisha Rahman",
      email: "aisha.rahman@example.com",
      profile_photo: null,
    },
    amount: 350.00,
    currency: "USD",
    type: "withdrawal",
    status: "completed",
    payment_method: "Bank Account",
    payment_gateway: "Stripe",
    description: "Withdrawal to bank account ****4567",
    reference_number: "REF-STR-66778",
    metadata: {
      bank_name: "Emirates NBD",
      account_last4: "4567",
      processing_time: "2-3 business days",
    },
    created_at: "2025-12-07 16:00:00",
    updated_at: "2025-12-07 16:00:00",
  },
  {
    id: 7,
    transaction_id: "TXN-2025-001240",
    user: {
      id: 7,
      name: "Yusuf Ibrahim",
      email: "yusuf.ibrahim@example.com",
      profile_photo: null,
    },
    amount: 899.99,
    currency: "USD",
    type: "purchase",
    status: "completed",
    payment_method: "Debit Card",
    payment_gateway: "Paymob",
    description: "Commercial Coffee Machine",
    reference_number: "REF-PMB-88990",
    metadata: {
      order_id: "ORD-001240",
      product_name: "Espresso Machine Pro",
      quantity: 1,
      warranty: "2 years",
    },
    created_at: "2025-12-07 14:15:00",
    updated_at: "2025-12-07 14:15:00",
  },
  {
    id: 8,
    transaction_id: "TXN-2025-001241",
    user: {
      id: 8,
      name: "Nadia Malik",
      email: "nadia.malik@example.com",
      profile_photo: null,
    },
    amount: 45.00,
    currency: "USD",
    type: "purchase",
    status: "cancelled",
    payment_method: "Credit Card",
    payment_gateway: "Stripe",
    description: "Monthly Subscription - Basic Plan",
    reference_number: "REF-STR-11223",
    metadata: {
      subscription_id: "SUB-001241",
      plan: "Basic Monthly",
      cancellation_reason: "Customer request",
    },
    created_at: "2025-12-07 12:00:00",
    updated_at: "2025-12-07 12:30:00",
  },
  {
    id: 9,
    transaction_id: "TXN-2025-001242",
    user: {
      id: 9,
      name: "Bilal Sheikh",
      email: "bilal.sheikh@example.com",
      profile_photo: null,
    },
    amount: 3200.00,
    currency: "USD",
    type: "credit",
    status: "completed",
    payment_method: "Wire Transfer",
    payment_gateway: "Square",
    description: "Bulk order payment - Restaurant supplies",
    reference_number: "REF-SQR-99887",
    metadata: {
      invoice_id: "INV-7890",
      po_number: "PO-2025-123",
      customer_id: "CUST-009",
    },
    created_at: "2025-12-07 10:45:00",
    updated_at: "2025-12-07 10:45:00",
  },
  {
    id: 10,
    transaction_id: "TXN-2025-001243",
    user: {
      id: 10,
      name: "Layla Hussain",
      email: "layla.hussain@example.com",
      profile_photo: null,
    },
    amount: 125.00,
    currency: "USD",
    type: "refund",
    status: "pending",
    payment_method: "PayPal",
    payment_gateway: "PayPal",
    description: "Partial refund for damaged items",
    reference_number: "REF-PPL-77665",
    metadata: {
      order_id: "ORD-9988",
      refund_type: "partial",
      items_affected: 3,
    },
    created_at: "2025-12-07 09:30:00",
    updated_at: "2025-12-07 09:30:00",
  },
  {
    id: 11,
    transaction_id: "TXN-2025-001244",
    user: {
      id: 11,
      name: "Hamza Farooq",
      email: "hamza.farooq@example.com",
      profile_photo: null,
    },
    amount: 675.50,
    currency: "USD",
    type: "purchase",
    status: "completed",
    payment_method: "Credit Card",
    payment_gateway: "Stripe",
    description: "Hotel kitchen equipment accessories",
    reference_number: "REF-STR-44556",
    metadata: {
      order_id: "ORD-001244",
      product_name: "Kitchen Accessories Bundle",
      quantity: 5,
      delivery_date: "2025-12-10",
    },
    created_at: "2025-12-06 16:20:00",
    updated_at: "2025-12-06 16:20:00",
  },
  {
    id: 12,
    transaction_id: "TXN-2025-001245",
    user: {
      id: 12,
      name: "Zainab Ali",
      email: "zainab.ali@example.com",
      profile_photo: null,
    },
    amount: 280.00,
    currency: "USD",
    type: "debit",
    status: "completed",
    payment_method: "Debit Card",
    payment_gateway: "Stax",
    description: "Restaurant supplies - Monthly order",
    reference_number: "REF-STX-33445",
    metadata: {
      order_id: "ORD-001245",
      subscription: "monthly_supplies",
      auto_renewal: true,
    },
    created_at: "2025-12-06 14:00:00",
    updated_at: "2025-12-06 14:00:00",
  },
];

const mockStats: TransactionStats = {
  total_transactions: 12,
  total_amount: 10553.99,
  completed_transactions: 8,
  pending_transactions: 2,
  failed_transactions: 1,
  total_credits: 3475.00,
  total_debits: 7078.99,
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [statsData, setStatsData] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use mock data
      setTransactions(mockTransactions);

      // Transform stats
      const transformedStats: StatCard[] = [
        {
          title: "Total Transactions",
          value: mockStats.total_transactions.toString(),
          change: "All time",
          icon: Receipt,
          trend: "up" as const,
        },
        {
          title: "Total Amount",
          value: `$${mockStats.total_amount.toFixed(2)}`,
          change: "Overall revenue",
          icon: DollarSign,
          trend: "up" as const,
        },
        {
          title: "Completed",
          value: mockStats.completed_transactions.toString(),
          change: "Successful transactions",
          icon: CheckCircle,
          trend: "up" as const,
        },
        {
          title: "Pending",
          value: mockStats.pending_transactions.toString(),
          change: "In progress",
          icon: Clock,
          trend: "up" as const,
        },
        {
          title: "Total Credits",
          value: `$${mockStats.total_credits.toFixed(2)}`,
          change: "Money received",
          icon: TrendingUp,
          trend: "up" as const,
        },
        {
          title: "Total Debits",
          value: `$${mockStats.total_debits.toFixed(2)}`,
          change: "Money spent",
          icon: TrendingDown,
          trend: "down" as const,
        },
      ];
      setStatsData(transformedStats);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getStatusConfig = (status: string) => {
    const config: Record<string, { className: string; icon: LucideIcon; label: string }> = {
      completed: {
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: CheckCircle,
        label: "Completed",
      },
      pending: {
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        icon: Clock,
        label: "Pending",
      },
      failed: {
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        icon: XCircle,
        label: "Failed",
      },
      cancelled: {
        className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        icon: AlertCircle,
        label: "Cancelled",
      },
    };
    return config[status] || config.pending;
  };

  const getTypeConfig = (type: string) => {
    const config: Record<string, { className: string; icon: LucideIcon; label: string }> = {
      credit: {
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        icon: ArrowDownLeft,
        label: "Credit",
      },
      debit: {
        className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        icon: ArrowUpRight,
        label: "Debit",
      },
      refund: {
        className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        icon: TrendingDown,
        label: "Refund",
      },
      purchase: {
        className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
        icon: CreditCard,
        label: "Purchase",
      },
      withdrawal: {
        className: "bg-pink-100 text-pink-800 hover:bg-pink-100",
        icon: ArrowUpRight,
        label: "Withdrawal",
      },
    };
    return config[type] || config.debit;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          ))
        ) : statsData.length > 0 ? (
          statsData.map((stat, index) => <StatsCard key={index} {...stat} />)
        ) : (
          <div className="col-span-3 text-center text-gray-500">No data available</div>
        )}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Transaction History</CardTitle>
              <CardDescription>View and manage all transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by transaction ID, user, or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                ) : filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const statusConfig = getStatusConfig(transaction.status);
                    const typeConfig = getTypeConfig(transaction.type);
                    const StatusIcon = statusConfig.icon;
                    const TypeIcon = typeConfig.icon;

                    return (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">
                          {transaction.transaction_id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={transaction.user.profile_photo || undefined} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                {getInitials(transaction.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{transaction.user.name}</p>
                              <p className="text-xs text-gray-500">{transaction.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={typeConfig.className}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {typeConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold ${
                              transaction.type === "credit" || transaction.type === "refund"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "credit" || transaction.type === "refund"
                              ? "+"
                              : "-"}
                            {formatCurrency(transaction.amount, transaction.currency)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.className}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{transaction.payment_method}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDateTime(transaction.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(transaction)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Info */}
          {filteredTransactions.length > 0 && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <p>
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about this transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              {/* Transaction Header */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-mono font-semibold text-lg">
                    {selectedTransaction.transaction_id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Amount</p>
                  <p
                    className={`text-2xl font-bold ${
                      selectedTransaction.type === "credit" ||
                      selectedTransaction.type === "refund"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.type === "credit" ||
                    selectedTransaction.type === "refund"
                      ? "+"
                      : "-"}
                    {formatCurrency(
                      selectedTransaction.amount,
                      selectedTransaction.currency
                    )}
                  </p>
                </div>
              </div>

              {/* Status and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  {(() => {
                    const config = getStatusConfig(selectedTransaction.status);
                    const Icon = config.icon;
                    return (
                      <Badge className={config.className}>
                        <Icon className="w-4 h-4 mr-2" />
                        {config.label}
                      </Badge>
                    );
                  })()}
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Type</p>
                  {(() => {
                    const config = getTypeConfig(selectedTransaction.type);
                    const Icon = config.icon;
                    return (
                      <Badge className={config.className}>
                        <Icon className="w-4 h-4 mr-2" />
                        {config.label}
                      </Badge>
                    );
                  })()}
                </div>
              </div>

              <Separator />

              {/* User Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Information
                </h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={selectedTransaction.user.profile_photo || undefined}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(selectedTransaction.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedTransaction.user.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedTransaction.user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      User ID: {selectedTransaction.user.id}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="font-medium">{selectedTransaction.payment_method}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Payment Gateway</p>
                    <p className="font-medium">{selectedTransaction.payment_gateway}</p>
                  </div>
                  {selectedTransaction.reference_number && (
                    <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Reference Number</p>
                      <p className="font-mono text-sm">
                        {selectedTransaction.reference_number}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Description
                </h3>
                <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                  {selectedTransaction.description}
                </p>
              </div>

              {/* Metadata */}
              {selectedTransaction.metadata && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Hash className="w-5 h-5" />
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedTransaction.metadata).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1 capitalize">
                            {key.replace(/_/g, " ")}
                          </p>
                          <p className="font-medium">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Timestamps */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Created At</span>
                    <span className="font-medium">
                      {formatDateTime(selectedTransaction.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="font-medium">
                      {formatDateTime(selectedTransaction.updated_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionHistory;