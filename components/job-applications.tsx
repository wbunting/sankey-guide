'use client'

import { csvParseRows } from 'd3-dsv';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import linksToSankey from '@/lib/linksToSankey';
import { SankeyExtraProperties } from 'd3-sankey';
import { SankeyClientHeadless, SankeyPropsHeadlessBase } from './sankey-client-headless';
import { PrestyledSankey } from './prestyled-sankey';

const Sankey = <
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
>({
  data,
  width,
  height,
}: SankeyPropsHeadlessBase<N, L>): JSX.Element => {
  return (
    <SankeyClientHeadless data={data} width={width} height={height}>
      {(renderProps) => <PrestyledSankey {...renderProps} />}
    </SankeyClientHeadless>
  );
};

const JobApplicationsSankey = () => {
  const jobApplications = `Berlin,Job Applications,102
Barcelona,Job Applications,39
Madrid,Job Applications,35
Amsterdam,Job Applications,15
Paris,Job Applications,14
London,Job Applications,6
Munich,Job Applications,5
Brussels,Job Applications,4
Dubai,Job Applications,3
Dublin,Job Applications,3
Other Cities,Job Applications,12
Job Applications,No Response,189
Job Applications,Responded,49,orange
Responded,Rejected,38
Responded,Interviewed,11,orange
Interviewed,No Offer,8
Interviewed,Declined Offer,2
Interviewed,Accepted Offer,1,orange`

  const links = csvParseRows(jobApplications,
    ([source, target, valueString, linkColor = 'gray']) => {
      const value = parseFloat(valueString);

      return (source && target ? {
        source,
        target,
        value: isNaN(value) ? 1 : value,
        color: linkColor
      } : null)
    });

  const data = linksToSankey(links);

  return (
    <div className="w-full h-[500px]">
      <ParentSize className="graph-container" debounceTime={10}>
        {({ width, height }) => <Sankey data={data} width={width} height={height} />}
      </ParentSize>
    </div>
  )

}

export default JobApplicationsSankey;
