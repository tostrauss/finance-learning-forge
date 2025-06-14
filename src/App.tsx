// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PracticeProvider } from "@/contexts/PracticeContext";
import { LearningProvider } from "@/contexts/LearningContext"; // Changed import path
import { useAuth } from "@/contexts/AuthContext";
import { User as FirebaseUser } from 'firebase/auth'; // Import Firebase User type
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Learning from "./pages/Learning";
import CourseDetail from "./pages/CourseDetail";
import ModuleDetail from "./pages/ModuleDetail";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Watchlist from "./pages/watchlist";
import Backtesting from "./pages/Backtesting";
import FinanceLearningPath from "./components/learning/FinanceLearningPath";
import CurriculumPathway from "./components/learning/CurriculumPathway";
import PracticePage from "./pages/Practice";
import LearningLayout from "./components/learning/LearningLayout";
import WatchlistLayout from "./components/trading/WatchlistLayout";
import Signin from "./pages/Signin"; 
import Signup from "./pages/Signup"; // Changed to default import if Signup.tsx uses default export

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
        {/* AuthProvider must wrap all Route consumers */}
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />            {/* Wrap watchlist route with WatchlistLayout */}
            <Route element={<WatchlistLayout />}>
              <Route path="/watchlist" element={<Watchlist />} />
            </Route>            <Route path="/practice" element={<PracticePageWithProvider />} />
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
