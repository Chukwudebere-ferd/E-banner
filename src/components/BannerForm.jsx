import React, { useState } from "react";

const BannerForm = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    style: "Modern",
  });

  const styles = {
    Modern:
      "modern, clean design, soft gradients, balanced composition, contemporary lighting",

    Minimalist:
      "ultra-minimalist, lots of negative space, soft neutral colors, subtle gradients, calm atmosphere",

    "Tech/Futuristic":
      "futuristic tech aesthetic, digital glow, dark mode tones, neon accents, high-tech environment",

    Abstract:
      "abstract geometric shapes, artistic composition, layered depth, creative lighting, modern art style",

    Professional:
      "corporate, executive, polished look, neutral color palette, refined lighting, premium feel",

    Creative:
      "bold creative direction, vibrant accents, artistic lighting, expressive composition, modern design",
  };

  // Load saved data on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem("bannerFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
    localStorage.setItem("bannerFormData", JSON.stringify(newFormData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittableData = {
      ...formData,
      styleDescription: styles[formData.style] || formData.style,
    };
    onGenerate(submittableData);
  };

  return (
    <div className="banner-form-container">
      <h2>Create Your Portfolio Banner</h2>
      <form onSubmit={handleSubmit} className="banner-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. El zipo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="style">Banner Style</label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
          >
            {Object.keys(styles).map((styleName) => (
              <option key={styleName} value={styleName}>
                {styleName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isGenerating} className="generate-btn">
          {isGenerating ? "Generating..." : "Generate Banners"}
        </button>
      </form>
    </div>
  );
};

export default BannerForm;
