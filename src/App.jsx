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
    setUserData({
      name: data.name,
      profession: data.profession,
      style: data.style,
    });

    try {
      // Create a descriptive prompt based on user input
      const prompt = `Create a high-quality, 8k resolution, cinematic LinkedIn header banner. Theme: ${data.style}. Profession: ${data.profession}. Style: ${data.style}. 
      Details: extremely detailed, photorealistic, Unreal Engine 5 render, dramatic lighting, professional atmosphere, elegant, minimalist but rich textures, abstract geometric shapes or modern workspace background. 
      Aspect Ratio: Wide 3:1. 
      Constraints: No text, no words, clean background, high contrast, sharp focus, award-winning composition.`;

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

      const errorMessage = err.message || "";
      const retryCount = parseInt(
        localStorage.getItem("generationRetry") || "0"
      );

      if (
        (errorMessage.includes("401") ||
          errorMessage.includes("Unauthenticated") ||
          true) &&
        retryCount < 3
      ) {
        localStorage.setItem("generationRetry", (retryCount + 1).toString());
        setError(
          `Security check or connection issue. Refreshing page in 3 seconds (Attempt ${
            retryCount + 1
          }/3)...`
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        localStorage.setItem("generationRetry", "0");
        setError(
          "Failed to generate banners. Please try again. If the issue persists, check your connection or try a different browser."
        );
      }
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

        <BannerDisplay
          banners={banners}
          userData={userData}
          onRegenerate={() => handleGenerate(userData)}
          isGenerating={isGenerating}
        />
      </main>

      <footer className="footer">
        <p>built by ELZIPO</p>
      </footer>
    </div>
  );
}

export default App;
