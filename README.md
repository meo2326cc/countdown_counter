# 倒數計時器
具有分享功能的網頁倒數計時器app

## 功能特色
- 自訂主題：可以自己想想倒數的主題然後倒數，只要想得到的都行
- 快速倒數：或是也可以直接選擇想要倒數的時間開始
- 分享功能：將資訊儲存在網址列，如此一來就可以將自己的計時器傳給別人，而且不需要後端來儲存資訊，主要功能完全依靠網址參數來生成對應的資訊
- 方便多開：可以方便儲存在手機瀏覽器的分頁中，建立時會開在新視窗中，方便一次建立多個倒數

## 為什麼做這個
當初是因為想要計算距離自己離職&出國去玩還剩多久做的，不過覺得只拿來做單一目的太可惜，不如把它做成一款真正能運用的工具，可以輸入想要倒數的主題與時間開始倒數，也可以分享連結給其他人，靈感的來源是[朋友旅行防止絕交檢查表](https://travel-questions.gnehs.net/)這個作品中，做完測驗的分享結果也使用網址參數儲存結果。

## 主要架構
### 路由設計
```javascript

const router = createHashRouter([
      {
      path: "/",
      element: <HomePage/>,
      },
      {
      path:':time/:start/:title',//參數分別代表：指定倒數結束時間/計時器建立時間/倒數主題的名稱
      element:<App/>,
      },
      {
        path:'*',
        element:<NotFound/>,
  
      }
  ]);

```
1. 在設計上以`<HomePage/>`為主要的進入點，以裡面的表單將使用者填寫的資訊用react-router當中的useNavigate這個hook將網頁定向至
"/:time/:start/:title"，其中time是倒數結束的時間；start是計時器建立時間；title是主題的名稱。

2. 轉址成功後至`<App/>`元件後，由其中的`<CountDown/>`來負責解析網址的參數並建立時間物件

### 元件運作邏輯

```
<App/>   //主要頁面主元件，將網址參數解析成毫秒後傳給下層元件元件進行處理
├── <CountDown/>   //將傳進的倒數結束時間寫入並用setIntervel每秒更新結束時間與現在時間的差距並渲染至畫面
│       └── <ProgressBar/>   //傳入計時器建立時間與結束時間，並計算成百分比來決定畫面中進度條的寬度
├── <Info/>   //顯示倒數開始時間與結束時間
├── <LinkArea/>   //製作複製網址的元件
└── <Sidebar/>    //讓使用者建立新的倒數計時器，完成後使用window.open( #/指定倒數結束時間/計時器建立時間/倒數主題的名稱  )

```


## 專案檢討