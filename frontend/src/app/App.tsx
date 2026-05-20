import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import { GuestRoute } from './components/GuestRoute'
import { PrivateRoute } from './components/PrivateRoute'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ProfilePage } from '../pages/ProfilePage'
import { TermsPage } from '../pages/TermsPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { CoursePage } from '../pages/CoursePage'
import { PaymentSuccessPage } from '../pages/PaymentSuccessPage'
import { VideoPage } from '../pages/VideoPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/course/video" element={<VideoPage />} />
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
