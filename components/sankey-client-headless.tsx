import React from "react";
import {
  SankeyExtraProperties,
  SankeyGraph,
} from "d3-sankey";
import generateSankey from "@/lib/generate-sankey";

export type SankeyPropsHeadlessBase<
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
> = {
  data: SankeyGraph<N, L>;
  width: number;
  height: number;
};

export type SankeyPropsHeadless<
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
> = SankeyPropsHeadlessBase<N, L> & {
  children:
  | ((renderProps: {
    nodes: any;
    links: any;
    nodeWidth: any;
  }) => React.ReactNode)
  | React.ReactNode;
  style?: React.CSSProperties;
};

const _SankeyClientHeadless = <
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
>(
  { data, children, width, height, style }: SankeyPropsHeadless<N, L>,
  ref: React.Ref<SVGSVGElement | null>
): JSX.Element => {
  const innerRef = React.useRef<SVGSVGElement>(null);
  const sankeyGenerator = generateSankey(width, height);
  const { nodes, links } = sankeyGenerator(data);
  const nodeWidth = sankeyGenerator.nodeWidth();

  React.useImperativeHandle(
    ref,
    () => {
      return innerRef.current;
    },
    [innerRef]
  );

  const renderProps = {
    nodes,
    links,
    nodeWidth,
  };

  let content;

  // Check if children is a function
  if (typeof children === "function") {
    content = children(renderProps);
  }
  // If children is a React component, clone it and pass renderProps as its props
  else if (React.isValidElement(children)) {
    content = React.cloneElement(children, renderProps);
  }

  return (
    <svg width={width} height={height} style={style} ref={innerRef}>
      {content}
    </svg>
  );
};

export const SankeyClientHeadless = React.forwardRef(_SankeyClientHeadless);

