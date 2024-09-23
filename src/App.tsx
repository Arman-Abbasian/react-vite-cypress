import { useState } from 'react'
import './App.css'
import EditPost from './components/Post/EditPost'
import AddPost from './components/Post/AddPost'
import GetPosts from './components/Post/GetPosts'
import { FormResType } from './CommonTypes'
import { Toaster } from 'react-hot-toast'

function App() {
  const [posts,setPosts]=useState<FormResType[]>([])
  const [id,setId]=useState<string>("");
  return (
      <div>
        <Toaster />
       <h1 data-testid='appTitle'>cypress test</h1>
       <AddPost setPosts={setPosts} />
       <GetPosts posts={posts} setPosts={setPosts} setId={setId} />
       <EditPost id={id} posts={posts} />
    </div>
  )
}

export default App


{/* <div class="go4109123758" style="left: 0px; right: 0px; display: flex; position: absolute; transition: 230ms cubic-bezier(0.21, 1.02, 0.73, 1); transform: translateY(0px); top: 0px; justify-content: center;">
  <div class="go2072408551" style="animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running go3223188581;">
    <div class="go685806154">
      <div class="go1858758034"></div>
        <div class="go1579819456">
          <div class="go2534082608"></div>
        </div>
      </div>
      <div role="status" aria-live="polite" class="go3958317564">Network error:Network Error</div>
  </div>
</div> */}

//Frontend
// {
//   "id": 147953,
//   "productsName": "پیتزا سیر و استیک",
//   "productsUnitName": "عدد",
//   "productsUnitRef": 11,
//   "count": 1,
//   "price": 50000,
//   "discountPrice": 0,
//   "discountPercent": 0,
//   "tax": null
// },


// //Backend
// {
//   "id": 14421,
//   "productsName": "\u0633\u0627\u0646\u062F\u0648\u06CC\u0686 \u0645\u06A9\u0632\u06CC\u06A9\u0646 2",
//   "productUnitName": "\u0639\u062F\u062F",
//   "productUnitRef": 11,
//   "count": 1.00,
//   "price": 1300000.00,
//   "productsRef": 147948,
//   "discount": 0.00,
//   "tax": 0.00,

 

  
//   "barcode": "111228",
//   "shopOrderRef": 11927,
// }
