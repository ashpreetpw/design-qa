import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CohortPickerPage from "./pages/CohortPickerPage";

/**
 * App — top-level router.
 *  /          — homepage (course listing, trending, all courses)
 *  /cohorts   — exam-goal picker, fed by the local Express API on :4000
 *  *          — anything else falls back to home
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cohorts" element={<CohortPickerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
