import React from 'react'
import { useNavigate } from 'react-router-dom'


const AddWork = () => {
  const navigate = useNavigate();
  return (
    
    <div className='bg-slate-300 h-screen flex justify-center items-center ' >
    <div  className=' bg-slate-200 rounded-md shadow-lg  p-5 w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2  h-1/2' >
    <p className=' text-center text-xl '>Add your work so that every one can see your work</p>
    <span className='flex justify-center items-center w-full h-full  '>
    <ul className='md:flex lg:flex xl:flex '>
        <li>
       
          <a
            onClick={() => navigate("/createpost")}
            className="border-2 text-white bg-black hover:rounded-lg m-5 hover:bg-slate-800 p-3 rounded-md  "
          >
            Add Post{" "}
          </a>
    
      
        </li><br /><br />
        <li>
        <a
            onClick={() => navigate("/createvideopost")}
            className="border-2 m-5 bg-black text-white  hover:rounded-lg m-5 hover:bg-slate-800 p-3 rounded-md  "
            >
            Add Video{" "}
          </a>
        </li>
      </ul>
    </span>
     

    </div>
      
    </div>
  )
}

export default AddWork