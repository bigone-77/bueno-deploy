import { toast } from 'react-toastify';

interface UploadInputProps {
    setValue: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadInput = ({
    setValue
}: UploadInputProps) => {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxFileSizeInBytes = 1000 * 1024;
    
        if (!e.target.files || e.target.files.length === 0) {
            setValue(null);
            return;
        }
    
        const selectedFile = e.target.files[0];
    
        if (selectedFile.size > maxFileSizeInBytes) {
            toast.error('파일 크기는 1000KB를 초과할 수 없습니다.');
            e.target.value = ''; // 파일 선택을 취소합니다.
            setValue(null);
            return;
        }
    
        setValue(selectedFile);
    };
    
    return (
        <input
            type="file"
            onChange={handleFileUpload}
        />
    );
    
}

export default UploadInput