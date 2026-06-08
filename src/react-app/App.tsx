// src/react-app/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login"; // This unified file covers both screens now!
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import BlogPostPage from "./blog/[slug]/page";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          
          {/* Both paths map directly into your newly configured unified file */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Login />} /> 
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blog" element={<BlogPostPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
