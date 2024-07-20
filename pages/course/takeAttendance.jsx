import  Axios  from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react';

function TakeAttendance() {

	const router = useRouter()
	const {cid,oid} = router.query
	const [Comparision,setComparision] = useState(null)

    let stream = null,
	audio = null,
	mixedStream = null,
	chunks = [], 
	recorder = null,
	startButton = null,
	stopButton = null,
	downloadButton = null,
	recordedVideo = null;

    async function setupStream () {
        try {
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });
    
            audio = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });
    
            setupVideoFeedback();
        } catch (err) {
            console.error(err)
        }
    }

    function setupVideoFeedback() {
        if (stream) {
            const video = document.querySelector('.video-feedback');
            video.srcObject = stream;
            video.play();
        } else {
            console.warn('No stream available');
        }
    }

	
function setupVideoFeedback() {
	if (stream) {
		const video = document.querySelector('.video-feedback');
		video.srcObject = stream;
		video.play();
	} else {
		console.warn('No stream available');
	}
}

useEffect(() => {
	startButton = document.querySelector('.start-recording');
	stopButton = document.querySelector('.stop-recording');
	downloadButton = document.querySelector('.download-video');
	recordedVideo = document.querySelector('.recorded-video');

	startButton.addEventListener('click', startRecording);
	stopButton.addEventListener('click', stopRecording);
}, [cid])


async function startRecording () {
	await setupStream();

	startButton = document.querySelector('.start-recording');
	stopButton = document.querySelector('.stop-recording');
	downloadButton = document.querySelector('.download-video');
	recordedVideo = document.querySelector('.recorded-video');

	startButton.addEventListener('click', startRecording);
	stopButton.addEventListener('click', stopRecording);

	if (stream && audio) {
		mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);
		recorder = new MediaRecorder(mixedStream);
		recorder.ondataavailable = handleDataAvailable;
		recorder.onstop = handleStop;
		recorder.start(1000);
	
		startButton.disabled = true;
		stopButton.disabled = false;
	
		console.log('Recording started');
	} else {
		console.warn('No stream available.');
	}
}

function stopRecording () {
	recorder.stop();

	startButton.disabled = false;
	stopButton.disabled = true;
}

function handleDataAvailable (e) {
	chunks.push(e.data);
}

const sendToServer =async (path)=>{
	let {data} = await Axios.post("http://127.0.0.1:5000/sap",{cid:cid,oid:oid,path:path})
	console.log(data)
	if(data){
		setComparision(data)
	}
}

function handleStop (e) {
	const blob = new Blob(chunks, { 'type' : 'video/mp4' });
	chunks = [];

	downloadButton.href = URL.createObjectURL(blob);
	downloadButton.download = 'video.mp4';
	downloadButton.disabled = false;

	recordedVideo.src = URL.createObjectURL(blob);
	recordedVideo.load();
	recordedVideo.onloadeddata = function() {
		const rc = document.querySelector(".recorded-video-wrap");
		rc.classList.remove("hidden");
		rc.scrollIntoView({ behavior: "smooth", block: "start" });

		recordedVideo.play();
	}

	stream.getTracks().forEach((track) => track.stop());
	audio.getTracks().forEach((track) => track.stop());

	console.log('Recording stopped');
}


    

  return (
    <div>
        <header className="bg-gray-900">
		<div className="container mx-auto">
			<div className="flex items-center justify-center py-4">
				<h1 className="text-2xl font-bold uppercase">Screen Recorder</h1>
			</div>
		</div>
	</header>

	<main className="overflow-hidden">

		

		<div className="container px-4 py-8 mx-auto">
			<h2 className="mb-4 text-xl font-light text-gray-500 uppercase">
				Video recorder
			</h2>

			{Comparision && (
				<>
				<h1>Performance Statistics</h1>
				<div className='flex flex-col gap-4 mt-2'>
				<table className='w-full  overflow-hidden h-[1%] text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className="text-[1rem] uppercase text-white-700 bg-gray-50 dark:bg-pink-500 dark:text-white">
						<td scope="col" className="px-6 py-3">Model Name</td>
						<td scope="col" className="px-6 py-3">Architecture</td>
						<td scope="col" className="px-6 py-3">No of Layers</td>
						<td scope="col" className="px-6 py-3">Epochs</td>
						<td scope="col" className="px-6 py-3">Accuracy</td>
						<td scope="col" className="px-6 py-3">No of faces Detected/Detection Rate</td>
						<td scope="col" className="px-6 py-3">Execution Time</td>
						<td scope="col" className="px-6 py-3">Completion Time</td>
					</thead>

					<tbody>
						{Comparision && Comparision.map((model,idx)=>{
							return(
								<tr key={idx} className={`bg-white font-bold text-[1.2rem] text-black border-b dark:bg-pink-300 dark:border-gray-700 `}>
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{model.name}</th>
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">
							{model.image && (
								<dir Key={idx} className="w-[20rem] relative p-2 h-[10rem] bg-red-400">
								<Image  alt={"images"} key={idx} src={`/${model.image}`} fill/>
							</dir>
							)}
						</th>
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{model.nol}</th>
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{model.epoch}</th>
						{model.accuracy && (<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">{model.accuracy}</th>)}
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{model.detection} - {model.detection/2}</th>
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{parseFloat(model.executionTime)}</th>
						<th scope="row" key={idx} className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{model.timeTaken}</th>

						</tr>
							)
						})}
						

					
					</tbody>
				</table>

				</div>
				</>
			)}
			

			<video src=""  className="w-full h-auto mb-4 bg-black video-feedback"></video>

			<div className="flex flex-wrap mt-8 -mx-4">
			
				<div onClick={()=>sendToServer()} className="flex flex-wrap -mx-4">
					<a className="flex-1 p-4 mx-4 text-lg font-bold text-center uppercase transition-all duration-300 download-video bg-gradient-to-br from-purple-500 to to-pink-500 hover:opacity-90 disabled:opacity-50">
						Send To Server
					</a>
				</div>
				
			
				<button onClick={()=>startRecording()}  className="flex-1 p-4 mx-4 text-lg font-bold uppercase transition-all duration-300 start-recording bg-gradient-to-br from-purple-500 to to-pink-500 hover:opacity-90 disabled:opacity-50">
					Record Screen
				</button>
				<button className="flex-1 p-4 mx-4 text-lg font-bold uppercase transition-all duration-300 stop-recording bg-gradient-to-br from-purple-500 to to-pink-500 hover:opacity-90 disabled:opacity-50" disabled>
					Stop Recording
				</button>
			</div>
			

			<div className="hidden recorded-video-wrap">
				<h2 className="mb-4 text-xl font-light text-gray-500 uppercase">
					Recorded video
				</h2>

				<video src="" className="w-full h-auto mb-8 bg-black recorded-video"></video>
				<div className="flex flex-wrap -mx-4">
					<a className="flex-1 p-4 mx-4 text-lg font-bold text-center uppercase transition-all duration-300 download-video bg-gradient-to-br from-purple-500 to to-pink-500 hover:opacity-90 disabled:opacity-50">
						Download
					</a>
				</div>
				
			</div>
		</div>
	</main>
    </div>
  )
}

export default TakeAttendance