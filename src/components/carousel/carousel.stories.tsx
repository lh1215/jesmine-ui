import React from "react";
import { Carousel } from "./index";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Carousel",
  component: Carousel,
  decorators: [withKnobs],
};
const DivExample = function (height: number, index: number) {
  return (
    <div
      style={{
        background: "#a0b6df",
      }}
      key={index}
    >
      <span
        style={{
          lineHeight: `${height}px`,
          color: "white",
          fontSize: "20px",
          fontWeight: 800,
          width: "100%",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        {index + 1}
      </span>
    </div>
  );
};
export const knobsCarousel = () => (
  <div>
    <Carousel delay={300} height={300} radioAppear="darker">
      {new Array(4).fill(300).map((v, i) => DivExample(v, i))}
    </Carousel>
  </div>
);
