import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../../redux/slices/currentUserSlice";
import { getCookie, removeCookie } from '../useCookies';
import axios from '../../api/axios';
import { RootState } from '../../redux';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const refreshToken = getCookie("refreshToken");

    const logout = async () => {
        if (refreshToken) {
            const response = await axios.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    Authorization_refresh: `Bearer ${refreshToken}`,
                },
            });
            console.log(response);
            
        };
        dispatch(removeCurrentUser());
        localStorage.removeItem("accessToken");
        removeCookie('refreshToken', { path: "/"});
        navigate('/');
    };

    return { logout };
}