export default function(){


   const allMessage = [["This is rahul",1] , 
   ["hi Rahul this side kunal",2],
   ["mai changa veere" , 1],
   ["mai to user 2 hun",2],
   ["user 2 hai smart",2], ["aacha beta",1]]


   return(
    <>
    <div className="w-full h-screen bg-white flex items-center justify-center flex-col">

        <div className="w-[50%] relative bg-slate-100 rounded-3xl border-2 border-black h-[600px] flex flex-col space-y-4 p-4">
             
        <div>
            {allMessage.map((value,index)=>(
             <>
             <div className="w-full h-auto p-2 mt-3" key={index}>
                <p className={`${value[1] == 1 ? "absolute left-2 font-bold":"absolute right-2 font-bold"}`}>{value[0]}</p>
             </div>
             </>
            ))}
        </div>
         
           
        </div>
        
        <div className="w-[50%] flex flex-col h-auto">
          <input className="w-full border-2 border-black p-2 mt-3" placeholder="Hello Bruh how are you??"></input>
          <button className="bg-purple-700 p-2 mt-2 rounded-lg text-[20px] text-white">Send Message.....</button>
        </div>

    </div>
    </>
   )
}