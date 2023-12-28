import { useState } from "react";
import { useNavigate } from "react-router";
import { Offcanvas } from "bootstrap";


export default function Setting(){

    const [info , setInfo] = useState({ date:'' , time: '', title: '' })
    const setNewCounter = useNavigate();

    function submit(e){
        e.preventDefault();

        setNewCounter( '/' + info.date + info.time + '/' + startTime(new Date()) + '/' + info.title  )
    }

    function setTime( futureTimeMinutes , title ) {
      const targetTime = new Date()
      targetTime.setTime( new Date().getTime() + futureTimeMinutes * 1000 * 60 )
      setNewCounter(  '/' + startTime(targetTime) + '/' + startTime(new Date()) + '/' + title  )
    }

    function startTime(timeObj) {
        const year = timeObj.getFullYear()
        const month = timeObj.getMonth() + 1
        const date = timeObj.getDate()
        const hours = timeObj.getHours()
        const minutes = timeObj.getMinutes()
        const seconds = timeObj.getSeconds()
        const time = [year , month , date , hours , minutes , seconds ]
        
        return time.map( item => {
            return item < 10 ? '0' + item : item
        } ).join('')
    }

    function handleInput(e){
        switch (e.target.name) {
            case 'title': return setInfo({ ...info ,title : e.target.value});
            case 'date': return setInfo({ ...info , date: e.target.value.split('-').join('') });
            case 'time': return setInfo({ ...info , time: e.target.value.split(':').join('')  });
            default: break
        }  
    }

    return(<>
    <form onSubmit={submit} className="p-3">
        <div>
        <label htmlFor="title"> 主題 </label>
        <input className="form-control mb-3 text-center" type="text" id="title" name="title" onChange={handleInput} placeholder="ex.離職" required pattern="[^/]"/>            
        </div>
        <div>
        <label htmlFor="date"> 日期 </label>
        <input className="form-control mb-3 text-center" type="date" name="date" onChange={handleInput} required />
        </div>
        <div>
        <label htmlFor="time"> 時間 </label>            
        <input className="form-control mb-3 text-center" type="time" name="time" onChange={handleInput} required />
        </div>
        <input className="form-control  my-3 btn-primary btn" type="submit"/>    
     </form>
     <div className="border-top px-3">
      <h3 className="fs-5 my-3"> 直接倒數</h3>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={()=> setTime(30 , '半小時') }  >半小時 </button>
        <button className="btn btn-primary" onClick={()=> setTime(60 , '一小時') }  >一小時 </button>
        <button className="btn btn-primary" onClick={()=> setTime(120 , '二小時') }  >二小時 </button>
        <button className="btn btn-primary" onClick={()=> setTime(360 , '六小時') }  >六小時 </button>
      </div>

     </div>
     </>)


}