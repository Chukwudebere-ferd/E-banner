import React from "react";

const BannerDisplay = ({ banners, userData, onRegenerate, isGenerating }) => {
  const { name, profession } = userData;
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleDownload = async (bannerSrc, index) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.src = bannerSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);


      const fontSizeName = canvas.width * 0.05;
      const fontSizeProf = canvas.width * 0.03; 

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Name
      ctx.font = `bold ${fontSizeName}px Inter, sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.fillText(name, centerX, centerY - fontSizeName * 0.5);

      ctx.font = `${fontSizeProf}px Inter, sans-serif`;
      ctx.shadowBlur = 4; 

      ctx.fillText(
        profession.toUpperCase(),
        centerX,
        centerY + fontSizeName * 0.8
      );

      // 3. Convert to blob/data URL and download
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `portfolio-banner-${userData.name
        .replace(/\s+/g, "-")
        .toLowerCase()}-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to create download image. Please try again.");
    }
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="banner-display-container">
      {/* Modal for Full View */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img src={selectedImage} alt="Full View Banner" />
          </div>
        </div>
      )}

      <div className="display-header">
        <h3>Select Your Banner</h3>
        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="regenerate-btn"
        >
          {isGenerating ? "Regenerating..." : "Regenerate Images"}
        </button>
      </div>

      <div className="banners-grid">
        {banners.map((bannerSrc, index) => (
          <div key={index} className="banner-card">
            <div
              className="banner-preview"
              onClick={() => setSelectedImage(bannerSrc)}
              title="Click to view full size"
            >
              <img src={bannerSrc} alt={`Generated Banner ${index + 1}`} />
              <div className="banner-overlay">
                <h2 className="overlay-name">{name}</h2>
                <p className="overlay-profession">{profession}</p>
              </div>
            </div>
            <button
              className="download-btn"
              onClick={() => handleDownload(bannerSrc, index)}
            >
              Download Banner {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerDisplay;
