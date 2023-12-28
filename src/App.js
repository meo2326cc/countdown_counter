import { useEffect, useReducer, useState, memo } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useParams } from "react-router";
import Sidebar from "./sidebar.js";
import "animate.css";
import Template from "./template.js";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function App() {
  const { title, start, time } = useParams();
  const timeInfo = handelId(time);
  const progressTime = handelId(start);
  document.title = title;

  function handelId(timeInfo) {
    if (timeInfo === undefined) {
      return 0;
    } else {
      const dateArr = [];
      dateArr.push(Number(timeInfo.slice(0, 4)));
      dateArr.push(Number(timeInfo.slice(4, 6)));
      dateArr.push(Number(timeInfo.slice(6, 8)));
      dateArr.push(Number(timeInfo.slice(8, 10)));
      dateArr.push(Number(timeInfo.slice(10, 12)));
      if (timeInfo.length >= 12) {
        dateArr.push(Number(timeInfo.slice(12, 14)));
      }

      return dateArr;
    }
  }

  return (
    <Template>
      <Sidebar />
      <div className="card-body">
        <h1 className="fs-sp mb-4 text-900">
          距離
          <br />
          {title}還剩
        </h1>
        <CountDown id={timeInfo} progressTime={progressTime} />
        <Info timeInfo={timeInfo} progressTime={progressTime} />
        <LinkArea />
      </div>
    </Template>
  );
}

function LinkArea() {
  const [copied, setCopied] = useState(false);

  return (
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={document.URL}
        />
    <CopyToClipboard
      text={document.URL}
      onCopy={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
        <button
          className="btn btn-success"
          style={{ width: "150px" }}
          type="button"
          id="button-addon2"
        >
          {copied ? "已複製！" : "分享計時器網址"}
        </button>
    </CopyToClipboard>        
      </div>

  );
}

function Info({ timeInfo, progressTime }) {
  return (
    <div className="bg-300 mt-4 rounded p-3 box-shadow">
      <p className="m-0">
        開始時間：
        {`${progressTime[0]}年${progressTime[1]}月${progressTime[2]}日${progressTime[3]}時${progressTime[4]}分`}
      </p>
      <p className="m-0">
        結束時間：
        {`${timeInfo[0]}年${timeInfo[1]}月${timeInfo[2]}日${timeInfo[3]}時${timeInfo[4]}分`}
      </p>
    </div>
  );
}

function CountDown({ id, progressTime }) {
  function reducer(state, action) {
    switch (action.type) {
      case "SETTIME":
        return {
          leftDays: action.days,
          leftHours: action.hours,
          leftMinutes: action.minutes,
          leftSeconds: action.seconds,
          countOver: state.countOver,
        };
      case "TIMEOVER":
        return {
          ...state,
          countOver: true,
        };
      default:
        break;
    }
    return;
  }
  const [state, dispatch] = useReducer(reducer, {
    leftDays: "n",
    leftHours: "n",
    leftMinutes: "n",
    leftSeconds: "n",
    countOver: false,
  });

  const time = new Date(id[0], id[1] - 1, id[2], id[3], id[4], id[5]).getTime();
  const secondsPerDay = 86400;
  const secondsPerHour = 3600;
  const secondsPerMinute = 60;

  useEffect(() => {
    if (time - Date.now() >= 0) {
      const i = setInterval(() => {
        const timeNow = Date.now();
        const leftTimeTotal = (time - timeNow) / 1000;
        const leftdays = Math.floor(leftTimeTotal / secondsPerDay);
        const lefthours = Math.floor(
          leftTimeTotal / secondsPerHour - leftdays * 24
        );
        const leftminutes = Math.floor(
          (leftTimeTotal / secondsPerMinute - lefthours * secondsPerMinute) %
            secondsPerMinute
        );
        const leftseconds = Math.floor(
          (leftTimeTotal - leftdays * secondsPerDay) % secondsPerMinute
        );

        dispatch({
          type: "SETTIME",
          days: leftdays,
          hours: lefthours,
          minutes: leftminutes,
          seconds: leftseconds,
        });
      }, 1000);

      return () => {
        clearInterval(i);
      };
    } else {
      dispatch({ type: "SETTIME", days: 0, hours: 0, minutes: 0, seconds: 0 });
      dispatch({ type: "TIMEOVER" });
    }
  }, [state.leftSeconds, id]);

  return (
    <div className="container">
      <div className="row card bg-900 overflow-hidden rounded-12">
        <div className="col-12 d-flex justify-content-center card-body">
          <div
            key={state.leftDays}
            className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center"
          >
            <h2 className="text-warning">
              {state.leftDays}天{state.countOver && <ConfettiExplosion />}
            </h2>
          </div>
          <h2 className="text-warning">-</h2>
          <div
            key={state.leftHours + 0.1}
            className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center"
          >
            <h2 className="text-warning">{state.leftHours}時</h2>
          </div>
          <h2 className="text-warning">-</h2>
          <div
            key={state.leftMinutes + 0.2}
            className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center"
          >
            <h2 className="text-warning">{state.leftMinutes}分</h2>
          </div>
          <h2 className="text-warning">-</h2>
          <div
            key={state.leftSeconds + 0.3}
            className="animate__animated animate__fadeInDown animate__faster number d-flex justify-content-center"
          >
            <h2 className="text-warning">{state.leftSeconds}秒</h2>
          </div>
        </div>

      </div>
      <ProgressBar
        update={state.leftSeconds}
        time={time}
        progressTime={progressTime}
      />
    </div>
  );
}

function ProgressBar({ update, time, progressTime }) {


  const startTime = new Date(
    progressTime[0],
    progressTime[1] - 1,
    progressTime[2],
    progressTime[3],
    progressTime[4],
    progressTime[5]
  ).getTime();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = 100 - ((time - Date.now()) / (time - startTime)) * 100;
    setProgress(calc.toFixed(4));
  }, [update]);

  if (progress >= 100) {
    return (
      <div className="progress row mt-4 bg-300">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `100%` }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          100%
        </div>
      </div>
    );
  }
  return (
    <div className="progress row mt-4 bg-300">
      <div
        className="progress-bar bg-warning"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
  );
}
