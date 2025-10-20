import React from 'react';

interface ConfirmModalProps {
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ text, onCancel, onConfirm }) => {
  return (

<div style={{
  position:'fixed', top:0, left:0, width:'100%', height:'100%',
  backgroundColor:'rgba(0,0,0,0.4)',
  display:'flex', justifyContent:'center', alignItems:'center'
}}>
  <div style={{
    background:'white', padding:'20px', borderRadius:'8px',
    minWidth:'300px', boxShadow:'0 4px 12px rgba(0,0,0,0.3)'
  }}>
    <p>{text}</p>
    <div style={{textAlign:'center', marginTop:'10px'}}>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel} style={{backgroundColor:'#e53935'}}>Cancel</button>
    </div>
  </div>
</div>

  );
};

export default ConfirmModal;
