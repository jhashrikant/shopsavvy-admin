"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

const ImageUpload = ({ value, disabled, onChange, onRemove }) => {

    console.log(value)

    const onUpload = (result) => {
        onChange(result.info.secure_url);
    };

    return (
        <div className=''>
            <div className="mb-4 flex items-center gap-4">
                {value && value?.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="wwmngdqy">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <>
                            <label className='mb-2'>Product Image</label>
                            <Button
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Upload an Image
                            </Button>
                        </>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
export default ImageUpload;
