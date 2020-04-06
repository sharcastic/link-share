import React from "react";
import UserPicker from "@atlaskit/user-picker";

const UserPickerComponent = ({ options, loading, onChange, value }) => {
  return (
    <UserPicker
      options={options}
      isMulti
      isLoading={loading}
      allowEmail
      onChange={onChange}
      value={value}
    />
  );
};

export default UserPickerComponent;
