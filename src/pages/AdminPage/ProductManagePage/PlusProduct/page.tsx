import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Container from "../../../../components/utils/Container";
import ImageUpload from "../ImageUpload";
import { Categories } from "../../../../components/MainNav/CategoryItems";
import CategoryBox from "../CategoryBox";
import Input from "../../../../components/utils/Input";
import Button from "../../../../components/utils/Button";

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../api/axios';



const PlusProductPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            info: '',
            price: 0,
            category_name: '',
            stock: 0,
            weight: 0,
            weightUnit: '',
        }
    });
    const category_name = watch('category_name');

    const [image, setImage] = useState<any>(null);
    console.log(image);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true);

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));
        if (image){
            formData.append('image', image);
        } else {
            toast.error("상품에 사진이 없습니다.")
        }
        
    
        axios.post('/admin/product/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data);
            toast.success("상품 등록이 완료되었습니다");
            navigate('/admin/product');
        })
        .catch(error => {
            console.log(error);
            toast.error("상품 등록에 실패하였습니다");
        });

        setIsLoading(false);
    }
    

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value);
    }
    
    return (
        <Container>
            <div className='max-w-screen-lg mx-auto my-10'>
                <h1 className="mb-4 text-6xl font-bold">상품 등록</h1>
                <form className="flex flex-col justify-center gap-10" onSubmit={handleSubmit(onSubmit)}>
                    <ImageUpload 
                        value={image}
                        setImage={setImage}
                    />
                    
                    <div 
                        className='
                        grid 
                        grid-cols-1
                        md:grid-cols-2
                        gap-3
                        max-h-[50vh]
                        overflow-y-auto 
                        '
                    >
                        {Categories.map((c) => (    
                            <CategoryBox 
                                key={c.id}
                                id={c.id}
                                path={c.path}
                                icon={c.icon}
                                onClick={(category: string) => setCustomValue('category_name', category)}
                                selected={category_name === c.path.toUpperCase()} 
                            />
                        ))}
                    </div>
                    
                    <Input 
                        id="name"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="info"
                        label='Description'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="price"
                        label="Price"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="stock"
                        label="Stock"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="weight"
                        label="Weight"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="weightUnit"
                        label="WeightUnit"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    

                    <Button label="상품 생성하기" />
                </form>
                
                <DevTool control={control} />
            </div>
        </Container>
    )
}

export default PlusProductPage