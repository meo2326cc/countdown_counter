import Setting from "./setting.js";

export default function HomePage(){

    document.title='隨便的倒數計時器'

    return (
      <div className="container card rounded-3 shadow-lg bg-200 p-3">
        <div className="row gx-0">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-start">
            <div className="px-3">
              <h1 className="fs-sp mb-4 text-900">
                隨便的
                <br />
                倒數計時器
              </h1>
              <p className="fs-3">隨便輸入主題與結束的時間後開始， <br/> 或直接倒數 </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <Setting />
            </div>
          </div>
        </div>
      </div>
    );

}