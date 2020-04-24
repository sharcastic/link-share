import React from "react";
import Select from "react-select";
import { array, bool, func, string } from "prop-types";

const SelectComponent = ({
  options,
  isMulti,
  onChange,
  value,
  className,
  menuPlacement,
  controlShouldRenderValue
}) => {
  return (
    <div data-testid="Select">
      <Select
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        value={value}
        className={`select ${className}`}
        menuPlacement={menuPlacement}
        controlShouldRenderValue={controlShouldRenderValue}
        isClearable={false}
        filterOption={option => !value.find(i => i.id === option.data.id)}
      />
    </div>
  );
};

SelectComponent.propTypes = {
  options: array.isRequired,
  isMulti: bool,
  onChange: func.isRequired,
  value: array.isRequired,
  className: string,
  menuPlacement: string,
  controlShouldRenderValue: bool
};

SelectComponent.defaultProps = {
  isMulti: false,
  className: "",
  menuPlacement: "bottom",
  controlShouldRenderValue: false
};

export default SelectComponent;
