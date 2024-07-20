import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import {BsArrowLeftShort} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import {AiOutlineFileText} from "react-icons/ai"
import {AiOutlineLogout} from "react-icons/ai"
import {RiDashboardFill} from "react-icons/ri"
import {BsFillImageFill} from "react-icons/bs"
import {BsPerson} from "react-icons/bs"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"
import Axios from 'axios'
import Link from 'next/link'



export default function Index({classes}) {
  

  
  const [Loading,setLoading] = useState(false);
  const router = useRouter()
  const [Open,setOpen] = useState(true);
  const Menus = [
    {title:"Dashboard",route:"/"},
    // {title:"Profile",icon:<BsPerson/>,route:"/profile"},
    {title:"Logout",icon:<AiOutlineLogout/>,route:"/login"},
  ];

  const Subjects = [
    {title: "20IT204 - Data Structures",image:"/ds.jpg",class:"II IT-A"},
    {title: "20IT214 - Java Programming",image:"/java.png",class:"III IT-A"},


  ]

  console.log(classes)

  const [Subject,setSubject] = useState([
  ]);

  useEffect(() => {
    let temp = [...Subject]
    Subjects.map(async (subject)=>{
      
      setTimeout(()=>{temp.push(subject);setSubject(temp)},200)
      console.log(Subject)
      
    })
    
    
  },[])

  const addSubject = ()=>{
   
    let temp = [...Subject]
    temp.push({title: "20IT214 - Java Programming",image:"/java.png",class:"III IT-A"});
    
  }

 console.log(Subject)
  
  
  return (

    

    <div className='flex overflow-x-hidden bg-slate-100'>
      
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

        <title>Dashboard</title>
      </Head>

      <div className={`bg-dark-purple flex-shrink-0 min-h-screen relative p-5 pt-8  ${Open ? "w-72": "w-20"}
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
        <li onClick={()=>router.push(menu.route)} className={`flex items-center p-2  text-sm 
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

    

      <div className='flex flex-col flex-grow bg-light-white p-7'>
      {Loading?(
        <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-20 w-20"></div>
    </div>
      ):(
        <>
        <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>
        Dashboard
        </h1>

        {/* <Link href={"/admin/addCourse"} className='p-2 text-white transition-all duration-100 bg-blue-500 rounded-md shadow-md hover:bg-blue-700'>Add Course</Link> */}
        </div>
        
        
        
          <div className='flex flex-wrap items-center gap-4 p-2 pt-2 mt-2 '>
            {
            classes.map((subject,index)=>{
             return(
              <motion.div 
              key={subject._id}
              initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
              >
              <Link prefetch href={`/course/${subject._id}`}>
             
              <div onClick={()=>setLoading(true)} key={index}  className='h-[15rem] ring-1 bg-white ring-slate-900/5  hover:ring-sky-500 rounded-sm overflow-hidden hover:scale-105 transition-all ease-linear hover:cursor-pointer hover:shadow-xl   shadow-lg w-[15rem]'>
              <div className='w-[100%]  h-[6rem] rounded-sm  relative flex-col flex flex-grow'>
              <Image src={subject.image} className='blur-[1.5px] divide-y divide-slate-200' alt={"subject"} fill />
              <h1 className='absolute p-2 text-xl font-semibold leading-6 text-white duration-200 group hover:underline '> 
                {subject.name.length < 30 ? subject.name : subject.name.substring(0,26)+'...'}
                
              </h1>
              <h1 className='absolute hover:underline group-hover:underline inset-x-0 p-2 font text-white duration-200 top-[3.8rem] text-md '>
              {subject.description && subject.description}
              </h1>
              </div>
              
              
    
              </div>
              
              </Link>
              </motion.div>
             ) 
            })}
          </div>
          
      </>
      )}
      
      </div>
      

    </div>
  )
}

export async function getServerSideProps(context){
  // console.log(process.env.NODE_ENV)
  try{
   const {data} = await Axios.post((process.env.NODE_ENV == "production" ? process.env.host: "http://localhost:3000")+"/api/classroom",{fid:"63c6cfd516f7067d326af66"})
   return {props: {classes:data.data}}
  }catch(e){
    console.error(e)
    return {props: {classes:[]}}
  }
}

