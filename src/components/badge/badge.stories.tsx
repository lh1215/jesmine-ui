import React from "react";
import Badge from "./badge";
import Icon from "../icon";
import {withKnobs} from "@storybook/addon-knobs";

// 需求注册到 storybook，要不然面板不会显示
export default {
  title: "Badge",
  component: Badge,
  decorators: [withKnobs],
};


export const all = () => (
  <div>
    <Badge status="positive">positive</Badge>
    <Badge status="negative">Negative</Badge>
    <Badge status="neutral">Neutral</Badge>
    <Badge status="error">Error</Badge>
    <Badge status="warning">Warning</Badge>
  </div>
);

export const withIcon = () => (
  <Badge status="warning">
    <Icon icon="check" />
    with icon
  </Badge>
)
