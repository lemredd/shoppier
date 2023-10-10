import Component from "./AddToCartForm";

describe("Component: `AddToCartForm`", () => {
	it("shows dialog when `add-to-cart-btn` is clicked", () => {
		cy.mount(<Component cart={{ "products": [] }} id={1} />);
		cy.get("#add-to-cart-btn").click();
		cy.get("dialog").should("exist");
	});
});
