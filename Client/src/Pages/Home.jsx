import React, { useState } from 'react';
import { MdQrCodeScanner } from 'react-icons/md';
import QrReader from 'react-qr-reader';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Model from '../Components/Model';

const Home = () => {
  const [showModel, setShowModel] = useState(false);
  const [showModel1, setShowModel1] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleClick = () => setShowModel(true);
  const handleClick1 = () => setShowModel1(true);
  const handleClose = () => setShowModel(false);
  const handleClose1 = () => setShowModel1(false);

  const model = (
    <Model onClose={handleClose}>
      <Login setShowModel={setShowModel} setShowModel1={setShowModel1} />
    </Model>
  );

  const model1 = (
    <Model onClose={handleClose1}>
      <Signup setShowModel={setShowModel1} setShowModel1={setShowModel} />
    </Model>
  );

  const scan = () => {
    setShowScanner(true);
  };

  const handleScan = (result) => {
    if (result) {
      setShowScanner(false);
      navigate(`/user/${result}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://img.lovepik.com/photo/20211122/medium/lovepik-pizza-picture_500753800.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex flex-col items-center"
    >
      <nav className="w-full h-16 flex items-center justify-between shadow-md bg-black bg-opacity-0">
        <h2 className="rounded-3xl font-semibold text-4xl text-white pl-3">Restro</h2>
        <button
          className="cursor-pointer px-8 py-2 mx-4 bg-green-600 text-white rounded-3xl font-semibold text-lg"
          onClick={handleClick}
        >
          Login
        </button>
      </nav>

      <div className="flex flex-col justify-center items-center w-full h-full text-center">
        <div className="h-96 flex flex-col items-center justify-center gap-10">
          <h2 className="flex flex-col items-center gap-3 text-3xl font-bold mb-4">
            <p className="text-black text-6xl">Create Your</p>
            <span className="text-gray-100 text-5xl">Own Shop</span>
          </h2>
          <button
            className="cursor-pointer px-8 py-3 bg-green-600 text-white rounded-lg font-semibold text-[25px]"
            onClick={handleClick1}
          >
            Click here to Create
          </button>
        </div>
        
        

        <footer className="flex flex-row w-4/5 h-16 fixed bottom-3 items-center justify-around bg-green-600 m-3 rounded-xl" onClick={scan}>
          <MdQrCodeScanner fontSize="1.95rem" />
          <button className="text-[30px] font-medium pb-1 pr-0">
            Scan Now
          </button>
        </footer>
      </div>

      {showScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full max-w-xl mx-auto bg-black">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              facingMode={"environment"}
              style={{ width: '100%', marginTop: '20%' }}
            />
            <button
              className="absolute top-0 right-0 m-4 p-2 bg-red-500 text-white rounded-full"
              onClick={() => setShowScanner(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showModel1 && model1}
      {showModel && model}
    </div>
  );
};

export default Home;
