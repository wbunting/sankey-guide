import React, { CSSProperties } from "react";
import {
  SankeyExtraProperties,
  SankeyGraph,
} from "d3-sankey";
import generateSankey from "@/lib/generate-sankey";

export type SankeyServerHeadlessPropsBase<
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
> = {
  data: SankeyGraph<N, L>;
  options?: {
    margin: { top: number; right: number; bottom: number; left: number };
  };
};

export type SankeyServerHeadlessProps<
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
> = SankeyServerHeadlessPropsBase<N, L> & {
  children: (renderProps: {
    nodes: any;
    links: any;
    nodeWidth: any;
  }) => React.ReactNode;
};

export const SankeyServerHeadless = <
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
>({
  data,
  children,
  options = { margin: { top: 6, right: 8, bottom: 25, left: 25 } },
}: SankeyServerHeadlessProps<N, L>): JSX.Element => {
  const sankeyGenerator = generateSankey(100, 100, {
    nodeWidth: 5,
    nodePadding: 10,
  });
  const { nodes, links } = sankeyGenerator(data);
  const nodeWidth = sankeyGenerator.nodeWidth();

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
    <div
      className="@container relative h-full w-full"
      style={
        {
          "--marginTop": `${options.margin.top}px`,
          "--marginRight": `${options.margin.right}px`,
          "--marginBottom": `${options.margin.bottom}px`,
          "--marginLeft": `${options.margin.left}px`,
        } as CSSProperties
      }
    >
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {content}
        </svg>
      </svg>
    </div>
  );
};
