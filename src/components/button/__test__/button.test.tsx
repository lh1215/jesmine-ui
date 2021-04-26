import React from "react";
import Index, { ButtonProps } from "../index";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { color, typography, btnPadding } from "../../shared/styles";

const defaultProps = {
  onClick: jest.fn(),
  className: "testProps",
};

const testProps: ButtonProps = {
  appearance: "primary",
  size: "small",
  className: "testprops",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(
      <Index data-testid="button" {...defaultProps}>
        hello
      </Index>
    );
    const ele = wrapper.getByTestId("button");
    expect(ele).toBeInTheDocument();

    //正确渲染文本
    const text = wrapper.getAllByText("hello");
    expect(text).toBeTruthy();

    //button标签
    expect(ele.tagName).toEqual("BUTTON");
    expect(ele).not.toHaveAttribute("isdisabled");
    expect(ele).not.toHaveAttribute("isLinked");

    //正常添加classname
    expect(ele.getAttribute("class")?.split(" ").includes("testProps")).toEqual(
      true
    );
    //正常click
    fireEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
    //span正常显示
    expect(ele.getElementsByTagName("span")).toBeTruthy();
    //正常默认属性
    expect(ele).toHaveStyle(`background:${color.tertiary}`);
    expect(ele).toHaveStyle(`color:${color.darkest}`);
    //正常大小
    expect(ele).toHaveStyle(`padding:${btnPadding.medium}`);
    expect(ele).toHaveStyle(`font-size:${typography.size.s2}px`);
  });
  it("should render correct appearance", () => {
    let wrapper = render(
      <Index data-testid="button" {...testProps}>
        hello
      </Index>
    );
    let ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`background:${color.primary}`);
    expect(ele).toHaveStyle(`color: ${color.lightest}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="inverseOutline">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`box-shadow: ${color.lightest} 0 0 0 1px inset`);
    expect(ele).toHaveStyle(`color: ${color.lightest}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="inversePrimary">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`background:${color.lightest}`);
    expect(ele).toHaveStyle(`color: ${color.primary}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="inverseSecondary">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`background:${color.lightest}`);
    expect(ele).toHaveStyle(`color: ${color.secondary}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="outline">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`background:transparent`);
    expect(ele).toHaveStyle(`color: ${color.dark}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="primaryOutline">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`box-shadow: ${color.primary} 0 0 0 1px inset`);
    expect(ele).toHaveStyle(`color: ${color.primary}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="secondary">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`background:${color.secondary}`);
    expect(ele).toHaveStyle(`color: ${color.lightest}`);
    cleanup();
    wrapper = render(
      <Index data-testid="button" appearance="secondaryOutline">
        hello
      </Index>
    );
    ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`box-shadow: ${color.secondary} 0 0 0 1px inset`);
    expect(ele).toHaveStyle(`color: ${color.secondary}`);
  });
  it("should render correct size", () => {
    const wrapper = render(
      <Index data-testid="button" {...testProps}>
        hello
      </Index>
    );
    const ele = wrapper.getByTestId("button");
    expect(ele).toHaveStyle(`padding: ${btnPadding.small}`);
    expect(ele).toHaveStyle(`font-size:${typography.size.s1}px`);
  });

  it("should render a link", () => {
    const wrapper = render(
      <Index data-testid="button" isLink href="/">
        linkbutton
      </Index>
    );
    const ele = wrapper.getByTestId("button");
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("A");
    expect(ele).toHaveAttribute("href", "/");
  });
  it("should render disabled", () => {
    const wrapper = render(
      <Index data-testid="button" {...disabledProps}>
        disabled button
      </Index>
    );
    const ele = wrapper.getByTestId("button");
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveStyle("cursor: not-allowed");
    fireEvent.click(ele);
    expect(disabledProps.onClick).not.toHaveBeenCalled(); // 不能点击
  });

  it("should render loading", () => {
    const wrapper = render(
      <Index data-testid="button" isLoading>
        loading
      </Index>
    );
    const ele = wrapper.getByTestId("button");
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveStyle("cursor: progress");
    const text = wrapper.getByText("loading");
    expect(text).toHaveStyle("opacity: 0");
    const wrapper2 = render(
      <Index isLoading loadingText="jesmineUI">
        hello
      </Index>
    );
    const text2 = wrapper2.getByText("jesmineUI");
    expect(text2).toBeTruthy();
  });

  it("should isUnclickable", () => {
    const wrapper = render(
      <Index data-testid="button" isUnclickable>
        hello
      </Index>
    );
    const ele = wrapper.getByTestId("button");
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveStyle("pointer-events: none");
    fireEvent.click(ele);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
