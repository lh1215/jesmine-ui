import React from "react";
import { Upload } from "./index";
import {
  withKnobs,
  text,
  boolean,
  color,
  select,
} from "@storybook/addon-knobs";

export default {
  title: "Upload",
  component: Upload,
  decorators: [withKnobs],
};

export const knobsBtn = () => <Upload></Upload>;
