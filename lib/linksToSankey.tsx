import { SankeyGraph, SankeyLink } from "d3-sankey";

export const linksToSankey = (links: SankeyLink<{}, {}>[]): SankeyGraph<{}, {}> => {
  const nodeByName = new Map;
  for (const link of links) {
    if (!nodeByName.has(link.source)) {
      nodeByName.set(link.source, { name: link.source });
    }
    if (!nodeByName.has(link.target)) {
      nodeByName.set(link.target, { name: link.target });
    }
  }

  // We don't provide extra node or link data here so those 
  // SankeyExtraProperties types are empty objects
  return {
    nodes: Array.from(nodeByName.values()),
    links
  };
}

export default linksToSankey;
