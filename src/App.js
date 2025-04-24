// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/Upload";
import Gallery from "./pages/Gallery";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UploadPage />} />
          <Route path="/gallery/:username" element={<Gallery />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
