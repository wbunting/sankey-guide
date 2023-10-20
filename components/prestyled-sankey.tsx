import React from "react";
import {
  SankeyLink,
  SankeyNode,
} from "d3-sankey";
import LinkHeadless from "@/components/link-headless";
import NodeHeadless from "@/components/node-headless";
import NodeLabelHeadless from "@/components/node-label-headless";

type PrestyledProps = {
  nodes: SankeyNode<{ name: string }, {}>[];
  links: SankeyLink<{}, {}>[];
  nodeWidth: number;
} & {
  fontSize?: number;
};

export const PrestyledSankey: React.FC<PrestyledProps> = ({
  nodes,
  links,
  nodeWidth,
  fontSize = 10,
}) => (
  <g style={{ font: `${fontSize}px sans-serif` }}>
    {links.map((link, i) => (
      <LinkHeadless key={i} link={link}>
        {({ path }) => (
          <path
            d={path}
            stroke="#ffffff"
            fill="none"
            strokeOpacity={0.1}
            strokeWidth={link.width}
          />
        )}
      </LinkHeadless>
    ))}
    {nodes.map((node, index) => (
      <React.Fragment key={index}>
        <NodeHeadless node={node}>
          {({ height: nodeHeight }) => (
            <rect
              height={nodeHeight}
              width={nodeWidth}
              x={node.x0}
              y={node.y0}
              stroke={"black"}
              fill="#a53253"
              fillOpacity={0.8}
              rx={0.9}
            />
          )}
        </NodeHeadless>
        <NodeLabelHeadless node={node} width={100}>
          {({ x, y, textAnchor }) => (
            <text x={x} y={y} dy="0.35em" textAnchor={textAnchor} fill="white">
              {node.name}
            </text>
          )}
        </NodeLabelHeadless>
      </React.Fragment>
    ))}
  </g>
);

