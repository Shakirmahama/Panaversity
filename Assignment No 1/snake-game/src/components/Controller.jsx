import React from 'react'

const Controller = ({changeDirection}) => {
  
    return (
    <div className="controller">
      <button onClick={() => changeDirection("UP")}>↑</button>

      <div>
        <button onClick={() => changeDirection("LEFT")}>←</button>

        <button onClick={() => changeDirection("RIGHT")}>→</button>
      </div>

      <button onClick={() => changeDirection("DOWN")}>↓</button>
    </div>
  );

}

export default Controller