import React from "react";
import Badge, {BadgeProps} from "./index";
import Icon from "../Icon";
import {select, text, withKnobs} from "@storybook/addon-knobs";
import {badgeColor} from "../shared/styles";

// 需求注册到 storybook，要不然面板不会显示
export default {
  title: "Badge",
  component: Badge,
  decorators: [withKnobs],
};

type selectType = "positive" | "negative" | "neutral" | "warning" | "error";

export const knobsBadge = () => (
  <Badge
    status={select<BadgeProps["status"]>(
      "status",
      Object.keys(badgeColor) as selectType[],
      "neutral"
    )}
  >
    {text("children", "i am badge")}
  </Badge>
)

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
    <Icon icon="check"/>
    with icon
  </Badge>
)
