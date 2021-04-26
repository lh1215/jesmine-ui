import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import Radio from "../index";
import {color} from "../../shared/styles";
import {text} from "@storybook/addon-knobs";

const testFn = jest.fn();
const disableFn = jest.fn();

describe('test Radio component', () => {
  it('should checked when clicked', () => {
    const wrapper = render(<Radio data-testid="radio" label='test' onChange={testFn} />);
    const ele = wrapper.getByTestId("radio");
    expect(ele).toBeInTheDocument();
    const input = wrapper.container.querySelector('input')!;
    expect(testFn).not.toHaveBeenCalled();
  });

  it('should render extra text', () => {
    const wrapper = render(
      <Radio
        data-testid="radio"
        label='test'
        error='errortext'
        description='description'
        onChange={testFn}
      />
    );
    const ele = wrapper.getByTestId("radio");
    expect(ele).toBeInTheDocument();
    const errorText = wrapper.getByText('errortext');
    expect(errorText).toHaveStyle(`color: ${color.negative}`);
    const description = wrapper.getByText('description');
    expect(description).toHaveStyle(`color:${color.mediumdark}`);
  });

  it('should hide label', () => {
    const wrapper = render(<Radio data-testid="radio" label="test" hideLabel />);
    const ele = wrapper.getByTestId("radio");
    expect(ele).toBeInTheDocument();
    const text = wrapper.getByText("test");
    expect(text).toHaveStyle("clip-path: inset(100%)");
  });

  it('should disabled', () => {
    const wrapper = render(<Radio data-testid="radio" label="test" disabled onChange={disableFn} />);
    const ele = wrapper.getByTestId("radio");
    expect(ele).toBeInTheDocument();
    const text = wrapper.getByText("test");
    fireEvent.click(text);
    expect(disableFn).not.toHaveBeenCalled();
  });
});
