import React, { useEffect, useState } from 'react';
import User_card from '../Components/User_card';
import User_footer from '../Components/User_footer';
import User_header from '../Components/User_header';
import { useParams } from 'react-router-dom';
import User_option from '../Components/User_option';

const User = () => {
  const { id } = useParams();
  const [category, setSelectedCategory] = useState('All');


  return (
    <>
      <User_header id={id} />
      <div className="grid grid-cols-4 gap-4 flex-wrap border-b-2 border-gray-500 rounded-md">
        <div className='flex  flex-col justify-center items-center mx-2 my-2' onClick={() => setSelectedCategory('All')}>
          <img src="https://media.istockphoto.com/id/1625128179/photo/composition-of-well-balanced-food-for-healthy-eating.jpg?s=612x612&w=is&k=20&c=FfjR9w3_gP7hKgj__1KcOkeT41b-D4q7zpHAOfFLeng=" alt="All" className='h-14 w-14 bg-cover rounded-full' />
          <p>All</p>
        </div>
        <User_option id={id} setSelectedCategory={setSelectedCategory} />
      </div>
      <div className="w-full flex flex-col flex-wrap pb-14 min-h-screen">
        <User_card id={id} category={category} />
      </div>
      <User_footer id={id} />
    </>
  );
};

export default User;