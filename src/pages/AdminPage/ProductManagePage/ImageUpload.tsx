import React, { useRef } from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from 'react-toastify';

interface ImageUploadProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  value: File | null;
}

const ImageUpload = ({ setImage, value }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxFileSizeInBytes = 1000 * 1024; 
  
    if (!e.target.files) {
      return;
    }
  
    const selectedFile = e.target.files[0];
  
    if (selectedFile.size > maxFileSizeInBytes) {
      toast.error('파일 크기는 1000KB를 초과할 수 없습니다.');
      e.target.value = ''; // 파일 선택을 취소합니다.
      return;
    }
  
    setImage(selectedFile);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300">
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <MdCloudUpload size={50} onClick={handleButtonClick} />
      {value && (
          <img
            className='absolute inset-0 object-cover w-full h-full'
            src={URL.createObjectURL(value)}
            alt=""
          />
        
      )}
    </div>
  );
};

export default ImageUpload;
