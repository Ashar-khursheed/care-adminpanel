import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/auth";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Authlogin from "./pages/auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users";
import ViewUser from "./pages/users/view-user";
import ProtectedRoute from "./routes/protected-route";
import CreateUser from "./pages/users/create-user";
import JobListing from "./pages/job-listing";
import ViewJobListing from "./pages/job-listing/view-listing";
import DashboardBooking from "./pages/bookings/dashboard";
import AllBookings from "./pages/bookings/all-bookings";
import BookingDetail from "./pages/bookings/booking-detail";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster position="top-center" reverseOrder={true} />
        <BrowserRouter>
          <Routes>
            {/* Public Route - Login */}
            <Route path="/" element={<Authlogin />} />

            {/* Protected Routes - All dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="create-user"
                element={
                  <ProtectedRoute>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
            <Route path="users/:id" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
            <Route path="job-listing" element={<ProtectedRoute><JobListing /></ProtectedRoute>} />
            <Route path="job-listing/:id" element={<ProtectedRoute><ViewJobListing /></ProtectedRoute>} />
            {/* Bookings */}
                     <Route path="bookings" element={<ProtectedRoute><DashboardBooking /></ProtectedRoute>} />
                     <Route path="my-bookings" element={<ProtectedRoute><AllBookings /></ProtectedRoute>} />
                     <Route path="booking/:id" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
