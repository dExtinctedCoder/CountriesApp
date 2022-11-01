import React from 'react'
import './loading.css'

const Loading = () => {
  return (
    <div style={{padding: "5rem 0", overflow: "hidden"}}>
      <div className="animation-box">

        <div className="border border1"></div>

        <div className="animation">
          <div className="box box1"></div>
          <div className="box box2"></div>
          <div className="box box3"></div>
        </div>

        <div className="border border2"></div>

      </div>
    </div>
  )
}

export default Loading