import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import { LanguageProvider } from "@/lib/i18n";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </LanguageProvider>
  );
}
