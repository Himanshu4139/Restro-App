import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LogOut = ({setShowModel, setChange}) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-amber-500 mb-4">Confirm Logout</h2>
        <p className="text-amber-500 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
            
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={()=>{
                setShowModel(false);
                navigate('/admin');
            }}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            onClick={() => {
                navigate('/');
                removeCookie('token', { path: '/' });
            }
        }
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
