// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PracticeProvider } from "@/contexts/PracticeContext";
import { LearningProvider } from "@/contexts/LearningContext";
import { useAuth } from "@/contexts/AuthContext";
import { User as FirebaseUser } from 'firebase/auth';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Learning from "./pages/Learning";
import CourseDetail from "./pages/CourseDetail";
import ModuleDetail from "./pages/ModuleDetail";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Watchlist from "./pages/watchlist";
import Backtesting from "./pages/Backtesting";
import ShowHistorical from "./pages/ShowHistorical";
import Charting from "./pages/Charting";
import FinanceLearningPath from "./components/learning/FinanceLearningPath";
import CurriculumPathway from "./components/learning/CurriculumPathway";
import PracticePage from "./pages/Practice";
import LearningLayout from "./components/learning/LearningLayout";
import WatchlistLayout from "./components/trading/WatchlistLayout";
import Signin from "../src/pages/Signin"; 
import Signup from "../src/pages/Signup";

const queryClient = new QueryClient();

// Wrapper component to access auth context for PracticeProvider
const PracticePageWithProvider = () => {
  const { user } = useAuth();
  return (
    // Cast the user to FirebaseUser | null.
    // Ideally, ensure AuthContext provides user in the expected type,
    // or PracticeContext adapts to the type from AuthContext.
    <PracticeProvider user={user as FirebaseUser | null}>
      <PracticePage />
    </PracticeProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/show-historical" element={<ShowHistorical />} />
            <Route path="/charting" element={<Charting />} />
            
            {/* Wrap watchlist route with WatchlistLayout */}
            <Route element={<WatchlistLayout />}>
              <Route path="/watchlist" element={<Watchlist />} />
            </Route>
            
            <Route path="/practice" element={<PracticePageWithProvider />} />
            <Route path="/backtesting" element={<Backtesting />} />
            
            {/* Learning routes wrapped with LearningLayout */}
            <Route element={<LearningLayout />}>
              <Route path="/learning" element={<Learning />} />
              <Route path="/learning/path" element={<FinanceLearningPath />} />
              <Route path="/learning/path/:pathId" element={<CourseDetail />} />
              <Route path="/learning/course" element={<CurriculumPathway />} />
              <Route path="/learning/course/:courseId" element={<CourseDetail />} />
              <Route path="/learning/course/:courseId/:moduleId" element={<ModuleDetail />} />
              <Route path="/learning/course/:courseId/:moduleId/quiz/:quizId" element={<Quiz />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
