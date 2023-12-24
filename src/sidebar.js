import { useState } from "react";
import { useNavigate } from "react-router";
import { Offcanvas } from "bootstrap";
export default function Sidebar(){

    return(<>
    <div className="position-absolute end-0">
    <button type="button" data-bs-target="#offcanvas" data-bs-toggle="offcanvas" className="btn btn-primary"><span className="navbar-toggler-icon"></span></button>        
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
        setNewCounter( '/' + info.date + info.time + '/' + startTime() + '/' + info.title  )
    }

    function startTime() {
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const date = new Date().getDate()
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        const time = [year , month , date , hours , minutes , seconds ]
        
        return time.map( item => {
            return item < 10 ? '0' + item : item
        } ).join('')
    }

    console.log(startTime())

    function handleInput(e){
        switch (e.target.name) {
            case 'title': return setInfo({ ...info ,title : e.target.value});
            case 'date': return setInfo({ ...info , date: e.target.value.split('-').join('') });
            case 'time': return setInfo({ ...info , time: e.target.value.split(':').join('')  });
            default: break
        }  
    }

    return(
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
        <input className="form-control mb-3" type="time" name="time" onChange={handleInput}/>
        </div>
        <input className="form-control mb-3 btn-primary btn" type="submit"  data-bs-dismiss="offcanvas" />    
     </form>)
}