// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Learning from "./pages/Learning";
import CourseDetail from "./pages/CourseDetail";
import ModuleDetail from "./pages/ModuleDetail";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Watchlist from "./pages/watchlist";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import FinanceLearningPath from "./components/learning/FinanceLearningPath";
import CurriculumPathway from "./components/learning/CurriculumPathway";
import PracticePage from "./pages/Practice";
import ChartingPage from "./pages/Charting"; // Import the new Charting page

const queryClient = new QueryClient();

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
            <Route path="/signup" element={<Signup />} />            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/charting" element={<ChartingPage />} /> {/* Add route for Charting */}
            <Route path="/practice" element={<PracticePage />} />            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/path" element={<FinanceLearningPath />} />
            <Route path="/learning/path/:pathId" element={<CourseDetail />} />
            <Route path="/learning/course" element={<CurriculumPathway />} />
            <Route path="/learning/course/:courseId" element={<CourseDetail />} />
            <Route path="/learning/course/:courseId/:moduleId" element={<ModuleDetail />} />
            <Route
              path="/learning/course/:courseId/:moduleId/quiz/:quizId"
              element={<Quiz />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
