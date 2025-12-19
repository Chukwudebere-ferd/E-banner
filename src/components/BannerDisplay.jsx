import React from "react";

const BannerDisplay = ({ banners, userData }) => {
  const { name, profession } = userData;

  const handleDownload = async (bannerSrc, index) => {
    try {
      // Create an image element to load the source
      const img = new Image();
      img.crossOrigin = "anonymous"; // Needed if images are from external CORS-enabled domain
      img.src = bannerSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Create canvas
      const canvas = document.createElement("canvas");
      // Set canvas size to match image natural size
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");

      // 1. Draw the background image
      ctx.drawImage(img, 0, 0);

      // 2. Add Overlay (Darken background slightly for text readability if needed, or just text)
      // Let's add a slight subtle gradient at the center/bottom or user preference.
      // For now, mimicking the CSS overlay which usually has a shadow or semi-transparent bg?
      // actually the CSS didn't have a background, just text shadow. Let's do that.

      // Configure Text Styles
      // Scale font size based on image width to maintain ratio
      const fontSizeName = canvas.width * 0.05; // 5% of width
      const fontSizeProf = canvas.width * 0.03; // 3% of width

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

      // Profession
      ctx.font = `${fontSizeProf}px Inter, sans-serif`;
      ctx.shadowBlur = 4; // lighter shadow for smaller text

      // Add slightly more spacing
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
      <h3>Select Your Banner</h3>
      <div className="banners-grid">
        {banners.map((bannerSrc, index) => (
          <div key={index} className="banner-card">
            <div className="banner-preview">
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
