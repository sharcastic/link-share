import React from "react";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MutationObserver from "@sheerun/mutationobserver-shim";

import Panel, { PanelItem, NotificationItem } from "./index";
window.MutationObserver = MutationObserver;

test("Render Panel component and VisibleComponent with its children", () => {
  render(
    <Panel>
      <Panel.VisibleComponent>Content</Panel.VisibleComponent>
    </Panel>
  );
  expect(screen.getByText("Content")).toBeVisible();
});

test("Render Panel Component with a hidden list that gets displayed on click and closes when clicked outside the container", async () => {
  render(
    <>
      <Panel>
        <Panel.VisibleComponent>Content</Panel.VisibleComponent>
        <Panel.HiddenComponent>
          <PanelItem>Hidden item</PanelItem>
        </Panel.HiddenComponent>
      </Panel>
      <button>Click</button>
    </>
  );
  expect(screen.queryByText("Hidden item")).toBeNull();
  userEvent.click(screen.getByText("Content"));
  expect(screen.queryByText("Hidden item")).toBeDefined();
  act(() => userEvent.click(screen.getByText("Click")));
  expect(screen.queryByText("Hidden item")).toBeNull();
});

test("Test on click handlers of the list panel items", async () => {
  const fn = jest.fn();
  render(
    <Panel>
      <Panel.VisibleComponent>Content</Panel.VisibleComponent>
      <Panel.HiddenComponent>
        <PanelItem onClick={fn}>Hidden item</PanelItem>
      </Panel.HiddenComponent>
    </Panel>
  );
  userEvent.click(screen.getByText("Content"));
  act(() => userEvent.click(screen.getByText("Hidden item")));
  expect(fn).toBeCalled();
});

test("Testing various types of Notification Items", () => {
  render(
    <Panel>
      <Panel.VisibleComponent>Content</Panel.VisibleComponent>
      <Panel.HiddenComponent>
        <NotificationItem type="request" />
        <NotificationItem type="unread" />
        <NotificationItem type="read" />
        <NotificationItem />
      </Panel.HiddenComponent>
    </Panel>
  );
  userEvent.click(screen.getByText("Content"));
  expect(screen.queryByText("Accept")).toBeDefined();
  expect(screen.queryByText("Mark as Read")).toBeDefined();
  expect(screen.queryByText("Read Notification")).toBeDefined();
});
