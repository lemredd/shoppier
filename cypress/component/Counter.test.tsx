import Counter from "./Counter";

describe("Component: <Counter />", () => {
	it("mounts", () => {
		cy.mount(<Counter />);
	});

	it("defaults `count` to 0", () => {
		cy.mount(<Counter />);
		cy.get("button").should("have.text", "Count: 0");
	});

	it("defaults increments count by 1", () => {
		cy.mount(<Counter />);
		cy.get("button").click().should("have.text", "Count: 1");
	});

	it("Accepts a `count` prop", () => {
		const component = cy.mount(<Counter count={5} />);
		component.get("button").should("have.text", "Count: 5");
	});
});
