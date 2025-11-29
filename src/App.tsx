import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Authlogin from "./pages/auth";
import { AuthProvider } from "./context/auth";
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./routes/protected-route";
import { Analytics } from "@vercel/analytics/next"
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Analytics />
    <AuthProvider>
      <TooltipProvider>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
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
              <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
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