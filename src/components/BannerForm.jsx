import React, { useState } from "react";

const BannerForm = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    style: "Modern",
  });

  const styles = [
    "Modern",
    "Minimalist",
    "Tech/Futuristic",
    "Abstract",
    "Professional",
    "Creative",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
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
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
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
