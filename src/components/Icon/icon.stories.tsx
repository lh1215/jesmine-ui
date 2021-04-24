import React from "react";
import Index, { IconProps } from "./index";
import { withKnobs, color, select } from "@storybook/addon-knobs";
import styled from "styled-components";
import { icons } from "../shared/icons";

export default {
  title: "Icon",
  component: Index,
  decorators: [withKnobs],
};

export const knobsIcon = () => (
  <Index
    icon={select<IconProps["icon"]>(
      "icons",
      Object.keys(icons) as IconProps["icon"][],
      "useradd"
    )}
    color={color("color", "black")}
  ></Index>
);

const Meta = styled.div`
  color: #666;
  font-size: 12px;
`;
const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
`;
const Item = styled.li`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 20%;
  min-width: 120px;
  padding: 0px 7.5px 20px;
  svg {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
`;
export const labels = () => (
  <>
    There are {Object.keys(icons).length} icons
    <List>
      {Object.keys(icons).map((key) => (
        <Item key={key}>
          <Index icon={key as keyof typeof icons} />
          <Meta>{key}</Meta>
        </Item>
      ))}
    </List>
  </>
);
