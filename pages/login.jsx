import { NextPage } from "next";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Axios from "axios";
import { ClipLoader } from "react-spinners";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Login = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  var [uid, setRollNo] = useState("");
  var [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const router = useRouter();

  // const redirect = router.location.search
  //   ? props.location.search.split('=')[1]
  //   : '/home';

  useEffect(() => {
    // setLoading(true)
    console.log(localStorage.getItem("userInfo"));
    if (localStorage.getItem("userInfo")) {
      setLoading(true);
      // debugger;
      router.push("/");
    }

    // setLoading(false)
    setInitLoad(false);
  },[router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await Axios.post(
        "api/signin",
        { uid, password }
      );

      console.log(data);

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        document.location.href = "/";
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    // debugger;
    setError(null);
    setLoading(false);
  };

  return (
    
    <form onSubmit={(e) => handleSubmit(e)}>
      {/* <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} /> */}
      <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 5,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 40,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
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

        <title>Attendance Portal</title>
      </Head>
      <div>
        
        <div className="relative flex flex-col items-center justify-center w-screen h-screen gap-2 ">
          {error ? (
            <h1 className="w-[528px] text-[1.4rem] backdrop-blur-sm p-2 mt-5 text-red-600 bg-red-200/[80%] rounded-md shadow-md">
              {error}
            </h1>
          ) : (
            ""
          )}
          {/* <button type="button" onClick={()=>setLoading(!loading)}>LOADER TEST</button> */}
          {!loading || initLoad ? (
            <div className="flex flex-col items-center h-3/2 max-h-[636px] max-w-[528px] w-[20vw] p-4 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-sm  flex-justify">
              

              <h1 className="font-semibold mt-4 text-[#FF0000]/60 text-[1.4rem]  md:text-[1.7rem] text-shadow-md">
                Attendance Portal
              </h1>
              <h1 className="font-semibold  text-[#FF0000]/60  md:text-[1.2rem] text-shadow-md">
                
              </h1>
              <h1 className="font-medium text-[#9C7878] mt-4 md:text-[1.4rem]">
                Welcome, Sign in to continue
              </h1>
              <div className="flex flex-col  justify-start mt-6 w-[100%] space-y-10">
                <div className="relative">
                  <input
                    name="rollNo"
                    value={uid}
                    onChange={(event) => {
                      setRollNo(event.target.value);
                    }}
                    className="block h-[3.8rem] text-[1.25rem]  w-full placeholder:text-[D9D9D9] placeholder:text-[1.25rem] p-2 rounded-full shadow-mds focus:outline-none"
                    style={{ padding: "20px" }}
                    type="text"
                    placeholder="Username"
                    required
                  />
                </div>
                <input
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="p-2 h-[3.8rem] text-[1.25rem] placeholder:text-[D9D9D9] placeholder:text-[1.25rem] rounded-full shadow-md  focus:outline-none"
                  style={{ padding: "20px" }}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                // onClick={()=>router.push("/")}
                className="p-1 w-[30%] rounded-full  mt-8 mb-2 font-semibold text-white bg-[#00BDC9] md:text-[1.2rem]"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex  m-4 justify-center items-center w-[100%] flex-grow">
              <ClipLoader size={60} color="#3693d6" />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

//get server side props



export default Login;
