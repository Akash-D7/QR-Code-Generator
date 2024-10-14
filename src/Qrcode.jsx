import { useState } from "react"

const Qrcode = () => {
    const [img,setImage]=useState("")
    const[loading,setLoading]=useState(false)
    const[qrData,setQrdata]=useState("");
    const[qrSize,setQrsize]=useState("");
    //console.log(arr);
    async function generateQR(){
       setLoading(true);
       try{
         const url=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=${qrSize}x${qrSize}`;
         
         setImage(url);
       }
       catch(error){
console.error("ERROR GENERATING QR CODE",error)
       }
       finally{
        setLoading(false);
       }
    }
    function downloadQR(){
        fetch(img)
        .then((Response)=>(Response).blob())
        .then((blob)=>{
          const link =document.createElement("a");
          link.href=URL.createObjectURL(blob);
          link.download="qr.png";
          document.body.appendChild(link);
          link.click()
          document.body.removeChild(link);

        }).catch((error)=>{("ERROR GENERATING QR CODE",error)

        })
    }
  return (
    <div className=" App_container">
        <h1>QR CODE ENCODER</h1>
        {loading && <p>please wait...</p>}
  {img && <img src={img} className="img"/>}
    <div>
       <label htmlFor="dataInput" className="input_label">Data for QR code</label> 
       <input type="text" className="dataInput" value={qrData} placeholder="Enter Data for QR code" onChange={(event)=>setQrdata(event.target.value)}/>
       <label htmlFor="sizeInput" className="input_label">Image size(e.g.,150):</label> 
       <input type="text" className="dataInput" value={qrSize} placeholder="Enter Image size" onChange={(event)=>setQrsize(event.target.value)}/>
       <div className="ak_button">
       <button className="generate_button" onClick={generateQR} disabled={loading}>Generate QR code</button>
       <button className="download_button" onClick={downloadQR}>Download QR code</button>
       </div>
        </div>
        <p className="">Designed by <a href="https://www.instagram.com/_skyserenade_/">Akash</a></p>
    </div>
   
  )
}

export default Qrcode
