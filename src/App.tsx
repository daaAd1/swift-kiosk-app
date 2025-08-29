import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InternationalizationProvider } from "@/contexts/InternationalizationContext";

// Import all screens
import Welcome from "./pages/Welcome";
import CheckIn from "./pages/CheckIn";
import EidCard from "./pages/EidCard";
import ManualForename from "./pages/ManualForename";
import ManualSurname from "./pages/ManualSurname";
import AppointmentConfirm from "./pages/AppointmentConfirm";
import AppointmentNotFound from "./pages/AppointmentNotFound";
import WelcomeFinal from "./pages/WelcomeFinal";
import VerifyContact from "./pages/VerifyContact";
import WeCallYouSoon from "./pages/WeCallYouSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <InternationalizationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/eid-card" element={<EidCard />} />
            <Route path="/manual-forename" element={<ManualForename />} />
            <Route path="/manual-surname" element={<ManualSurname />} />
            <Route path="/appointment-confirm" element={<AppointmentConfirm />} />
            <Route path="/appointment-not-found" element={<AppointmentNotFound />} />
            <Route path="/welcome-final" element={<WelcomeFinal />} />
            <Route path="/verify-contact" element={<VerifyContact />} />
            <Route path="/we-call-you-soon" element={<WeCallYouSoon />} />
            
            {/* Placeholder routes for remaining screens - to be implemented */}
            <Route path="/manual-decade" element={<div>Manual Decade - Coming Soon</div>} />
            <Route path="/manual-year" element={<div>Manual Year - Coming Soon</div>} />
            <Route path="/manual-month" element={<div>Manual Month - Coming Soon</div>} />
            <Route path="/manual-day" element={<div>Manual Day - Coming Soon</div>} />
            <Route path="/appointment-different-location" element={<div>Different Location - Coming Soon</div>} />
            <Route path="/sorry-delay" element={<div>Sorry for Delay - Coming Soon</div>} />
            <Route path="/patient-late" element={<div>Patient Late - Coming Soon</div>} />
            <Route path="/eid-warning" element={<div>eID Warning - Coming Soon</div>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </InternationalizationProvider>
  </QueryClientProvider>
);

export default App;
