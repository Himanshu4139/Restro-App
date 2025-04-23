import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

function BackButton({ destination ,setShowModel}) {
  return (
    <div className='flex'>
        <Link 
            to={destination}
            className='text-white px-2 py-2 rounded-full w-fit border-2 border-white' onClick={()=>{
              setShowModel(false)
            }}>
                <BsArrowLeft className='text-xl' />
            </Link>


    </div>
  )
}

export default BackButton