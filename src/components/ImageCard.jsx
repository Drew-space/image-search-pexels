import { useState } from "react";
import ImageModal from "./ImageModel";
import { useEffect } from "react";

const ImageCard = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const prelaod = new Image();
    prelaod.src = image.src.large;
  }, [image.src.large]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewOriginal = () => {
    window.open(image.src.original, "_blank");
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform "
      >
        <img
          src={image.src.medium}
          alt={image.alt || "Pexels image"}
          className="w-full h-48 0bject-cover"
        />
      </div>
      <ImageModal
        image={image}
        onClose={handleCloseModal}
        onViewOriginal={handleViewOriginal}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default ImageCard;
