import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DEFAULT_HANDLE_STYLE = {
//   width: 10,
//   height: 10,
//   bottom: -5,
};

export default memo(({ data, isConnectable }) => {
  isConnectable = true;

  
  return (
    <>
      {/* <div className='react-flow__node-default'
      > */}
        <div
            className="node-foreign-object-div"
            style={{ width: "220px", height: "85px" }}
            
          >
            
            <div style={{ fontFamily: ['Inter', 'sans-serif'], backgroundColor: '#040910', position: 'absolute', marginTop: '-1px', marginLeft: '-1px', width:'220px',height:'85px', borderRadius: '10px', border: '1px solid #2599DD'}}>
            <div
              style={{
                backgroundColor: "#B41425",
                position: "absolute",
                marginTop: "-25px",
                marginLeft: "15px",
                borderRadius: "100px",
                width: "50px",
                height: "50px",
              }}
            ></div>
            <img
              src="https://bumbeishvili.github.io/avatars/avatars/portrait84.png"
              style={{ position: 'absolute', marginTop: '-20px', marginLeft: '-90px', borderRadius: '100px', width: '40px', height: '40px'}}
            />
            
            <div
              style={{
                fontSize: "15px",
                color: data?.gender=='M'?"#289AD0":"pink",
                marginLeft: "20px",
                marginTop: "32px",
              }}
            >
              
              {" "}
              {data.label}{" "}
              {data?.children?.length>0?<span>🟢</span>:<span>🔴</span>}
            </div>
            {data.dob||data.dod?
            <div
              style={{
                color: "#289AD0",
                marginLeft: "20px",
                marginTop: "3px",
                fontSize: "10px",
              }}
            >
              {" "}
              {data.dob?" "+data.dob+" ":""}
              {data.dod?"-> "+data.dod+" ":""}
              
            </div>:<></>}
            
          </div>
          </div>
        {/* <div style={{textAlign:'left',fontSize:'8px'}}>Age : 24</div> */}
        {data.dob?<div style={{textAlign:'left',fontSize:'8px'}}>Birth : {data.dob}</div>:<></>}
        {/* <div style={{textAlign:'left',fontSize:'8px'}}>Children Count : 5</div> */}
        {data?.spouses?.length>1?
        <Handle
          type="source"
          id={data.id+"-left"}
          position={Position.Left}
          style={{ ...DEFAULT_HANDLE_STYLE,  background: 'black' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />:<></>}
        {data?.children?.length>0||data?.spouses?.length>0?
        <>
        {/* <Handle
        type="target"
        position={Position.Bottom}
        id={data.id+"-left"}
        style={{ ...DEFAULT_HANDLE_STYLE,     background: 'black' }}
        isConnectable={isConnectable}
      /> */}
        <Handle
          type="source"
          position={Position.Bottom}
          id={data.id+"-bottom"}
          style={{ ...DEFAULT_HANDLE_STYLE,     background: 'black' }}
          isConnectable={isConnectable}
        /></>:<></>}
        {data?.spouses?.length>0?
        <Handle
          type="source"
          position={Position.Right}
          id={data.id+"-right"}
          style={{ ...DEFAULT_HANDLE_STYLE, background: 'black' }}
          isConnectable={isConnectable}
        />:<></>
        }
        <Handle
          type="target"
          position={Position.Top}
          id={data.id+"-top"}
          style={{ ...DEFAULT_HANDLE_STYLE, background: 'black' }}
          isConnectable={isConnectable}/>
      {/* </div> */}
    </>
  );
});
