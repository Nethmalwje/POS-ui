import React from "react";
import ImageUpload from "./ImageUpload";

function UserImage({ onImageChange, reset, image }) {
  return (
    <div>
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        User Image
      </label>
      <ImageUpload onImageChange={onImageChange} reset={reset} image={image} />
    </div>
  );
}

export default UserImage;
