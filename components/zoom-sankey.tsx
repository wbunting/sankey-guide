import React from "react";
import { Button } from "@/components/ui/button"
import {
  SankeyExtraProperties,
} from "d3-sankey";
import { Zoom } from "@visx/zoom";
import { SankeyClientHeadless, SankeyPropsHeadlessBase } from "@/components/sankey-client-headless";
import { PrestyledSankey } from "@/components/prestyled-sankey";


const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: -211.62,
  translateY: 162.59,
  skewX: 0,
  skewY: 0,
};

export const ZoomSankey = <
  N extends SankeyExtraProperties,
  L extends SankeyExtraProperties
>({
  data,
  width,
  height,
}: SankeyPropsHeadlessBase<N, L>): JSX.Element => {
  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1 / 2}
      scaleXMax={4}
      scaleYMin={1 / 2}
      scaleYMax={4}
      initialTransformMatrix={initialTransform}
    >
      {(zoom) => (
        <div className="relative">
          <SankeyClientHeadless
            data={data}
            width={width}
            height={height}
            style={{
              cursor: zoom.isDragging ? "grabbing" : "grab",
              touchAction: "none",
            }}
            ref={zoom.containerRef}
          >
            {(renderProps) => (
              <>
                <g transform={zoom.toString()}>
                  <PrestyledSankey {...renderProps} />
                </g>
                <rect
                  width={width}
                  height={height}
                  rx={14}
                  fill="transparent"
                  onTouchStart={zoom.dragStart}
                  onTouchMove={zoom.dragMove}
                  onTouchEnd={zoom.dragEnd}
                  onMouseDown={zoom.dragStart}
                  onMouseMove={zoom.dragMove}
                  onMouseUp={zoom.dragEnd}
                  onMouseLeave={() => {
                    if (zoom.isDragging) zoom.dragEnd();
                  }}
                  onDoubleClick={(event) => {
                    const point = { x: 0, y: 0 };
                    zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                  }}
                />
              </>
            )}
          </SankeyClientHeadless>
          <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
              >
                +
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
              >
                -
              </Button>
            </div>
            <Button type="button"
              variant="secondary"
              onClick={zoom.center}>
              Center
            </Button>
            <Button type="button"
              variant="secondary"
              onClick={zoom.reset}>
              Reset
            </Button>
            <Button type="button"
              variant="secondary"
              onClick={zoom.clear}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </Zoom>
  );
};

export default ZoomSankey;
