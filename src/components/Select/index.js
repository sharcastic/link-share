import React from "react";
import Select from "react-select";

const SelectComponent = ({
  options,
  isMulti = false,
  onChange,
  selectedOptions
}) => {
  return (
    <div data-testid="Select">
      <Select
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        defaultValue={selectedOptions}
      />
    </div>
  );
};

export default SelectComponent;
