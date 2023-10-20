import React from "react";
import {
  SankeyNode,
} from "d3-sankey";

type LabelTextAnchor = "start" | "end";
export type NodeLabelProps = {
  node: SankeyNode<{}, {}>;
  width: number;
  children: (renderProps: {
    x: number;
    y: number;
    textAnchor: LabelTextAnchor;
    node: SankeyNode<{}, {}>;
  }) => React.ReactElement;
};

export const NodeLabelHeadless = ({
  node,
  width,
  children,
}: NodeLabelProps): React.ReactElement | null => {
  const x0 = node.x0 ?? 0;
  const x1 = node.x1 ?? 0;
  const y0 = node.y0 ?? 0;
  const y1 = node.y1 ?? 0;

  const x = x0 < width / 2 ? x1 : x0;
  const y = (y1 + y0) / 2;
  const textAnchor: LabelTextAnchor = x0 < width / 2 ? "start" : "end";

  const renderProps = {
    x,
    y,
    textAnchor,
    node,
  };

  return children(renderProps);
};

export default NodeLabelHeadless;
