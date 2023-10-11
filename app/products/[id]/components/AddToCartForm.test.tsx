import Component from "./AddToCartForm";

// TODO(E2E): test adding cart item to both authenticated (`fetch`) and anonymous (`localStorage`) users
describe("Component: `AddToCartForm`", () => {
	it("shows dialog when 'Add to cart' button is clicked", () => {
		cy.mount(<Component cart={{ "products": [] }} id={1} />);
		cy.get("button[aria-label='Add to cart']").click();
		cy.get("dialog").should("be.visible");
	});
	});
});
