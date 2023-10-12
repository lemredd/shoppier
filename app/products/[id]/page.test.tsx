const env = { "PORT": 7357 };

describe("Page: `/products/[id]`", { env }, () => {
	it("loads product", () => {
		cy.visit("/products/1");
		cy.get("button[aria-label='Add to cart']").should("exist");
	});
});

