import { Trash, Upload, User } from "lucide-react";
import React, { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  /**
   * useRef React’te genellikle DOM elemanlarına
   * doğrudan erişmek veya yeniden render tetiklemeden
   * değer saklamak için kullanılır.
   */
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative w-24 h-24 flex items-center justify-center bg-purple-100 rounded-full shadow-md">
          <User className="text-purple-500" size={40} />

          <button
            type="button"
            onClick={onChooseFile}
            className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center 
              bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition"
          >
            <Upload size={18} />
          </button>
        </div>
      ) : (
        <div className="relative w-24 h-24">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-md"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center 
              bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition"
          >
            <Trash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
