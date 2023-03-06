import { RadialBar } from "@ant-design/plots";
import { useState } from "react";
import { InterShipData } from "./internShipData";

const InternshipSummaryChart = () => {
    const [data] = useState(InterShipData);

    const config: any = {
        data,
        xField: 'name',
        yField: 'star',
        maxAngle: 350,
        radius: 0.8,
        innerRadius: 0.2,
        tooltip: {
            formatter: (datum: any) => {
                return {
                    name: 'star数',
                    value: datum.star,
                };
            },
        },
        colorField: 'star',
        color: ({ star }: any) => {
            if (star > 10000) {
                return '#6349ec';
            } else if (star > 1000) {
                return '#ff9300';
            }

            return '#ff93a7';
        },
        barBackground: {},
        barStyle: {
            lineCap: 'round',
        },
        annotations: [
            {
                type: 'html',
                position: ['50%', '50%'],
                html: (container: any, view: any) => {
                    const coord = view.getCoordinate();
                    const w = coord.polarRadius * coord.innerRadius * 1.15;
                    return `<div style="transform:translate(-50%,-46%)">
              <img width="${(w / 203) * 231
                        }" height="${w}" alt="" src="https://gw.alipayobjects.com/zos/antfincdn/zrh%24J08soH/AntV%252520LOGO%2525202.png">
                </div>`;
                },
            },
        ],
    };
    return (
        <div>
            <RadialBar {...config} />
        </div>
    )
}

export default InternshipSummaryChart