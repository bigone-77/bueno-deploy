import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';


interface InputProps {
    id: string;
    label?: string;
    type?: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    errors: FieldErrors
    message?: string;
    placeholder?: string;
}

const Input:React.FC<InputProps> = ({
    id, 
    label,
    type,
    disabled,
    register,
    required,
    pattern,
    minLength,
    errors,
    message,
    placeholder
}) => {
    const hasError = errors[id] !== undefined;
    return (
        <div className='relative w-full'>
            {hasError && <p className='absolute text-sm font-semibold text-rose-500 -bottom-5'>{message}</p>}
            <input 
                id={id}
                disabled={disabled}
                {...register(id, { 
                    required, 
                    pattern,
                    minLength
                })}
                placeholder={placeholder}
                type={type}
                className={`
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-white
                    rounded-md
                    border-2
                    outline-none
                    transition
                    disabled: opacity-70
                    ${errors[id] ? 'border-rose-500' : 'border-black'}
                    ${errors[id] ? 'focus: border-rose-500' : 'focus: border-black'}
                `}
            />
            <label 
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    left-4
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                `}
                
            >
                {label}
            </label>
        </div>
    )
}

export default Input