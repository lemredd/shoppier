import Counter from "./Counter";

describe("Component: <Counter />", () => {
	it("mounts", () => {
		cy.mount(<Counter />)
	})
})
