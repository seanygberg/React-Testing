import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

describe("Card component", function() {
  it("renders", function() {
    render(<Card />);
  });

  it("matches the snapshot", function() {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Carousel component", function() {
  it("renders", function() {
    render(<Carousel photos={TEST_IMAGES} />);
  });
  it("matches the snapshot", function() {
    const { asFragment } = render(<Carousel photos={TEST_IMAGES} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Left arrow", function() {
  it("works when you click on the left arrow", function() {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
      />
    );
    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
  });
});

describe("Exhausting the image array", function() {
  it("should remove left button on first slide", function(){
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
      />
    );
    expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    expect(leftArrow).not.toBeInTheDocument();
  });
  it("should remove right button on last slide", function(){
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
      />
    );
    const rightArrow = container.querySelector(".bi-arrow-right-circle");

    for (let i = 0; i < TEST_IMAGES.length; i++) {
      fireEvent.click(rightArrow);
    }
    expect(container.querySelector('img[alt="testing image 3"]')).toBeInTheDocument();
    expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
  });
});