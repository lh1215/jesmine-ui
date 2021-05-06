import React from "react";
import { UploadList } from "./index";
import {
	withKnobs,
	text,
	boolean,
	color,
	select,
} from "@storybook/addon-knobs";

export default {
	title: "UploadList",
	component: UploadList,
	decorators: [withKnobs],
};

export const knobsBtn = () => (
);
