import { useState } from "react";
import "./App.css";
import BannerForm from "./components/BannerForm";
import BannerDisplay from "./components/BannerDisplay";

function App() {
  const [banners, setBanners] = useState([]);
  const [userData, setUserData] = useState({ name: "", profession: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (data) => {
    setIsGenerating(true);
    setBanners([]);
    setError(null);
    setUserData({ name: data.name, profession: data.profession });

    try {
      // Create a descriptive prompt based on user input
      const prompt = `Start with a professional LinkedIn header style. Theme: ${data.style}. Profession: ${data.profession}. High resolution, 4k, cinematic lighting, elegant, minimalist design, abstract geometric shapes or professional workspace background. Wide aspect ratio 3:1. No text, no words, clean background.`;

      console.log("Generating with prompt:", prompt);

      // Generate 3 images
      // Verify if puter is available (from global script)
      if (typeof puter === "undefined") {
        throw new Error(
          "Puter.js library not loaded. Please refresh or check connection."
        );
      }

      const promises = [1, 2, 3].map(() =>
        puter.ai
          .txt2img(prompt, { model: "black-forest-labs/FLUX.1-schnell" })
          .then((imageElement) => imageElement.src)
      );

      const generatedBanners = await Promise.all(promises);
      setBanners(generatedBanners);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        "Failed to generate banners. Please try again or check your internet connection."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dynamic Portfolio Banner Generator</h1>
        <p>Create unique, AI-powered headers for your portfolio in seconds.</p>
      </header>

      <main>
        <BannerForm onGenerate={handleGenerate} isGenerating={isGenerating} />

        {error && <div className="error-message">{error}</div>}

        <BannerDisplay banners={banners} userData={userData} />
      </main>

      <footer className="footer">
        <p>built by ELZIPO</p>
      </footer>
    </div>
  );
}

export default App;
