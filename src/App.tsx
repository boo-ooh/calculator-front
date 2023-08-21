import "./App.css";
import Login from "./components/login/login";
import { MainApp } from "./components/mainApp/mainApp";
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "./components/requireAuth/requireAuth";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <MainApp />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
