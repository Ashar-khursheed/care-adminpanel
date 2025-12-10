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
import ReviewDashboard from "./pages/reviews/dashboard";
import AllReviews from "./pages/reviews/all-review";
import ReviewDetail from "./pages/reviews/review-detail";
import DashboardMessages from "./pages/messages/dashboard";
import TransactionHistory from "./pages/transactions";
import AddPlanSubscription from "./pages/subscription/add-plan-subscripton";
import GetAllSubscription from "./pages/subscription/all-subscription";
import EditPlanSubscription from "./pages/subscription/edit-subscription";
import ViewPlanDetail from "./pages/subscription/view-detail";
import BookingsAnalytics from "./pages/dashboard/booking";
import RevenueAnalytics from "./pages/dashboard/revenue";
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
                path="analytics/bookings"
                element={
                  <ProtectedRoute>
                  <BookingsAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="analytics/revenue"
                element={
                  <ProtectedRoute>
                  <RevenueAnalytics />
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
              <Route
                path="users/:id"
                element={
                  <ProtectedRoute>
                    <ViewUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="job-listing"
                element={
                  <ProtectedRoute>
                    <JobListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="job-listing/:id"
                element={
                  <ProtectedRoute>
                    <ViewJobListing />
                  </ProtectedRoute>
                }
              />
              {/* Bookings */}
              <Route
                path="bookings"
                element={
                  <ProtectedRoute>
                    <DashboardBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="my-bookings"
                element={
                  <ProtectedRoute>
                    <AllBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="booking/:id"
                element={
                  <ProtectedRoute>
                    <BookingDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reviews"
                element={
                  <ProtectedRoute>
                    <ReviewDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reviews/:id"
                element={
                  <ProtectedRoute>
                    <ReviewDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reviews-all"
                element={
                  <ProtectedRoute>
                    <AllReviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="messages"
                element={
                  <ProtectedRoute>
                    <DashboardMessages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="transactions"
                element={
                  <ProtectedRoute>
                    <TransactionHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subscription/add-plan-subscription"
                element={
                  <ProtectedRoute>
                    <AddPlanSubscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subscription/all-subscription"
                element={
                  <ProtectedRoute>
                    <GetAllSubscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subscription/view-plan/:planId"
                element={
                  <ProtectedRoute>
                    <ViewPlanDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="subscription/edit-subscription/:id"
                element={
                  <ProtectedRoute>
                    <EditPlanSubscription />
                  </ProtectedRoute>
                }
              />
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
