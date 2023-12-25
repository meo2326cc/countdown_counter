import { useState } from "react";
import { useNavigate } from "react-router";
import { Offcanvas } from "bootstrap";
export default function Sidebar(){

    return(<>
    <div className="position-absolute end-0">
    <button type="button" data-bs-target="#offcanvas" data-bs-toggle="offcanvas" className="btn btn-outline-dark m-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen align-baseline" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
      </button>        
    </div>

    <div className="offcanvas offcanvas-end" tabIndex="-1"  id="offcanvas" >
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">設定</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
       <Setting/>
  </div>
</div>

    </>)
} 




function Setting(){

    const [info , setInfo] = useState({ date:'' , time: '', title: '' })
    const setNewCounter = useNavigate();

    function submit(e){
        e.preventDefault();
        setInfo( { date:'' , time: '', title: '' } )
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
        <input className="form-control mb-3" type="text" id="title" name="title" onChange={handleInput} placeholder="ex.離職" required />            
        </div>
        <div>
        <label htmlFor="date"> 日期 </label>
        <input className="form-control mb-3" type="date" name="date" onChange={handleInput} required />
        </div>
        <div>
        <label htmlFor="time"> 時間 </label>            
        <input className="form-control mb-3" type="time" name="time" onChange={handleInput} required/>
        </div>
        <input className="form-control mb-3 btn-primary btn" type="submit"  data-bs-dismiss="offcanvas" />    
     </form>
     <div className="border-top px-3">
      <h3 className="fs-5 my-3"> 直接倒數</h3>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={()=> setTime(30 , '半小時') } data-bs-dismiss="offcanvas" >半小時 </button>
        <button className="btn btn-primary" onClick={()=> setTime(60 , '一小時') } data-bs-dismiss="offcanvas" >一小時 </button>
        <button className="btn btn-primary" onClick={()=> setTime(120 , '二小時') } data-bs-dismiss="offcanvas" >二小時 </button>
        <button className="btn btn-primary" onClick={()=> setTime(360 , '六小時') } data-bs-dismiss="offcanvas" >六小時 </button>
      </div>

     </div>
     </>)


}