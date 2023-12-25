import Template from "./template.js";
import Setting from "./setting.js";

export default function NotFound() {
    document.title='oops!'
    return( <Template>
        <h2 className="p-3 mt-3">Oops! 看來輸入的網址有誤</h2>
        <p className="p-3 mb-0">您可以重新建立一個倒數計時器</p>
        <Setting/>
    </Template> )
}