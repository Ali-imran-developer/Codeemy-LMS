import { Dashboard } from "@/pages/Dashboard";
import { Courses } from "@/pages/Courses";
import { Grades } from "@/pages/Grades";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { VerifyAccount } from "@/pages/auth/VerifyAccount";
import NotFound from "@/pages/NotFound";
import { ComingSoon } from "@/pages/ComingSoon";

export const publicRoutes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signup", element: <Signup /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/verify-account", element: <VerifyAccount /> },
];

export const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/courses", element: <Courses /> },
  { path: "/grades", element: <Grades /> },
  { path: "/calendar", element: <ComingSoon title="Calendar" description="Calendar page coming soon..." /> },
  { path: "/account", element: <ComingSoon title="Account Book" description="Account book page coming soon..." /> },
  { path: "/progress", element: <ComingSoon title="Progress" description="Progress tracking coming soon..." /> },
  { path: "/lectures", element: <ComingSoon title="Lecture Schedule" description="Lecture schedule coming soon..." /> },
  { path: "/mail", element: <ComingSoon title="Mail" description="Mail system coming soon..." /> },
  { path: "/notes", element: <ComingSoon title="Notes" description="Notes system coming soon..." /> },
  { path: "/services", element: <ComingSoon title="Student Services" description="Student services coming soon..." /> },
  { path: "/course-selection", element: <ComingSoon title="Course Selection" description="Course selection coming soon..." /> },
  { path: "/contact", element: <ComingSoon title="Contact Us" description="Contact page coming soon..." /> },
  { path: "/help", element: <ComingSoon title="Help & Support" description="Help center coming soon..." /> },
];

export const fallbackRoute = { path: "*", element: <NotFound /> };