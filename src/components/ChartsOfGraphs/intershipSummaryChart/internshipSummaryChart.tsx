import { useState } from "react";
import { InterShipData } from "./internShipData";
import { RadialBar } from "@ant-design/plots";
import BoxWrapper from "../../BoxWrapper/BoxWrapper";

const InternshipSummaryChart = (props: any) => {
    const {
        xField = "name",
        yField = "star",
        autoFit = true,
        padding = "auto",
        maxAngle = 360,
        radius = 0.8,
        innerRadius = 0.37,
        colorField = "name",
        barStyle = { lineCap: "round", },
        intervalPadding = 9.1,
        xAxis = { label: null },
        heading,
    } = props

    const [data] = useState(InterShipData);

    const config: any = {
        data,
        xField: xField,
        yField: yField,
        autoFit: autoFit,
        padding: padding,
        maxAngle: maxAngle,
        radius: radius,
        innerRadius: innerRadius,
        colorField: colorField,
        barBackground: {},
        color: ({ name }: any) => {
            if (name == "Gray") {
                return "#A0A3BD";
            } else if (name == "yellow") {
                return "#FFC15E";
            } else if (name == "blue") {
                return "#4783FF";
            } else if (name == "green") {
                return " #4A9D77";
            }
            return "#ff93a7";
        },
        barStyle: barStyle,
        intervalPadding: intervalPadding,
        xAxis: xAxis,
    };
    return (
        <BoxWrapper>
            {heading && <p className="text-secondary-color font-medium text-xl">{heading}</p>}
            <RadialBar
                style={{ height: "300px", marginTop: "-15px" }}
                tooltip={false}
                {...config}
                className="transition-from-right"
            />
        </BoxWrapper>
    )
}
export default InternshipSummaryChart