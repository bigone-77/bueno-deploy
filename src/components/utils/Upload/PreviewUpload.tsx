interface PreviewUploadProps {
    imageSrc: File | null;
}

const PreviewUpload = ({
    imageSrc
}: PreviewUploadProps) => {
    return (
        <div>
            {imageSrc && <img src={URL.createObjectURL(imageSrc)} alt="" className="object-cover h-32 w-28"/>}
        </div>
    )
}

export default PreviewUpload