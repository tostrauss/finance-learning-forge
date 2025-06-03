import { Outlet } from "react-router-dom";
import { LearningProvider } from "@/contexts/LearningContext";

const LearningLayout = () => {
  return (
    <LearningProvider>
      <Outlet />
    </LearningProvider>
  );
};

export default LearningLayout;
