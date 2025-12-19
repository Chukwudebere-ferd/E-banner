import React, { useRef } from "react";

const BannerDisplay = ({ banners, userData }) => {
  const { name, profession } = userData;

  const handleDownload = (bannerSrc, index) => {
    const link = document.createElement("a");
    link.href = bannerSrc;
    link.download = `portfolio-banner-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
