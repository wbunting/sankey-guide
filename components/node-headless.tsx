import React from "react";
import {
  SankeyNode,
} from "d3-sankey";

export type NodeProps = {
  node: SankeyNode<{}, {}>;
  children: (renderProps: {
    height: number;
    node: SankeyNode<{}, {}>;
  }) => React.ReactElement;
};

export const NodeHeadless = ({ node, children }: NodeProps): React.ReactElement | null => {
  const y0 = node.y0 ?? 0;
  const y1 = node.y1 ?? 0;

  const renderProps = {
    height: y1 - y0,
    node,
  };

  return <g key={node.index}>{children(renderProps)}</g>;
};

export default NodeHeadless;
