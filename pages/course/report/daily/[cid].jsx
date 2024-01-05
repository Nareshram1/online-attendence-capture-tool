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
import NavBar from "../../../../lib/components/navBar";





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
    { title: "Profile", icon: <BsPerson />, route: "/profile" },
    { title: "Logout", icon: <AiOutlineLogout />, route: "/login" },
  ];

  const getReport = async()=>{
    try{
    const {data} =await Axios.post("/api/classroom/report",{date:value.startDate,cid:cid})
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

      {NavBar(cid,router)}

      <div className="flex flex-col flex-grow bg-light-white p-7">
      <h1 className="text-2xl font-semibold">{classes.classroom.name}</h1>
      
      
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
          <div className="flex flex-grow w-full max-h-[85vh] p-4 ">
          <div class="relative w-full overflow-y-auto overflow-x-auto rounded-md">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  
                <th scope="col" class="px-6 py-3">
                    IMAGE
                </th>
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
                   <div className={`relative w-20 h-20 overflow-hidden rounded-md shadow-md outline-4 ring-4 `}>
                   <Image alt={"images"} loading="lazy"  src={'/images/'+student.image} fill/>

                   </div>
                </th>
                  
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
      console.log(data.data[0].classroom.name)
     return {props: {classes:data.data[0]}}
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
      return {props: {classes:{classroom:{name:'Error'}}}}
   }
}

export default Report;
