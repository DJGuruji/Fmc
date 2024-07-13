import React from 'react'
import { useNavigate } from 'react-router-dom'
import img from "../img/work.jpeg"


const AddWork = () => {
  const navigate = useNavigate();
  return (
    // style={{backgroundImage: `url(${img})`}}
    <div className='h-screen flex justify-center items-center ' >
    <div  className='bg-zinc-300 rounded-md shadow-lg  p-5 w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2  h-1/2' >
    <p className='text-zinc-700 text-center text-xl '>Add your work so that every one can see your work</p>
    <span className='flex justify-center items-center w-full h-full  '>
    <ul className='flex'>
        <li>
       
          <a
            onClick={() => navigate("/createpost")}
            className="border-2 border-blue-700 text-blue-700 bg-blue-200  hover:rounded-lg m-5 hover:bg-blue-400 p-3 rounded-md  "
          >
            Add Post{" "}
          </a>
    
      
        </li>
        <li>
        <a
            onClick={() => navigate("/createvideopost")}
            className="border-2 border-blue-700 text-blue-700 bg-blue-200  hover:rounded-lg m-5 hover:bg-blue-400 p-3 rounded-md  "
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