import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import { BsArrowLeftShort } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineFileText } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillImageFill } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import Image from "next/image";
import Axios from 'axios'

function Course({classes}) {
  const router = useRouter();
  const [Open, setOpen] = useState(true);
  const { cid } = router.query;
  console.log(classes)
  const {classroom, stuArray, totalPercent, totalP} = classes
  

  const Students = [
    {name:"Joe Prathap P J",email:"joe.2105043@srec.ac.in",present:30,absent:0,image:'/profile.jpeg'},
    {name:"Mohanraj R",email:"mohanraj.2105058@srec.ac.in",present:28,absent:2,image:'/profile.jpeg',repeat:true},

  ]

  const Menus = [
    { title: "Dashboard", route: "/" },
    { title: "Reports", icon: <AiOutlineFileText />, route: "/course/report/"+cid },
    { title: "Media", spacing: true, icon: <BsFillImageFill />, route: "/" },
    { title: "Profile", spacing: true, icon: <BsPerson />, route: "/profile" },
    { title: "Logout", icon: <AiOutlineLogout />, route: "/login" },
  ];

  return (
    <div className="flex bg-slate-100">
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

      <div
        className={`bg-dark-purple h-screen relative p-5 pt-8  ${
          Open ? "w-72" : "w-20"
        }
      duration-300`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-2xl  absolute -right-3 top-9
        border border-dark-purple rounded-full cursor-pointer ${
          !Open && "rotate-180"
        }  `}
          onClick={() => setOpen(!Open)}
        />

        <div className="inline-flex">
          <CgProfile
            className={`bg-amber-300 transition-all ease-in ${
              Open && "duration-200 transition-all ease-in"
            } ${
              !Open && "rounded-all"
            }  text-4xl rounded-full cursor-pointer block 
      float-left mr-2 duration-500 `}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300
      ${!Open && "hidden"}`}
          >
            Welcome
          </h1>
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => {
            return (
              <>
                <li
                  onClick={() => router.push(menu.route)}
                  className={`flex items-center p-2  text-sm 
        text-gray-200 rounded-md cursor-pointer 
        gap-x-4 hover:bg-light-white ${menu.spacing ? "mt-9" : "mt-2"}`}
                  key={index}
                >
                  <span className="block float-left text-2xl">
                    {menu.icon ? menu.icon : <RiDashboardFill />}
                  </span>
                  <span
                    className={`flex-1 text-base font-medium ${
                      !Open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                </li>
              </>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col flex-grow bg-light-white p-7">
      <h1 className="text-2xl font-semibold">{classroom.name}</h1>
      
        <div className="flex f w-[100%] justify-center items-center mr-[10rem]">
          <hr className="w-[100%]" />
          
          <button className="p-1 border w-[10%] hover:bg-green-900 duration-200 ease-linear transition-all hover:text-white border-green-800">
            Take Attendance
          </button>
        </div>
        <h1 className="text-lg">Course Summary Report</h1>
        <div className="flex mt-2 justify-between gap-4 w-[100%]">
          <div className="flex flex-col gap-2 shadow-sm hover:shadow-lg hover:shadow-blue-700 duration-200 transition-all ease-linear shadow-blue-500 bg-blue-500 h-[9rem] w-[100%] justify-center items-center">
            <h1 className="text-4xl font-semibold text-white">{classroom.students.length}</h1>
            <h1 className="text-xl font-semibold text-white">Total Students</h1>
          </div>

          <div className="flex flex-col gap-2 
          shadow-sm hover:shadow-lg hover:shadow-green-700 duration-200 
          transition-all ease-linear shadow-green-500 bg-green-500 h-[9rem] w-[100%] justify-center items-center">
            <h1 className="text-4xl font-semibold text-white">{classroom.totLec}</h1>
            <h1 className="text-xl font-semibold text-white">Classes Conducted</h1>
          </div>

          {/* <div className="flex flex-col gap-2
          shadow-sm hover:shadow-lg hover:shadow-red-700 duration-200 
          transition-all ease-linear shadow-red-500
          bg-red-500 h-[9rem] w-[100%] justify-center items-center">
            <h1 className="text-4xl font-semibold text-white">0</h1>
            <h1 className="text-xl font-semibold text-white">Absent</h1>
          </div> */}

          <div className="flex flex-col gap-2
          shadow-sm hover:shadow-lg hover:shadow-orange-700 duration-200 
          transition-all ease-linear shadow-orange-500
          bg-orange-500 h-[9rem] w-[100%] justify-center items-center">
            <h1 className="text-4xl font-semibold text-white">{totalPercent && totalPercent ==100? Math.round(totalPercent):totalPercent}%</h1>
            <h1 className="text-xl font-semibold text-white">Average Attendance</h1>
          </div>

          
        </div>
        <h1 className="mt-4 mb-4 text-lg">Enrolled Students</h1>
        <hr />
        <div className="flex flex-col items-center justify-center gap-4 p-4">

        
       {/* {Students.map((student,index)=>{
        return(
            <>
            <div key={index} className={`flex  h-[8rem]   rounded-md shadow-md ${student.repeat?"bg-red-200 shadow-red-300":"bg-white"}`}>
            <div className={`relative h-[100%] w-[8%] ${student.repeat && "border-4 border-red-500"}`}>
                <Image src={student.image} fill/>
            </div>
            <div className="flex flex-col ml-2">
            <h1 className="text-lg">Name: {student.name}</h1>
            <h1 className="text-lg">No. of Days Present: {student.present}</h1>
            <h1 className="text-lg">No. of Days Absent: {student.absent}</h1>
            </div>
          
        </div>
        <hr />
        </>
        )
       })} */}
       <div className="flex   gap-2 flex-col rounded-md shadow-md w-[100%] bg-slate-200">
       <div className="flex w-[100%] p-4 justify-end gap-4">
        <button className="p-2 font-semibold text-white bg-blue-500 rounded-md shadow-md">Add Student</button>
        
       </div>
       
<div class="relative overflow-x-auto rounded-md">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    NAME
                </th>
                <th scope="col" class="px-6 py-3">
                    EMAIL
                </th>
                <th scope="col" class="px-6 py-3">
                    Classes Attended
                </th>
                <th scope="col" class="px-6 py-3">
                    Attendance
                </th>
                
            </tr>
        </thead>
        <tbody>
            {stuArray.map((student)=>{
              return(
                <tr key={student._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.name}
                </th>
                <td class="px-6 py-4">
                    {student.email}
                </td>
                <td class="px-6 py-4">
                    {student.counts}
                </td>
                <td class="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <h1>{student.percent}%</h1>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div class="bg-blue-600 h-2.5 rounded-full" style={{width: student.present+"%"}}></div>
</div>
                </div>
                </td>
                
            </tr>
              )
            })}
            
        </tbody>
    </table>
</div>

       </div>
      </div>
      
    </div>
    </div>
  );
  
}

export async function getServerSideProps(context){
  console.log("------------------------------")
  console.log(context.query)
  console.log("------------------------------")
  const {cid} = context.query
  
  try{
   const {data} = await Axios.get(process.env.host+"/api/classroom/"+cid)

   if(data.data){
    return {props: {classes:data.data}}
   }
   if(!data){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
   }

   


   
  }catch(e){
    console.error(e)
  }
}

export default Course;
