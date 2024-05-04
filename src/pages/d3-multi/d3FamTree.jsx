import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './TreeChart.css';

const TreeChart = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const data = {
      name: "Eve",
      spouse: { name: "Adam" },
      children: [
        { name: "Cain" },
        { name: "Seth", spouse: { name: "Azura" }, children: [{ name: "Enos" }, { name: "Noam" }] },
        { name: "Abel" },
        { name: "Awan", spouse: { name: "Enoch" } },
        { name: "Azura" }
      ]
    };

    const width = 800;
    const height = 600;

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const extendedNodes = [];
    const extendedLinks = [];

    root.each(node => {
      extendedNodes.push(node);
      if (node.data.spouse) {
        const spouseNode = { ...node, data: node.data.spouse, isSpouse: true };
        spouseNode.x = node.x + 80;
        spouseNode.y = node.y;
        extendedNodes.push(spouseNode);
        extendedLinks.push({ source: node, target: spouseNode, isSpouseLink: true });
      }
    });

    root.links().forEach(link => {
      if (link.source.data.spouse) {
        const midpoint = { x: (link.source.x + (link.source.x + 80)) / 2, y: link.source.y };
        extendedLinks.push({ source: midpoint, target: link.target });
      } else {
        extendedLinks.push({ source: link.source, target: link.target });
      }
    });

    setNodes(extendedNodes);
    setLinks(extendedLinks);
  }, []);

  // Generate stepped bezier path
  const generatePath = (d) => {
    const source = d.source;
    const target = d.target;
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;

    if (d.isSpouseLink) {
      return `M${source.x},${source.y} C${midX},${source.y} ${midX},${source.y} ${target.x},${target.y}`;
    }
    return `M${source.x},${source.y} C${midX},${source.y} ${midX},${target.y} ${target.x},${target.y}`;
  };

  return (
    <div className="tree-container" style={{ position: 'relative', left:'4rem',top:'4rem',width: '800px', height: '600px' }}>
      <svg width="800" height="600">
        {links.map((link, index) => (
          <path
            key={index}
            className="link"
            d={generatePath(link)}
            stroke={link.isSpouseLink ? 'blue' : '#ccc'}
            fill="none"
          />
        ))}
      </svg>
      {nodes.map((node, index) => (
        <div
          key={index}
          className={`node ${node.isSpouse ? 'spouse' : ''}`}
          style={{
            position: 'absolute',
            left: `${node.x}px`,
            top: `${node.y}px`,
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            background: 'white',
            border: '1px solid steelblue',
            borderRadius: '10px',
            textAlign: 'center'
          }}
        >
            <>Title Nmae</>
          <div>{node.data.name}</div>
        </div>
      ))}
    </div>
  );
};

export default TreeChart;
