// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "@/contexts/AuthContext";
// import { Layout } from "@/components/layout/Layout";

// import { Login } from "@/pages/auth/Login";
// import { Signup } from "@/pages/auth/Signup";
// import { ForgotPassword } from "@/pages/auth/ForgotPassword";
// import { VerifyAccount } from "@/pages/auth/VerifyAccount";

// import { Dashboard } from "@/pages/Dashboard";
// import { Courses } from "@/pages/Courses";
// import { Grades } from "@/pages/Grades";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth();
//   return user ? <Layout>{children}</Layout> : <Navigate to="/auth/login" />;
// };

// const PublicRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth();
//   return !user ? <>{children}</> : <Navigate to="/dashboard" />;
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" />} />

//       <Route path="/auth/login" element={<PublicRoute><Login /></PublicRoute>} />
//       <Route path="/auth/signup" element={<PublicRoute><Signup /></PublicRoute>} />
//       <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
//       <Route path="/auth/verify-account" element={<PublicRoute><VerifyAccount /></PublicRoute>} />

//       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//       <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
//       <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
//       <Route path="/calendar" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Calendar</h1><p className="text-muted-foreground">Calendar page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/account" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Account Book</h1><p className="text-muted-foreground">Account book page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/progress" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Progress</h1><p className="text-muted-foreground">Progress tracking page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/lectures" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Lecture Schedule</h1><p className="text-muted-foreground">Lecture schedule page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/mail" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Mail</h1><p className="text-muted-foreground">Mail system coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/notes" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Notes</h1><p className="text-muted-foreground">Notes system coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/services" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Student Services</h1><p className="text-muted-foreground">Student services page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/course-selection" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Course Selection</h1><p className="text-muted-foreground">Course selection page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/contact" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Contact Us</h1><p className="text-muted-foreground">Contact page coming soon...</p></div></ProtectedRoute>} />
//       <Route path="/help" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Help</h1><p className="text-muted-foreground">Help center coming soon...</p></div></ProtectedRoute>} />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <AppRoutes />
//         </BrowserRouter>
//       </TooltipProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppRoutes } from "@/config/protectedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;