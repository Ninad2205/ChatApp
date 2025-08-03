import React, { useState } from 'react'

const InputText = ({addMessage}) => {
    const [message,setMessage] = useState()
    const sendMessage=()=>{
        addMessage({message})
        setMessage("")
    }
  return (
    <div className='input_text_container'>
      <input 
        type="textarea" 
        rows="6"
        placeholder="Type a message..."
        onChange={(e)=>setMessage(e.target.value)}
        className='message_input'
      />
      <button onClick={sendMessage} className='send_btn'>
        {/* Icon will be added via CSS */}
      </button>
    </div>
  )
}

export default InputText
