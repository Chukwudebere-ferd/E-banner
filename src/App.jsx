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
      const prompt = `A high quality, professional portfolio banner background for a ${data.profession}. Style: ${data.style}. Abstract, minimalist, 4k resolution, no text, wide aspect ratio 3:1.`;

      console.log("Generating with prompt:", prompt);

      // Generate 3 images
      // Verify if puter is available (from global script)
      if (typeof puter === "undefined") {
        throw new Error(
          "Puter.js library not loaded. Please refresh or check connection."
        );
      }

      const promises = [1, 2, 3].map(() =>
        puter.ai.txt2img(prompt).then((imageElement) => imageElement.src)
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
