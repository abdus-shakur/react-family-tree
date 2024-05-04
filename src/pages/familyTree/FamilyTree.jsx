import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

import * as dat from './data'

const nodeTypes = {
    custom: CustomNode,
  };

var initialNodes = [
  { id: "1", sourcePosition: 'right' ,position: { x: 0, y: 0 }, data: { id:"1",label: "Husband" },type:'custom' },
  { id: "2", sourcePosition: 'bottom',targetPosition: 'left',position: { x: 200, y: 0 }, data: { label: "Teste 1" } },
  { id: "3", sourcePosition: 'bottom',targetPosition: 'right',position: { x: -170, y: 0 }, data: { label: "Test 2" } },
  { id: "4", targetPosition: 'top',position: { x: 100, y: 100 }, data: { label: "Son" } },
  { id: "5", sourcePostion:'none', position: { x: -100, y: 100 }, data: { label: "Daughter" } },
 
];

let childStyle = 'bezier';
var initialEdges = [
    { id: "e1-2",source: "1",target: "2" ,type: 'straight',sourceHandle: '1-right',},
    { id: "e1-3", source: "1", target: "3" ,type: 'straight',sourceHandle: '1-left',},
    { id: "e1-4", source: "1", target: "4" ,type: childStyle,sourceHandle: '1-bottom'},
    { id: "e1-5",source: '1', target: '5', type: childStyle,animated: false,sourceHandle: '1-bottom' },
    { id: "e2-4", source: "2", target: "4" , type: childStyle,},
    { id: "e2-5", source: "2", target: "5" ,type: childStyle,  targetHandle: 'targetHandle'},

];

var tempNodes = []
var tempEdges = []
var levelData = {}
var levelObject = {}

function recLevel(data, level){
  data?.spouses?.forEach(spouse=>{
    levelData[level]= (levelData[level]||0)+1;
    if (!levelObject[level])
      levelObject[level] = []
    levelObject[level].push(data.label)
    if(!data)
      return
    recLevel(spouse.children,level+1)
  })
  data?.children?.forEach(spouse=>{
    levelData[level]= (levelData[level]||0)+1;
    if (!levelObject[level])
      levelObject[level] = []
    levelObject[level].push(data.label)
    if(!data)
      return
    recLevel(spouse.spouse,level+1)
  })
  
}

function recData(value, x, y,index,level){
    let node = {};
    node.id = value.id;
    node.type = 'custom';
    node.data = value;
    let position = {};
    position.x = x;
    position.y = y;
    node.position = position;
    // node.data.label = value.name;
    value?.spouses?.forEach((spouse,index)=>{
        var edge = {};
        edge.id = `e${value.id}-${spouse.id}`
        edge.source = value.id;
        edge.target = spouse.id;
        edge.type = 'bezier';
        edge.sourceHandle = `${value.id}-${index%2==0?'right':'left'}`
        edge.targetHandle = `${spouse.id}-${index%2==0?'left':'right'}`
        tempEdges.push(edge);

        let node = {};
        node.id = spouse.id;
        node.type = 'custom';
        node.data = spouse;
        let position = {};
        position.x = index%2==0?x+=200:x-=(x*2);
        position.y = index%2==0?y:y;
        node.position = position;
        recData(spouse,x,y,index,level+1)
        tempNodes.push(node);
        // childStyle = 'bezier';
        
        
    })
    y += 100;
    if(value?.children?.length>0){
        x -= (value.children.length * 200) - 200;
    }
    value?.children?.forEach(child=>{
        let edge = {};
        edge.id = `e${value.id}-${child.id}`
        edge.source = value.id;
        edge.target = child.id;
        edge.type = 'smoothstep';
        edge.sourceHandle = `${value.id}-${index%2==0?'left':'right'}`
        edge.targetHandle = `${child.id}-${index%2==0?'right':'left'}`
        recData(child,x+=200, y,index,level+1);
        tempEdges.push(edge);
    })
    tempNodes.push(node);
}

function generateData(){
    recData(dat.data, 0,0,{},0,0);
    console.log(tempNodes);
    console.log(tempEdges);
    initialNodes = tempNodes;
    initialEdges = tempEdges;
}

generateData();
recLevel(dat.data,0);
console.log(levelData)
console.log(levelObject)

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );

    const reactFlowInstance = useRef(null);

    useEffect(() => {
        if (reactFlowInstance.current) {
            reactFlowInstance.current.fitView();
        }
      }, []);
    
   
    return (
      <div style={{ width: '100vw', height: '100vh' }} >
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          instance={reactFlowInstance}
          fitView
          nodeTypes={nodeTypes}
        // minZoom={1.5}
        >
         <Controls showInteractive={false}  showFitView={true} position="right"/>
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
  }
