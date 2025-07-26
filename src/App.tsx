import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReportsPage from "./pages/reportsPage";
import ProtectedRoute from "./shared/lib/ProtectedRoute";
import LoginPage from "./pages/loginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
