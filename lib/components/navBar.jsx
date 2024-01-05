import React, { useState } from 'react'
import { AiOutlineFileText, AiOutlineLogout } from "react-icons/ai"
import { BsArrowLeftShort, BsChevronDown, BsFillImageFill, BsPerson } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { RiDashboardFill } from "react-icons/ri"

function NavBar(cid,router) {
    const [Open, setOpen] = useState(true);
    const [Subopen, setSubOpen] = useState(false);
    const Menus = [
        { title: "Dashboard", route: "/" },
        { title: "Reports", icon: <AiOutlineFileText />, submenu:true, 
        submenuItems: [
          {title:'Day', route: `/course/report/daily/${cid}` },
          {title: 'Range',route:`/course/report/range/${cid}`},
          {title: 'Month',route:`/course/report/monthly/${cid}`},
      ], route: "/course/report/"+cid },
        // { title: "Profile", icon: <BsPerson />, route: "/profile" },
        { title: "Logout", icon: <AiOutlineLogout />, route: "/login" },
      ];
  
  return (
    <div
        className={`bg-dark-purple min-h-screen  relative p-5 pt-8  ${
          Open ? "w-72" : "w-20"
        }
      duration-300`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-2xl  absolute -right-3 top-9
        border border-dark-purple rounded-full cursor-pointer ${
          !Open && "rotate-180"
        }  `}
          onClick={() => {setOpen(!Open),setSubOpen(false)}}
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
                  onClick={!menu.submenu ?() => router.push(menu.route):()=>{}}
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
                  {menu.submenu && (
                    
                  
                    <BsChevronDown className={`${Subopen? 'rotate-180 transition-all duration-120' : ''}`} onClick={()=>setSubOpen(!Subopen)}/>
                    
                  )}
                </li>
                {menu.submenu && Subopen && (
                  <ul className="transition-all duration-100">
                    
                    {menu.submenuItems.map((submenu,index)=>{
                      return(
                      <li onClick={()=>{router.push(submenu.route)}} className={`flex items-center p-2 ml-10  text-sm 
                      text-gray-200 rounded-md cursor-pointer 
                      gap-x-4 hover:bg-light-white ${menu.spacing ? "mt-9" : "mt-2"}`} key={index}>
                        <h1 className={`flex-1 text-base font-medium ${
                      !Open && "hidden"
                    }`}>{submenu.title}</h1>
                      </li>
                      )
                    })}
                  </ul>
          )}
              </>
            );
          })}
        </ul>
      </div>
  )
}

export default NavBar