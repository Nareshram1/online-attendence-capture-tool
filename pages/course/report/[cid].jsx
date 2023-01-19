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
import Datepicker from "react-tailwindcss-datepicker";
import Axios from 'axios'





function Report({classes}) {
  const router = useRouter();
  const [Open, setOpen] = useState(true);
  const { cid } = router.query;

  const [value, setValue] = useState(
   {startDate:null}
);

const [Report,setReport] = useState(null)


const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
}

 

 



  const Menus = [
    { title: "Dashboard", route: "/" },
    { title: "Reports", icon: <AiOutlineFileText />, route: "/" },
    { title: "Media", spacing: true, icon: <BsFillImageFill />, route: "/" },
    { title: "Profile", spacing: true, icon: <BsPerson />, route: "/profile" },
    { title: "Logout", icon: <AiOutlineLogout />, route: "/login" },
  ];

  const getReport = async()=>{
    try{
    const {data} =await Axios.post("/api/classroom/report",{date:value.startDate})
    if(data){
      setReport(data.data)
    }else{
      setReport(null)
    }
  }catch(error){
    setReport(null)
  }
  }

  return (
    <div className="flex flex-grow min-h-screen h-[100%] bg-slate-100">
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
      <h1 className="text-2xl font-semibold">MIP - Mini Project</h1>
      
      
      <div class="flex items-center gap-4 flex-col   flex-grow ">

      <div className="flex gap-2">
        
            <Datepicker
            asSingle
                value={value}
                maxDate={new Date()}
                onChange={handleValueChange}
            />

            <button onClick={()=>getReport()} className="p-2 text-white bg-blue-500 rounded-md shadow-md">Get</button>



        
        </div>

        {Report ? (
          <div className="flex flex-grow w-full max-h-[20vh] p-4 ">
          <div class="relative w-full overflow-y-auto overflow-x-auto rounded-md">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      NAME
                  </th>
                  <th scope="col" class="px-6 py-3">
                      EMAIL
                  </th>
              
                  
              </tr>
          </thead>
          <tbody>
              {Report.map((student)=>{
                return(
                  <tr key={student._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {student.name}
                  </th>
                  <td class="px-6 py-4">
                      {student.email}
                  </td>
                  
                  
              </tr>
                )
              })}
              
          </tbody>
      </table>
  </div>
          </div>
        ):(
          <div className="flex w-full p-4 m-4 text-xl text-red-700 bg-red-200 shadow-md rounded-xla ring-2 ring-red-500">
            <h1>No Records Found on the given date</h1>

          </div>
          
          )}

        
      
</div>



      
    </div>
    
    </div>
  );
  
}

export async function getServerSideProps(context){
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

export default Report;
