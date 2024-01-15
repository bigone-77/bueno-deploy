import axios from 'axios';
import { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FindPwProps {
  id: string;
}

const FindPw = ({
  id
}: FindPwProps) => {
  const [email, setEmail] = useState("");
  const [showAuthNum, setShowAuthNum] = useState(false);

  const [authNum, setAuthNum] = useState("");
  const [enteredAuthNum, setEnteredAuthNum] = useState("");
  const navigate = useNavigate();
  
  const postHandler = async() => {
    if (email === id) {
      await axios.post('/email/findPw',email, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        setAuthNum(response.data);  // 인증번호 프론트에서 저장
        setShowAuthNum(true);
        toast.success("5분 안에 인증번호를 입력해주세요")
      })
      .catch(error => {
        toast.error(error.message);
        console.log(error);
      })
    } else {
      toast.error("입력한 회원정보와 일치하는 회원이 없습니다");
    }
  }

  const checkHandler = () => {
    if (enteredAuthNum === authNum) {
      navigate('/auth/newPw', {
        state: {
          email: id,
        }
      });
    } else {
      toast.error("인증번호가 맞지 않습니다");
    }
  }

  return (
    <section className='mt-10'>
      <span className='flex items-center'>
        <IoCheckmark size={15} color="blue" />
        <p className='text-sm font-bold'>비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</p>
      </span>
      <span className='flex items-center mt-2'>
        <IoCheckmark size={15} color="blue" />
        <p className='text-sm font-bold'>본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</p>
      </span>
      <div className='mt-10'>
        <div className='flex items-center justify-center gap-2'>
          <p className='w-40 border-r border-r-blue-300'>아이디</p>
          <span>
            <input 
              type="email" 
              className='px-4 py-2 border rounded-md '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='text-sm text-gray-200'>부에노미트에 가입된 계정 이메일을 정확히 기입해주시길 바랍니다.</p>
          </span>
          <button 
            className={`w-40 text-white ${showAuthNum ? 'bg-slate-500' : 'bg-blue-500'}`}
            onClick={postHandler}
          >
            인증번호 받기
          </button>
        </div>
        <hr className='my-10'/>
        {showAuthNum && <div className='flex items-center justify-center gap-2'>
          <p className='w-40 border-r border-r-blue-300'>인증번호</p>
          <span>
            <input 
              className='px-4 py-2 border rounded-md '
              value={enteredAuthNum}
              onChange={(e) => setEnteredAuthNum(e.target.value)}
            />
          </span>
          <button 
            className='w-40 text-white bg-blue-500'
            onClick={checkHandler}
          >
            인증번호 확인
          </button>
        </div>}
      </div>
    </section>
  )
}

export default FindPw