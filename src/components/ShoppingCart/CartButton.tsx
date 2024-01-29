import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import CartModal from './CartModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { toast } from 'react-toastify';

export interface CartButtonProps {
    productId?: number
}

const CartButton:React.FC<CartButtonProps> = ({ productId }) => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);
    
    const [showModal, setShowModal] = useState(false);

    const clickHandler = () => {
        if (memberId) {
            setShowModal(true); 
        } else {
            toast.error("로그인이 필요한 서비스입니다.");
        }
    }

    return (
        <div 
            className='z-10 flex items-center justify-center w-16 h-16 transition border-2 border-black rounded-full cursor-pointer hover:bg-black'
            // onClick={() => setShowModal(true)}
            onClick={clickHandler}
        >
            <AiOutlineShoppingCart 
                size={40}
                className='hover:text-white'
            />
            {showModal && 
                <CartModal 
                    setShowModal={setShowModal} 
                    productId={productId}
                />
            }
        </div>
    )
}

export default CartButton