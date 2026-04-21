import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import DSA from "./pages/DSA";
import Mentors from "./pages/Mentors";
import Chat from "./pages/Chat";
import Docs from "./pages/Docs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/docs" element={<Docs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
