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
import ManualDecade from "./pages/ManualDecade";
import ManualYear from "./pages/ManualYear";
import ManualMonth from "./pages/ManualMonth";
import ManualDay from "./pages/ManualDay";
import AppointmentConfirm from "./pages/AppointmentConfirm";
import AppointmentNotFound from "./pages/AppointmentNotFound";
import AppointmentDifferentLocation from "./pages/AppointmentDifferentLocation";
import WelcomeFinal from "./pages/WelcomeFinal";
import VerifyContact from "./pages/VerifyContact";
import UpdateEmail from "./pages/UpdateEmail";
import UpdatePhone from "./pages/UpdatePhone";
import WeCallYouSoon from "./pages/WeCallYouSoon";
import SorryDelay from "./pages/SorryDelay";
import PatientLate from "./pages/PatientLate";
import EidWarning from "./pages/EidWarning";
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
            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/update-phone" element={<UpdatePhone />} />
            <Route path="/we-call-you-soon" element={<WeCallYouSoon />} />
            
            {/* Placeholder routes for remaining screens - to be implemented */}
            <Route path="/manual-decade" element={<ManualDecade />} />
            <Route path="/manual-year" element={<ManualYear />} />
            <Route path="/manual-month" element={<ManualMonth />} />
            <Route path="/manual-day" element={<ManualDay />} />
            <Route path="/appointment-different-location" element={<AppointmentDifferentLocation />} />
            <Route path="/sorry-delay" element={<SorryDelay />} />
            <Route path="/patient-late" element={<PatientLate />} />
            <Route path="/eid-warning" element={<EidWarning />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </InternationalizationProvider>
  </QueryClientProvider>
);

export default App;
