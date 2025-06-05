import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn/ui sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import generated pages
import DashboardPage from "./pages/DashboardPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import PaymentInitiationPage from "./pages/PaymentInitiationPage";
import JointAccountCreationPage from "./pages/JointAccountCreationPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NotFound from "./pages/NotFound"; // Assuming this exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* Toasters should be outside Routes if they are global */}
        <Toaster />
        <Sonner />
        <Routes>
          {/* Assuming DashboardPage is the main page after login. 
              If there's a separate login/landing page, '/' would point to it.
              For this exercise, we'll make '/dashboard' the effective entry.
          */}
          <Route path="/" element={<DashboardPage />} /> {/* Or a dedicated landing/login page */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/account-details" element={<AccountDetailsPage />} />
          <Route path="/payment-initiation" element={<PaymentInitiationPage />} />
          <Route path="/joint-account-creation" element={<JointAccountCreationPage />} />
          <Route path="/profile-settings" element={<ProfileSettingsPage />} />
          
          {/* Add other application routes here */}

          {/* NotFound route should be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;