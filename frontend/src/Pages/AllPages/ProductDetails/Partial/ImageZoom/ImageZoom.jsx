import { useState } from "react";
import './ImageZoom.css'; // Import the CSS file

const ImageZoom = ({image}) => {
  const [zoom, setZoom] = useState({
    zoomX: '0%',
    zoomY: '0%',
  });

  const handleMouseMove = (event) => {
    const { offsetX, offsetY, target } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const pointer = {
      x: (offsetX * 100) / offsetWidth,
      y: (offsetY * 100) / offsetHeight,
    };

    setZoom({
      zoomX: `${pointer.x}%`,
      zoomY: `${pointer.y}%`,
    });
  };

  const handleMouseOut = () => {
    setZoom({
      zoomX: '0%',
      zoomY: '0%',
    });
  };

  return (
    <div
      id="imageZoom"
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <img className="h-full w-full object-contain" src={image} alt="Zoomable" />
      <div 
        className="zoomed-image object-contain w-full h-full"
        style={{
            backgroundColor: "#fff",
          backgroundImage: `url(${image})`,
          backgroundPosition: `${zoom.zoomX} ${zoom.zoomY}`,
        }}
      />
    </div>
  );
};

export default ImageZoom;