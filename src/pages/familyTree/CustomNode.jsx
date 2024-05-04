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
      <div className='react-flow__node-default'
      >
        <div>{data.label}</div>
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
        <Handle
          type="source"
          position={Position.Bottom}
          id={data.id+"-bottom"}
          style={{ ...DEFAULT_HANDLE_STYLE,     background: 'black' }}
          isConnectable={isConnectable}
        />:<></>}
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
          type="source"
          position={Position.Top}
          id={data.id+"-top"}
          style={{ ...DEFAULT_HANDLE_STYLE, background: 'black' }}
          isConnectable={isConnectable}/>
      </div>
    </>
  );
});
