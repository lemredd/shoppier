const env = { "PORT": 7357 };
const LOCALHOST_URL = `http://localhost:${env.PORT}`;

describe("Page: `/products/[id]`", { env }, () => {
	it("adds product to anonymous cart", () => {
		// TODO: make fixture for `product` and intercept
		const body = {
			"id": env.PORT
		} satisfies Pick<Product, "id">;
		cy.intercept("/api/products/1", { body });
		cy.visit("/products/1");
		cy.get("button[aria-label='Add to cart']").click();
		cy.get("form input[type=submit]").click();

		cy.getAllLocalStorage().then(({ [LOCALHOST_URL]: localhost }) => {
			expect(JSON.parse(String(localhost.cart))).not.to.throw;
			const anonymous_cart = JSON.parse(String(localhost.cart)) as Record<string, unknown>;

			expect(anonymous_cart.products).to.have.length(1);
		});
	});
});

