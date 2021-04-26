import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Avatar, AvatarSize } from "../Avatar";

describe("test Avatar component", () => {
  test("it should render default avatar", () => {
    let wrapper = render(<Avatar></Avatar>);
    let div = wrapper.getByTestId("avatar-div");
    expect(div).toBeInTheDocument();
    let username = wrapper.getByText("l");
    expect(username).toBeTruthy();
  });
  test("it should render correct size", () => {
    let wrapper = render(<Avatar></Avatar>);
    let div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.medium}px`);
    let username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.medium}px`);
    cleanup();
    wrapper = render(<Avatar size="large"></Avatar>);
    // expect(wrapper).toMatchSnapshot();
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.large}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.large}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.large}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.large}px`);
    cleanup();
    wrapper = render(<Avatar size="small"></Avatar>);
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.small}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.small}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.small}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.small}px`);
    cleanup();
    wrapper = render(<Avatar size="tiny"></Avatar>);
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.tiny}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.tiny}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.tiny}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.tiny}px`);
    cleanup();
    wrapper = render(<Avatar size="medium"></Avatar>);
    div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle(`height:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`width:${AvatarSize.medium}px`);
    expect(div).toHaveStyle(`line-height:${AvatarSize.medium}px`);
    username = wrapper.getByTestId("avatar-div");
    expect(username).toHaveStyle(`line-height:${AvatarSize.medium}px`);
  });
  test("should correct loading", () => {
    let wrapper = render(<Avatar isLoading></Avatar>);
    let svg = wrapper.container.querySelector("svg");
    expect(svg).toBeVisible();
    cleanup();
    wrapper = render(
      <Avatar isLoading username="123" src="/" size="tiny"></Avatar>
    );
    svg = wrapper.container.querySelector("svg");
    expect(svg).toBeVisible();
  });
  test("should correct img", () => {
    let wrapper = render(<Avatar src="www.test.com"></Avatar>);
    let img = wrapper.getByTestId("avatar-img");
    expect(img.tagName).toEqual("IMG");
    expect(img).toHaveStyle("width:100%");
    expect(img).toHaveAttribute("src", "www.test.com");
    expect(img).toHaveAttribute("alt", "loading");
    cleanup();
    wrapper = render(
      <Avatar src="www.yehuozhili.xyz" username="yehuozhili"></Avatar>
    );
    img = wrapper.getByTestId("avatar-img");
    expect(img).toHaveAttribute("src", "www.yehuozhili.xyz");
    expect(img).toHaveAttribute("alt", "yehuozhili");
  });
  test("should render correct username", () => {
    let wrapper = render(<Avatar username="yehuozhili"></Avatar>);
    let div = wrapper.getByTestId("avatar-div");
    expect(div).toHaveStyle("text-transform:uppercase");
    let username = wrapper.getByText("y");
    expect(username).toBeVisible();
    cleanup();
    wrapper = render(<Avatar username="中文汉字"></Avatar>);
    username = wrapper.getByText("中");
    expect(username).toBeTruthy();
  });
});
