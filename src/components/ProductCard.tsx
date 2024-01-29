import CartButton from "./ShoppingCart/CartButton";
import { useNavigate } from "react-router-dom";
import HeartButton from "./utils/HeartButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { ProductProps } from '../types/ProductProps';

const ProductCard = ({
    id,
    name,
    price,
    image,
}: ProductProps) => {

    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.currentUser.id);

    const handleClick = () => {
        navigate(`/products/${id}`);
    }

    return (
        <div className="relative">
            <div className="absolute -right-4 -top-2">
                <HeartButton 
                    userId={userId}
                    productId={id}
                />
            </div>
            <div className="cursor-pointer" onClick={handleClick} >
                <div className=" border rounded-lg w-[286px] h-[320px] bg-gray-200">
                    <img src={image} alt="bueno-img" className="px-2 pt-12 object-fit" />
                </div>
                <span className="flex flex-col items-start justify-center mt-4">
                    <p className="text-2xl font-bold">{name}</p>
                    <p className="font-semibold text-zinc-700">{`${price}원`}</p>
                </span>
            </div>
            <div className="absolute bottom-0 right-0">
                <CartButton 
                    productId={id}
                />
            </div>
        </div>
    )
}

export default ProductCard