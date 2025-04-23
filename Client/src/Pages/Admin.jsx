import React, { useEffect } from 'react'
// import Header from '../Components/Header'
// import Footer from '../Components/Footer'
// import Option from '../Components/Option'
// import Card from '../Components/Card'
// import Model from '../Components/Model'
// import Createmenu from './Createmenu'
// import Qr_code from './Qr_code'
import { useState } from 'react'
// import Createcategory from './Createcategory'
import Admin1 from './Admin1'
import Admin2 from './Admin2'


const Admin = ({setMinus, minus}) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 352);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen ?  < Admin2 setMinus={setMinus} minus={minus} /> : <Admin1 setMinus={setMinus} minus={minus} />;
}

export default Admin