import Counter from "./Counter";

describe("Component: <Counter />", () => {
	it("mounts", () => {
		cy.mount(<Counter />);
	});

	it("defaults `count` to 0", () => {
		cy.mount(<Counter />);
		cy.get("button").should("have.text", "Count: 0");
	});

