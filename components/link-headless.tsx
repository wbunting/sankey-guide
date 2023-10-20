import React from "react";
import { SankeyLink, sankeyLinkHorizontal } from "d3-sankey";

export type LinkProps = {
  link: SankeyLink<{}, {}>;
  children: (renderProps: {
    path: string;
    link: SankeyLink<{}, {}>;
  }) => React.ReactElement;
};

export const LinkHeadless = ({ link, children }: LinkProps): React.ReactElement | null => {
  const linkGenerator = sankeyLinkHorizontal();
  const path = linkGenerator(link);

  if (!path) {
    return null;
  }

  const renderProps = {
    path,
    link,
  };

  return children(renderProps);
};

export default LinkHeadless
