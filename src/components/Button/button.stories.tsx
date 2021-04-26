import React from "react";
import Index, {
  APPEARANCES,
  AppearancesTypes,
  SIZES,
  SizesTypes,
} from "./index";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
export default {
  title: "Button",
  component: Index,
  decorators: [withKnobs],
};

export const knobsBtn = () => (
  <Index
    size={select<SizesTypes>("size", SIZES, SIZES.medium)}
    href={text("hrefText", "")}
    isLink={boolean("isLink", false)}
    loadingText={text("loadingTEXT", "I AM LOADING")}
    isLoading={boolean("isLoading", false)}
    disabled={boolean("disabled", false)}
    appearance={select<AppearancesTypes>(
      "APPEARANCES",
      APPEARANCES,
      APPEARANCES.primary
    )}
  >
    {text("childrenText", "Hello Storybook")}
  </Index>
);

export const buttons = () => (
  <>
    <Index appearance="primary">Primary</Index>
    <Index appearance="secondary">Secondary</Index>
    <Index appearance="tertiary">Tertiary</Index>
    <Index appearance="outline">Outline</Index>
    <Index appearance="primaryOutline">Outline primary</Index>
    <Index appearance="secondaryOutline">Outline secondary</Index>
    <div style={{ background: "grey", display: "inline-block" }}>
      <Index appearance="inversePrimary">Primary inverse</Index>
    </div>
    <div style={{ background: "grey", display: "inline-block" }}>
      <Index appearance="inverseSecondary">Secondary inverse</Index>
    </div>
    <div style={{ background: "grey", display: "inline-block" }}>
      <Index appearance="inverseOutline">Outline inverse</Index>
    </div>
  </>
);

export const sizes = () => (
  <>
    <Index appearance="primary">default</Index>
    <Index appearance="primary" size="small">
      small
    </Index>
  </>
);

export const loading = () => (
  <>
    <Index appearance="primary" isLoading>
      Primary
    </Index>
    <Index appearance="secondary" isLoading>
      Secondary
    </Index>
    <Index appearance="tertiary" isLoading>
      Tertiary
    </Index>
    <Index appearance="outline" isLoading>
      Outline
    </Index>
    <Index appearance="outline" isLoading loadingText="Custom...">
      Outline
    </Index>
  </>
);

export const disabled = () => (
  <>
    <Index appearance="primary" disabled>
      Primary
    </Index>
    <Index appearance="secondary" disabled>
      Secondary
    </Index>
    <Index appearance="tertiary" disabled>
      Tertiary
    </Index>
    <Index appearance="outline" disabled>
      Outline
    </Index>
  </>
);

export const link = () => (
  <>
    <Index appearance="primary" isLink href="/">
      Primary
    </Index>
    <Index appearance="secondary" isLink href="/">
      Secondary
    </Index>
    <Index appearance="tertiary" isLink href="/">
      Tertiary
    </Index>
    <Index appearance="outline" isLink href="/">
      Outline
    </Index>
  </>
);
