import React from 'react';

interface HelpSectionProps {
  title: string;
  content: string | React.ReactNode;
  imageUrl?: string;
}

const PLACEHOLDER_IMAGE_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text fill="%23999" font-size="18" x="50%" y="50%" text-anchor="middle" dy=".3em">Imagen pendiente</text></svg>';

const HelpSection: React.FC<HelpSectionProps> = ({ title, content, imageUrl }) => {
  return (
    <div className="help-section">
      <h2>{title}</h2>
      {imageUrl && (
        <div className="help-image-placeholder">
          <img src={imageUrl} alt={title} onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_SVG;
          }} />
        </div>
      )}
      <div className="help-content">
        {typeof content === 'string' ? <p>{content}</p> : content}
      </div>
    </div>
  );
};

export default HelpSection;
