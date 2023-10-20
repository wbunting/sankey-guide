"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    component: 'PrestyledSankey',
    path: 'prestyled-sankey'
  },
  {
    component: 'SankeyClientHeadless',
    path: 'sankey-client-headless'
  },
  {
    component: 'SankeyServerHeadless',
    path: 'sankey-server-headless'
  },
  {
    component: 'ZoomableSankey',
    path: 'zoomable-sankey'
  },
  {
    component: 'LinkHeadless',
    path: 'link-headless'
  },
  {
    component: 'NodeHeadless',
    path: 'node-headless'
  },
  {
    component: 'NodeLabelHeadless',
    path: 'node-label-headless'
  },
]

const SidebarComponents = () => {
  const pathname = usePathname();

  return (
    <div className="pb-4">
      <h4 className="px-2 py-1 mb-1 text-sm font-semibold rounded-md">
        Components
      </h4>
      <div className="grid grid-flow-row text-sm auto-rows-max">
        {LINKS.map(l => (
          <Link
            className={`flex items-center w-full px-2 py-1 border border-transparent rounded-md group hover:underline ${pathname === `/components/${l.path}`
              ? ""
              : "text-muted-foreground"
              }`}
            target=""
            rel=""
            href={`/components/${l.path}`}
          >
            {l.component}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarComponents;
