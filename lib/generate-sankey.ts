import {
  sankey,
  sankeyCenter,
} from "d3-sankey";

export type SankeyOptions = {
  margin?: {
    x: number;
    y: number;
  };
  nodeWidth?: number;
  nodePadding?: number;
};

export const generateSankey = (
  width: number,
  height: number,
  options: SankeyOptions = {
    margin: { x: 0, y: 0 },
    nodeWidth: 26,
    nodePadding: 29,
  }
) => {
  return sankey()
    .nodeId((node) => node.name)
    .nodeWidth(options.nodeWidth || 26)
    .nodePadding(4)
    .extent([
      [options?.margin?.x || 0, options?.margin?.y || 0],
      [width - (options.margin?.x || 0), height - (options.margin?.y || 0)],
    ])
    .nodeAlign(sankeyCenter);
};

export default generateSankey;
