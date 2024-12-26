import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Option from '../Components/Option'
import Card from '../Components/Card'
import Model from '../Components/Model'
import Createmenu from './Createmenu'
import Qr_code from './Qr_code'
import { useState } from 'react'
import Createcategory from './Createcategory'


const Admin = ({setMinus, minus}) => {
    const [showModel, setShowModel] = useState(false);
    const [showModel1, setShowModel1] = useState(false);
    const [showModel2, setShowModel2] = useState(false);
    const [change, setChange] = useState(false);
    const [category, setSelectedCategory] = useState('All');

    const handleClose = () => {
        setShowModel(false);
    }
    const handleClose1 = () => {
        setShowModel1(false);
    }
    const handleClose2 = () => {
        setShowModel2(false);
    }
    useEffect(()=>{
        setMinus(true);
    },[])

    const model = <Model onClose={handleClose}>
        <Createmenu setShowModel={setShowModel} setChange={setChange} />
    </Model>
    const model1 = <Model onClose={handleClose1}>
        <Qr_code setShowModel={setShowModel1} />
    </Model>
    const model2 = <Model onClose={handleClose2}>
        <Createcategory setShowModel={setShowModel2} setChange={setChange} />
    </Model>
    return (
        <>
            <Header />
            <div className='grid grid-cols-4 gap-4 flex-wrap border-b-2 border-gray-500 rounded-md'>
                <div className='flex  flex-col justify-center items-center mx-2 my-2' onClick={()=> setSelectedCategory('All')}>
                    <img src="https://media.istockphoto.com/id/1625128179/photo/composition-of-well-balanced-food-for-healthy-eating.jpg?s=612x612&w=is&k=20&c=FfjR9w3_gP7hKgj__1KcOkeT41b-D4q7zpHAOfFLeng=" alt="All" className='h-14 w-14 bg-cover rounded-full' />
                    <p>All</p>
                </div>
                <Option change={change} setSelectedCategory={setSelectedCategory} minus={minus} />
                <div className='flex  flex-col justify-center items-center mx-2 my-2'>
                    <div className='h-14 w-14 rounded-full border-2 border-gray-500 flex justify-center items-center' onClick={() => {
                        setShowModel2(true);
                    }}>
                        <i className="fa fa-plus text-2xl"></i>
                    </div>
                    <p>Add</p>
                </div>
            </div>
            <div className='w-full flex flex-col flex-wrap min-h-screen pb-14'>
                <Card change={change} setChange={setChange} category={category} />
            </div>
            <Footer setShowModel={setShowModel} setShowModel1={setShowModel1} />
            {showModel && model}
            {showModel1 && model1}
            {showModel2 && model2}
        </>
    )
}

export default Admin