import Axios  from "axios";
import { NextPage } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import {  useState } from "react";
import { motion } from 'framer-motion';

const AddCourse = () => {
    const [CourseCode,setCourseCode] = useState("")
    const [CourseTitle,setCourseTitle] = useState("")
    const [CourseDepartment,setCourseDepartment] = useState("")
    const [CourseCredits,setCourseCredits] = useState("")
    const [Year,setYear] = useState("")
    const [Semester,setSemester] = useState("")
    const [CourseType,setCourseType] = useState("")
    const [Departments,setDepartment] = useState(["B.Tech IT","B.Tech AIDS","B.E CSE","M.Tech CSE","B.E ECE","B.E EEE","B.E EIE","B.E CIVIL","B.E MECH","B.E RA"]);
    const [CommonTo,setCommonTo] = useState([])
    const [SelectedDepartment,setSelectedDepartment]= useState("");
    const [Error,setError] = useState("")

    const CreateCourse = async ()=>{
        if(CommonTo.length>0){
            try{
           const data = {
            courseCode:CourseCode,
            courseTitle:CourseTitle,
            courseDepartment:CourseDepartment,
            courseCredits:CourseCredits,
            courseType:CourseType,
            year:Year,
            semester:Semester,
            commonTo:CommonTo
           }
      
            await Axios.post("http://localhost:5000/api/course/create",data)
            
          
            }catch(error){
                setError(error.message);
                setTimeout(() => { setError(""); }, 5000)
               
            }
        }
    }

    const removeDepartment = (department)=>{
        
        let temp = [...CommonTo]
        let temp2 = [...Departments]
        
        console.log(department)

        temp.splice(temp.indexOf(department,1))
        temp2.push(department)

        setCommonTo(temp)
        setDepartment(temp2)
    }

    const addDepartment = ()=>{
        
        let temp = [...CommonTo]
        let temp2 = [...Departments]
        
       if(!(SelectedDepartment=="default" || SelectedDepartment=="") && !(CommonTo.includes(SelectedDepartment))){
        temp.push(SelectedDepartment)
        temp2.splice(temp2.indexOf(SelectedDepartment),1)
        // commonTo[0].push(selectedDepartment)
        setCommonTo(temp)
        setDepartment(temp2)
        
       }

    }

    const checkCode =async ()=>{
    
      const {data}=await Axios.post("http://localhost:5000/api/course/check",{courseCode:CourseCode})
      console.log(data);
      if(data){
        setError(data)
        setTimeout(() => { setError(""); }, 5000)
      }
    }

  return (
    <div className="flex flex-col h-[100%] min-h-screen bg-slate-400/[60%] ">
    
      {/*admin header*/}
      <div className="flex   w-[100%] ">
        {/* <Navbar /> */}
        <div className="flex w-[100%]">
          <div className="flex  items-center flex-col flex-grow p-[4rem]  ">
            <div  className="flex gap-4 w-[50%] p-4 flex-col scale-110   h-max">
            {Error !=""?( 
            <motion.div initial="hidden" animate="visible" variants={{
              hidden: {
                scale: .8,
                opacity: 0
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: .4
                }
              },
            }}>
            <h1 className="p-2 bg-red-200 rounded-md  w-[100%] mt-5 text-red-600 shadow-md">{Error}</h1>
            </motion.div>
            ):""}
             
              <h1 className="text-[2rem]">Create Course</h1>
              <div className="flex flex-col gap-2">
                <h1>Course Code:</h1>
                <input  onInput={(e)=>{setCourseCode(e.target.value)}} onBlur={()=>checkCode()} placeholder="Ex. 20MA204" className="rounded-md p-2 h-[2rem] shadow-sm" type="text" required/>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Course Title:</h1>
                <input onInput={(e)=>{setCourseTitle(e.target.value)}} placeholder="Ex. Discrete Structures and Combinatorics" className="rounded-md p-2 h-[2rem] shadow-sm" type="text" required/>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Course Department:</h1>
                <select onChange={(e)=>{setCourseDepartment(e.target.value)}} className="rounded-md p-1 shadow-sm h-[2rem]" name="department" id="cars" required>
                  <option value=""  selected>Select Department</option>  
                  <option value="B.E CSE">B.E CSE</option>
                  <option value="B.Tech IT">B.Tech IT</option>
                  <option value="B.Tech AIDS">B.Tech AIDS</option>
                  <option value="M.Tech CSE">M.Tech CSE</option>
                  <option value="B.E ECE">B.E ECE</option>
                  <option value="B.E EEE">B.E EEE</option>
                  <option value="B.E EIE">B.E EIE</option>
                  <option value="B.E CIVIL">B.E CIVIL</option>
                  <option value="B.E MECH">B.E MECH</option>
                  <option value="B.E RA">B.E RA</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Course Credits:</h1>
                <select onChange={(e)=>{setCourseCredits(e.target.value)}} className="rounded-md p-1 shadow-sm h-[2rem]" name="department" id="cars" required>
                  <option value=""  selected>Select Credit</option>  
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                 

                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Course Commonto:</h1>
                <div className="flex gap">
                <select onChange={(e)=>{setSelectedDepartment(e.target.value)}} className="p-1 rounded-md rounded-r-none w-[100%]" required>
                    <option value="default" selected>Select Department to add</option>
                    {Departments.map((department)=>{
                        return (<option  key={department}  className="" value={department}>{department}</option>)
                    })}
                </select>
                <button onClick={()=>{addDepartment()}} className="p-2 border-l-0 rounded-l-none text-white shadow-md bg-blue-500 rounded-md w-[20%]">Add Department</button>
                </div>
                <div className="flex flex-wrap mt-2 gap-2 p-2 bg-white/[45%] shadow-md backdrop-blur-[60%] rounded-lg">
                    {CommonTo.length>0?CommonTo.map((common)=>{
                        return (
                            <div key={common} className="p-2 text-white text-center rounded-full flex gap-2 min-w-[4rem] shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                        <h1>{common}</h1>
                        <div className="rounded-full ">
                            <h1 id={common} onClick={(e)=>{removeDepartment(e.target.id)}} className="cursor-pointer">X</h1>
                        </div>
                    </div>
                        )
                    }):"Common Departments Preview"}
                    
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Course Assigned Year:</h1>
                <select onChange={(e)=>{setYear(e.target.value)}} className="rounded-md p-1 shadow-sm h-[2rem]" name="department" id="cars" required>
                  <option value=""  selected>Select Year</option>  
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>


                </select>
              </div>

              <div className="flex flex-col gap-2">
                <h1>Course Assigned Semester:</h1>
                <select onChange={(e)=>{setSemester(e.target.value)}} className="rounded-md p-1 shadow-sm h-[2rem]" name="department" id="cars" required>
                  <option value=""  selected>Select Semester</option>  
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>


                </select>
              </div>

              <div className="flex flex-col gap-2">
                <h1>Course Type:</h1>
                <select onChange={(e)=>{setCourseType(e.target.value)}} className="rounded-md p-1 shadow-sm h-[2rem]" name="department" id="cars" required>
                  <option value=""  selected>Select Course Type</option>  
                  <option value="Theory">Theory</option>
                  <option value="Core">Core</option>
                  <option value="Theory Cum Lab">Theroy Cum Lab</option>
                  <option value="Laboratory">Laboratory</option>
 


                </select>
              </div>
                
              <button onClick={()=>{CreateCourse()}} className="p-2 m-4 text-white bg-blue-400 rounded-full">Create Course</button>
              
            </div>
            
            
            
            
          </div>
          
        </div>
      </div>
      <div className='flex text-[0.5rem] md:text-[1rem]  relative bottom-0   text-white bg-[#001529]/[89%] flex-col items-center  justify-center p-4'>
              <h1>with ❤️ IT</h1> 
              <h1>©Copyright 2022</h1>
             
            </div>
            
    </div>
  );
};

export default AddCourse;
