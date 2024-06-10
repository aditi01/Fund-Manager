import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
} from "react-financial-charts";

interface ChartData {
    close: number
    high: number
    low: number
    open: number
    volumn: number
    timestamp: number
    ticker: string
    date: Date
}

interface IProps {
    chartData: ChartData[]
}

const CandlestickChart = (props: IProps) => {
    const { chartData } = props

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date)
      );
      const height = 700;
      const width = window.innerWidth - 100;
      const margin = { left: 0, right: 48, top: 0, bottom: 24 };
    
      const ema12 = ema()
        .id(1)
        .options({ windowSize: 12 })
        .merge((d: { ema12: any; }, c: any) => {
          d.ema12 = c;
        })
        .accessor((d: { ema12: any; }) => d.ema12);
    
      const ema26 = ema()
        .id(2)
        .options({ windowSize: 26 })
        .merge((d: { ema26: any; }, c: any) => {
          d.ema26 = c;
        })
        .accessor((d: { ema26: any; }) => d.ema26);
    
      const elder = elderRay();
    
      const rotateArray2 = function (nums: any, k: any) {
        // reverse helper function
        function reverse(arr: { [x: string]: any; }, start: number, end: number) {
          while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
          }
        }
    
        k %= nums.length;
    
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    
        return nums;
      };
    
      const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
        rotateArray2(chartData, null)
      );
      const pricesDisplayFormat = format(".2f");
      const max = xAccessor(data[data.length - 1]);
      const min = xAccessor(data[Math.max(0, 0)]);
      const xExtents = [min, max + 5];
    
      const gridHeight = height - margin.top - margin.bottom;
    
      const elderRayHeight = 100;
      const elderRayOrigin = (_: any, h: number) => [0, h - elderRayHeight];
      const barChartHeight = gridHeight / 4;
      const barChartOrigin = (_: any, h: number) => [0, h - barChartHeight - elderRayHeight];
      const chartHeight = gridHeight - elderRayHeight;
      const dateTimeFormat = "%d %b";
      const timeDisplayFormat = timeFormat(dateTimeFormat);
    
      const barChartExtents = (data: { volume: any; }) => {
        return data.volume;
      };
    
      const candleChartExtents = (data: { high: any; low: any; }) => {
        return [data.high, data.low];
      };
    
      const yEdgeIndicator = (data: { close: any; }) => {
        return data.close;
      };
    
      const volumeColor = (data: { close: number; open: number; }) => {
        return data.close > data.open
          ? "rgba(38, 166, 154, 0.3)"
          : "rgba(239, 83, 80, 0.3)";
      };
    
      const volumeSeries = (data: { volume: any; }) => {
        return data.volume;
      };
    
      const openCloseColor = (data: { close: number; open: number; }) => {
        return data.close > data.open ? "#26a69a" : "#ef5350";
      };
    
      return (
        <ChartCanvas
          height={height}
          ratio={3}
          width={width}
          margin={margin}
          data={data}
          displayXAccessor={displayXAccessor}
          seriesName="Data"
          xScale={xScale}
          xAccessor={xAccessor}
          xExtents={xExtents}
          zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
          <Chart
            id={2}
            height={barChartHeight}
            origin={barChartOrigin}
            yExtents={barChartExtents}
          >
            <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
          </Chart>
          <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
            <XAxis showGridLines showTickLabel={false} />
            <YAxis showGridLines tickFormat={pricesDisplayFormat} />
            <CandlestickSeries />
            <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
            <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />
            <EdgeIndicator
              itemType="last"
              rectWidth={margin.right}
              fill={openCloseColor}
              lineStroke={openCloseColor}
              displayFormat={pricesDisplayFormat}
              yAccessor={yEdgeIndicator}
            />
            <MovingAverageTooltip
              origin={[8, 24]}
              options={[
                {
                  yAccessor: ema26.accessor(),
                  type: "EMA",
                  stroke: ema26.stroke(),
                  windowSize: ema26.options().windowSize
                },
                {
                  yAccessor: ema12.accessor(),
                  type: "EMA",
                  stroke: ema12.stroke(),
                  windowSize: ema12.options().windowSize
                }
              ]}
            />
    
            <ZoomButtons />
            <OHLCTooltip origin={[8, 16]} />
          </Chart>
          <Chart
            id={4}
            height={elderRayHeight}
            yExtents={[0, elder.accessor()]}
            origin={elderRayOrigin}
            padding={{ top: 8, bottom: 8 }}
          >
            <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
            <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
    
            <MouseCoordinateX displayFormat={timeDisplayFormat} />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />
    
            <ElderRaySeries yAccessor={elder.accessor()} />
    
            <SingleValueTooltip
              yAccessor={elder.accessor()}
              yLabel="Elder Ray"
              yDisplayFormat={(d: any) =>
                `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                  d.bearPower
                )}`
              }
              origin={[8, 16]}
            />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      );
};

export default CandlestickChart;

