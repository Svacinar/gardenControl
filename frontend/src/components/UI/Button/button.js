import React from 'react';



const button = (props) => {
  console.log(props);
  let text = props.name
  if (props.status) {
    text += " is ON" 
  } else {
    text+= " is OFF"
  }
  return (
    <button type="button" className="btn" onClick={e => props.clicked(e, "valve2")}>{text}</button>
  )};

export default button