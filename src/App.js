import { useEffect, useMemo, useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import 'animate.css';

export default function App() {

  return (

    <div className="card rounded-3 shadow-lg bg-200" data-bs-theme="dark">
      <div className="card-body">
        <h1 className="fs-sp mb-4 text-900">距離<br />離職還剩</h1>
        <CountDown />
        <iframe className="mt-4" src="https://open.spotify.com/embed/track/0PpKyS37jFU3w8iToakC0c?utm_source=generator" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </div>

  )
}

export function CountDown() {
  const [leftDays, setLeftdays] = useState('n');
  const [leftHours, setLefthours] = useState('n');
  const [leftMinutes, setLeftminutes] = useState('n');
  const [leftSeconds, setLeftseconds] = useState('n');
  //const [isExploding, setIsExploding] = useState(false);

  //const time = 1698768000000;
  const time = Date.parse("November 1, 2023");
  const secondsPerDay = 86400;
  const secondsPerHour = 3600;
  const secondsPerMinute = 60;


  useEffect(() => {
    // const animateEl = document.querySelectorAll('.number').forEach(i=>{
    // i.addEventListener('animationend', () => {
    //  i.classList.add('animate__fadeOutDown')
    // })
    // });

    const i = setInterval(() => {
      const timeNow = Date.now();
      const leftTimeTotal = (time - timeNow) / 1000;
      const leftdays = Math.floor(leftTimeTotal / secondsPerDay);
      const lefthours = Math.floor(leftTimeTotal / secondsPerHour - leftdays * 24);
      const leftminutes = Math.floor((leftTimeTotal / secondsPerMinute - lefthours * secondsPerMinute) % secondsPerMinute);
      const leftseconds = Math.floor((leftTimeTotal - leftdays * secondsPerDay) % secondsPerMinute);
      setLeftdays(leftdays);
      setLefthours(lefthours);
      setLeftminutes(leftminutes);
      setLeftseconds(leftseconds);
    }, 1000);

    return () => {
      clearInterval(i);
    };
  });

  return (
    <div className="container">
      <div className="row card bg-900 overflow-hidden rounded-12">
        <div className="col-12 d-flex justify-content-center card-body">
          <div key={leftDays} className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center">
            <h2 className="text-warning">{leftDays}天<ConfettiExplosion key={leftDays}/></h2>
          </div>
          <h2 className="text-warning">-</h2>
          <div key={leftHours+.1} className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center">
            <h2 className="text-warning">{leftHours}時</h2>
          </div>
          <h2 className="text-warning">-</h2>
          <div key={leftMinutes+.2} className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center">
            <h2 className="text-warning">{leftMinutes}分</h2>
          </div>
          <h2 className="text-warning">-</h2>
          <div key={leftSeconds+.3} className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center">
            <h2 className="text-warning">{leftSeconds}秒</h2>
          </div>
        </div>
      </div>
        {/* <ProgressBar/> */}
    </div>
  );
}



// function ProgressBar(){

//   return (
//     <div class="progress">
//   <div className="progress-bar" role="progressbar" style={{width:`${50}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
// </div>
//   )
// }