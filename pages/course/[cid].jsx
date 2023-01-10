import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Head from 'next/head'
import {BsArrowLeftShort} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import {AiOutlineFileText} from "react-icons/ai"
import {AiOutlineLogout} from "react-icons/ai"
import {RiDashboardFill} from "react-icons/ri"
import {BsFillImageFill} from "react-icons/bs"
import {BsPerson} from "react-icons/bs"
import Image from 'next/image'

function Course() {

    const router = useRouter()
    const [Open,setOpen] = useState(true);
    const {cid} = router.query
    const Menus = [
        {title:"Dashboard",route:"/"},
        {title:"Reports",icon:<AiOutlineFileText/>,route:"/"},
        {title:"Media", spacing: true,icon:<BsFillImageFill/>,route:"/"},
        {title:"Profile",spacing:true,icon:<BsPerson/>,route:"/profile"},
        {title:"Logout",icon:<AiOutlineLogout/>,route:"/login"},
      ];

  return (
    <div className='flex'>
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />

      <title>Course</title>
    </Head>

    <div className={`bg-dark-purple h-screen relative p-5 pt-8  ${Open ? "w-72": "w-20"}
      duration-300`}>
        <BsArrowLeftShort className={`bg-white text-dark-purple text-2xl  absolute -right-3 top-9
        border border-dark-purple rounded-full cursor-pointer ${!Open && "rotate-180" }  `} onClick={()=>setOpen(!Open)}/>
      
      <div className='inline-flex'>
      <CgProfile className={`bg-amber-300 transition-all ease-in ${Open && "duration-200 transition-all ease-in"} ${!Open && "rounded-all"}  text-4xl rounded-full cursor-pointer block 
      float-left mr-2 duration-500 `}/>
      <h1 className={`text-white origin-left font-medium text-xl duration-300
      ${!Open && "hidden"}`}>Welcome</h1>
    </div>

   <ul className='pt-2'>
    {Menus.map((menu,index)=>{
      return(
      <>
        <li onClick={()=>router.push("/")} className={`flex items-center p-2  text-sm 
        text-gray-200 rounded-md cursor-pointer 
        gap-x-4 hover:bg-light-white ${menu.spacing ? "mt-9" : "mt-2"}`} key={index}>
          <span  className='block float-left text-2xl'>
           {menu.icon? menu.icon :<RiDashboardFill />}
          </span>
          <span className={`flex-1 text-base font-medium ${!Open && "hidden"}`}>{menu.title}</span>
        </li>
      </>
      )
    })}
   </ul>

      
      </div>


    <div>Course ID: {cid}</div>
    </div>
  )
}

export default Course