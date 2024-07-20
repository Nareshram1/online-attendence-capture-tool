import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import Axios from 'axios';
import Image from "next/image";
import NavBar from "../../lib/components/navBar";




function Course({classes,students}) {
  const router = useRouter();
  const { cid } = router.query;
  console.log(classes)
  const {classroom, stuArray, totalPercent, totalP} = classes

  const stuArray2 = stuArray.map((roll)=>{
    return roll.rollNo
  })

  const removeStudent =async (sid,cid)=>{
    try{

      const result =  await Axios.post("http://localhost:3000/api/classroom/removeStudent",{sid:sid,cid:cid})
      if(result){
        console.log(result)
        router.reload()
      }
      else{
        console.log('error-unknown')
      }
    }
    catch(e){
      console.log(e)
    }
  }

  const addStudent =async (sid,cid)=>{
    try{

      const result =  await Axios.post("http://localhost:3000/api/classroom/addStudent",{sid:sid,cid:cid})
      if(result){
        console.log(result)
        router.reload()
      }
      else{
        console.log('error-unknown')
      }
    }
    catch(e){
      console.log(e)
    }
  }

  console.log(students)
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  
  const takeAttendance = ()=>{
    router.push({pathname:"takeAttendance",query:{cid:cid,oid:1905}})
  }
  
  return (
    <div className="flex min-h-screen bg-slate-100">
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

      

      {classroom? 
        (
          
          <div className="flex flex-col flex-grow bg-light-white p-7 ">
            <>
      
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[50vw] p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Student
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Add students from same department and year
                    </p>
                  </div>

                  <div className="mt-4">
                    
                    <div className="relative max-h-[50vh] overflow-y-scroll rounded-md">
    <div className="w-full flex flex-col gap-2   overflow-hidden h-[1%] text-sm text-left text-gray-500 dark:text-gray-400">
            {students.map((student)=>{
              return(
                <div key={student._id} className="flex items-center justify-between w-full gap-2 p-2 bg-gray-200 rounded-md shadow-md">
    
                
                
                
                   <h1 className="text-black font-[2rem]"> {student.name}</h1>
                   
                 
                   {student.email}
                   
                    
                

                  {stuArray2.includes(student.rollNo) ? (
                    <div className="flex gap-2">
                    <button disabled className="p-2 w-[6rem] text-white bg-green-200 rounded-md duration-100  ">Add</button>
                    <button onClick={()=>removeStudent(student._id,cid)} className="p-2 w-[6rem] text-white bg-red-500 rounded-md duration-100 transition-all hover:bg-red-700 hover:shadow-md">Remove</button>
                    </div>
                  ) :(
                    <div className="flex gap-2">
                    <button onClick={()=>addStudent(student._id,cid)} className="p-2 w-[6rem] text-white bg-green-500 rounded-md duration-100 transition-all hover:bg-green-700 hover:shadow-md">Add</button>
                    <button disabled className="p-2 w-[6rem] text-white bg-red-200 rounded-md ">Remove</button>
                    </div>
                  )}
                    
      
                
              </div>
            
              )
            })}
            
   
    </div>
</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
      <h1 className="text-2xl font-semibold">{classroom.name}</h1>
      
        <div className="flex f w-[100%] justify-center items-center mr-[10rem]">
          <hr className="w-[100%]" />

          <button onClick={()=>takeAttendance()} className="p-1 border w-[10%] hover:bg-green-900 duration-200 ease-linear transition-all hover:text-white border-green-800">
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
        <button onClick={openModal} className="p-2 font-semibold text-white bg-blue-500 rounded-md shadow-md">Add Student</button>
        
        
       </div>
       
<div className="relative max-h-[80vh] overflow-y-scroll rounded-md">
    <table className="w-full  overflow-hidden h-[1%] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                    IMAGE
                </th>
                <th scope="col" className="px-6 py-3">
                    NAME
                </th>
                <th scope="col" className="px-6 py-3">
                    EMAIL
                </th>
                <th scope="col" className="px-6 py-3">
                    Classes Attended
                </th>
                <th scope="col" className="px-6 py-3">
                    Attendance
                </th>
                
            </tr>
        </thead>
        <tbody>
            {stuArray.map((student)=>{
              return(
                <tr key={student._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 `}>
                

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">  
                   <div className={`relative w-20 h-20 overflow-hidden rounded-md shadow-md outline-4 ring-4 ${!student.regular ? 'ring-red-600 outline-red-500 shadow-red-500' :'ring-green-600 outline-green-500 shadow-green-900' } `}>
                   <Image alt={"regular or irregular"} loading="lazy"  src={'/images/'+student.image} fill className={`${!student.regular ? 'text-red-500': 'text-green-500'}`}/>

                   </div>
                </th>
                
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <h1 className={`${!student.regular ? 'text-red-500': 'text-green-500'}`}> {student.name}</h1>
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
  <div class="bg-blue-600 h-2.5 rounded-full" style={{width: student.percent+"%"}}></div>
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
        )
      :''}
    </div>
  );
  
}

export async function getServerSideProps(context){
  console.log("------------------------------")
  console.log(context.query)
  console.log("------------------------------")
  const {cid} = context.query
  
  try{
   const {data} = await Axios.get((process.env.NODE_ENV == "production" ? process.env.host: "http://localhost:3000")+"/api/classroom/"+cid)
   console.log((process.env.NODE_ENV == "production" ? process.env.host: "http://localhost:3000")+"/api/classroom/"+cid)
   if(data.data){
    return {props: {classes:data.data[0],students:data.data[1]}}
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
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
    return {props: {classes:{classroom:null}}}
  }
}

export default Course;
