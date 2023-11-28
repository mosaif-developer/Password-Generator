import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook

  const passwordRef = useRef(null);

const passwordGenerator = useCallback(()=>{
let pass = "";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
if(numAllowed) str += "0123456789";
if(charAllowed) str += "`!@#$%^&*()_-+={}[]~";

for( let i=1; i<=length; i++){
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char);
}

setPassword(pass)

}, [length,numAllowed,charAllowed,setPassword])

const handleClick = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,99);
  window.navigator.clipboard.writeText(password);
},[password])


useEffect(()=>{
  passwordGenerator()
}, [length,numAllowed,charAllowed,passwordGenerator])



  return (
    <>
     <div  
     className='h-screen flex justify-center items-center'>
      <div className='pl-4 w-[480px] h-auto bg-slate-800 rounded-xl shadow-2xl'>

        <h1 className='text-center text-2xl mt-3 text-white'>Password Generator</h1>

        <input 
        className='p-2 mt-5 mb-5 w-[300px] ml-9 h-10 rounded-lg' type="text"
        value={password}
        placeholder='Password'
        ref={passwordRef}
        />

        <button 
        onClick={handleClick}
        className='bg-blue-400 mt-5 mb-5 px-5 py-2 text-white rounded-lg hover:bg-blue-700 duration-200'>Copy</button>

        <div className='flex justify-center gap-x-2 mb-3 text-orange-600 font-semibold'>
          <input className='cursor-pointer' 
          type="range" 
          min={6}
          max= {100}
          value={length}
          onChange={(e)=> {setlength(e.target.value)}}
          />
          <label>Length: {length}</label>

          <input className='cursor-pointer' 
          type="checkbox"
          onChange={()=>{setNumAllowed((prev)=> !prev)}} />
          <label>Numbers</label>

          <input className='cursor-pointer' 
          type="checkbox"
          onChange={()=>{setCharAllowed((prev)=> !prev)}} />
          <label>Characters</label>

        </div>

      </div>
     </div>
    </>
  )
}

export default App
