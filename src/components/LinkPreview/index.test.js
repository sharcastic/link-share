import React from "react";
import { render } from "@testing-library/react";
import LinkPreview from "./index";

it("LinkPreview when there is an error", () => {
  const error = "Cannot display preview";
  const { getByText } = render(
    <LinkPreview preview={{ error, responseReceived: true }} />
  );
  const element = getByText(error);
  expect(element).toBeInTheDocument();
});

it("LinkPreview should display Loading ", () => {
  const { getByText } = render(
    <LinkPreview preview={{ responseReceived: false }} />
  );
  const element = getByText("Loading Preview!");
  expect(element).toBeInTheDocument();
});

it("LinkPreview should  display error ", () => {
  const error = "Cannot display preview";
  const { getByText } = render(
    <LinkPreview preview={{ error, responseReceived: true }} />
  );
  const element = getByText(error);
  expect(element).toBeInTheDocument();
});

it("LinkPreview when there is no error", () => {
  const title = "Webpage Title";
  const description = "Webpage description";
  const image = "/assets/logo";
  const alt = "Link Preview";
  const { getByText, getByAltText } = render(
    <LinkPreview
      preview={{ title, description, image, responseReceived: true }}
    />
  );
  const descriptionElement = getByText(description);
  const titleElement = getByText(title);
  const imageElement = getByAltText(alt);
  expect(descriptionElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
});
