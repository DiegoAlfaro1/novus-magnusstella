import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import EmailsPage from './pages/EmailsPage';
import UsersPage from './pages/UsersPage';
import HelpPage from './pages/HelpPage';
import ErrorPage from './pages/ErrorPage';
import SurveyResultPage from './pages/SurveyResultPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/users/login" replace />} />
          <Route path="/users/login" element={<LoginPage />} />
          
          <Route path="/graphics/dashboard/:marca" element={<DashboardPage />} />
          <Route path="/graphics/dashboard/:marca/:categoria" element={<DashboardPage />} />
          
          <Route path="/reviews/resenas/:marca" element={<ReviewsPage />} />
          <Route path="/reviews/resenas/:marca/:categoria" element={<ReviewsPage />} />
          <Route path="/reviews/resenas_completas/:marca/:id" element={<ReviewDetailPage />} />
          
          <Route path="/emails/correos/:marca" element={<EmailsPage />} />
          
          <Route path="/usuarios/:page/:marca" element={<UsersPage />} />
          
          <Route path="/ayuda/:marca" element={<HelpPage />} />
          
          <Route path="/encuestaExitosa" element={<SurveyResultPage type="exitosa" />} />
          <Route path="/encuestaRepetida" element={<SurveyResultPage type="repetida" />} />
          
          <Route path="/403" element={<ErrorPage code="403" />} />
          <Route path="*" element={<ErrorPage code="404" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
