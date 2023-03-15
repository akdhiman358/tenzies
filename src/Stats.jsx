import React from "react";

export default function Stats(props){
    console.log(props)
    return(
    <div className="stats">
            <p>Moves</p>
            <p>{props.moves}</p>
    </div>
    )
}