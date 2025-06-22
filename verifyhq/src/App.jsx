import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import EventReq from '../components/EventReq';
import ProtectedRoute from '../components/ProtectedRoute'; // ✅

function App() {
  return (
    <Router>
      <Routes>
        {/* ❌ Public Route */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<LoginForm />} />

        {/* ✅ Protected Route */}
        <Route
          path="/EventReq"
          element={
            <ProtectedRoute>
              <EventReq />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
