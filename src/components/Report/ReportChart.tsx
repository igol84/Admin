import React from 'react';
import {BarDatum, ResponsiveBar} from '@nivo/bar'
import {Box} from "@mui/material";
import {Report} from "../../schemas/report";
import {useDictionaryTranslate} from "../../hooks/pages";
import {useChartStyle} from "./style";


interface Props {
  data: Report[]
}

const ReportChart = ({data}: Props) => {
  const d = useDictionaryTranslate('report')
  const style = useChartStyle()
  const dataFix: BarDatum[] = data.map(row => ({
    ...row,
    [d('costs')]: row.costs,
    [d('proceeds')]: row.proceeds,
    [d('profit')]: row.proceeds - row.costs
  }))
  return (
    <Box height="60vh">
      <ResponsiveBar
        data={dataFix}
        theme={style}
        keys={[
          d('costs'),
          d('profit'),
        ]}
        indexBy="data"
        margin={{top: 50, right: 130, bottom: 50, left: 60}}
        padding={0.35}
        valueScale={{type: 'linear'}}
        indexScale={{type: 'band', round: true}}
        colors={{scheme: 'pastel1'}}

        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 32,

        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
      />
    </Box>
  );
};

export default ReportChart;