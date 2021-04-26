import React from "react";
import { render, cleanup } from "@testing-library/react";
import Icon, { IconProps } from "../index";
import { icons } from "../../shared/icons";

const IconTest = (icon: IconProps["icon"]) => {
  const wrapper = render(<Icon data-testid="icon-path" icon={icon} />);
  const path = wrapper.queryByTestId("icon-path");
  expect(path).toHaveAttribute("d", icons[icon]);
  cleanup();
}

describe("test Icon component", () => {
  it("should render correct icon", () => {
    Object.keys(icons).forEach((key) => {
      IconTest(key as IconProps["icon"]);
    });
  });
  it("should render block", () => {
    const wrapper = render(<Icon data-testid="icon-svg" icon="mobile" block />);
    const svg = wrapper.getByTestId("icon-svg");
    expect(svg).toHaveStyle("display:block");
  });
  it("should render correct color", () => {
    let wrapper = render(<Icon data-testid="icon-path" icon="mobile" />);
    let path = wrapper.queryByTestId("icon-path");
    expect(path).toHaveAttribute("color", "black");
    cleanup();
    wrapper = render(<Icon data-testid="icon-path" icon="mobile" color="blue" />);
    path = wrapper.queryByTestId("icon-path");
    expect(path).toHaveAttribute("color", "blue");
  });
});
