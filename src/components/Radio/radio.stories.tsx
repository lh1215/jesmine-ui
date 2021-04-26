import Radio from "./index";
import {boolean, select, text, withKnobs} from "@storybook/addon-knobs";
import React, {useState} from "react";
import {color} from "../shared/styles";
import {action} from "@storybook/addon-actions";
import Icon from "../Icon";

export default {
  title: 'Radio',
  component: Radio,
  decorators: [withKnobs],
}

export const knobsRadio = () => (
  <Radio
    appearance={select<keyof typeof color>(
      'color',
      Object.keys(color) as Array<keyof typeof color>,
      'primary'
    )}
    disabled={boolean("disabled", false)}
    label={text('label', 'i am radio')}
    description={text('description', '')}
    hideLabel={boolean('hideLabel', false)}
    error={text('error', '')}
    onChange={onChange}
  />
);

export const testColors = () => (
  <div>
    {Object.keys(color).map((v, i) => (
        <Radio
          style={{marginTop: '5px'}}
          key={i}
          name='group2'
          label={v}
          appearance={v as keyof typeof color}
        />
      ))}
  </div>
);

export const testOneChange = () => (
  <form>
    <Radio name='group1' label='apple' onChange={onChange} />
    <Radio name="group1" label="banana" onChange={onChange} />
    <Radio name="group1" label="pear" onChange={onChange} />
    <Radio name="group1" label="mongo" onChange={onChange} />
    <Radio name="group1" label="watermelon" onChange={onChange} />
  </form>
);

export const testDisabled = () => <Radio label="disabled" disabled />;

export const testExtraText = () => (
  <Radio
    label="the radio has extra text"
    error="error text"
    description="description text"
  />
);

export const testHideLabel = () => (
  <Radio
    label="the radio has extra text"
    description="label will hidden"
    hideLabel
  />
);

export const withIcon = () => (
  <Radio
    label={
      <span>
        <Icon icon="redux" />with icon
      </span>
    }
  />
);

const onChange = action("change");

function ParentControl() {
  const [state, setState] = useState(() => new Array(5).fill(false));
  const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    const index = (target.value as unknown) as number;
    let newArr = new Array(5).fill(false);
    newArr[index] = true;
    setState(newArr);
  };
  return (
    <div>
      <Radio
        label="apple"
        onClick={onClick}
        value={0}
        checked={state[0]}
        onChange={() => {}}
      />
      <Radio
        label="banana"
        onClick={onClick}
        value={1}
        checked={state[1]}
        onChange={() => {}}
      />
      <Radio
        label="pear"
        onClick={onClick}
        value={2}
        checked={state[2]}
        onChange={() => {}}
      />
      <Radio
        label="mongo"
        onClick={onClick}
        value={3}
        checked={state[3]}
        onChange={() => {}}
      />
      <Radio
        label="watermelon"
        onClick={onClick}
        value={4}
        checked={state[4]}
        onChange={() => {}}
      />
    </div>
  );
}

export const testParentControl = () => <ParentControl />;
