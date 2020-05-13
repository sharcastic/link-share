import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextInput from './index';

test("Test to render TextInput and to check if onChange and onBlur is working", () => {
  const changeFn = jest.fn();
  const blurFn = jest.fn();
  const { rerender } = render(<TextInput onChange={changeFn} onBlur={blurFn} placeholder="placeholder" value=""/>);
  const element = screen.getByPlaceholderText("placeholder");
  userEvent.type(element, "a");
  element.focus();
  element.blur();
  // screen.getByPlaceholderText("placeholder").blur();
  expect(changeFn).toHaveBeenCalledWith("a");
  // expect(element).toHaveFocus();
  expect(blurFn).toHaveBeenCalled();
})

test("Covering default props for test coverage!", () => {
  render(<TextInput placeholder="placeholder" value=""/>);
  const element = screen.getByPlaceholderText("placeholder");
  userEvent.type(element, "a");
  element.focus();
  element.blur();
  expect(element).toBeVisible();
})