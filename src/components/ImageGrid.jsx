import React from "react";
import ImageCard from "./ImageCard";
import { ClipLoader } from "react-spinners";

const ImageGrid = ({ images, laoding }) => {
  if (laoding && (images.lenght === 0 || !images)) {
    return <ClipLoader />;
  }

  if ((!images || images.lenght === 0) && !laoding) {
    return <p>No images found. Try a differnet search term.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 ">
      {images.map((image) => (
        <ImageCard image={image} key={image.id} />
      ))}
      {laoding && (
        <div className="col-span-full flex justify-center items-center">
          <ClipLoader size={40} color={"#3498db"} />
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
