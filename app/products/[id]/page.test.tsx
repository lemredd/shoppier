const env = { "PORT": 7357 };
const LOCALHOST_URL = `http://localhost:${env.PORT}`;

describe("Page: `/products/[id]`", { env }, () => {
	it("adds product to anonymous cart", () => {
		const id = 1;
		// TODO: seed database with different products on test environment
		// I can't seem to simply intercept `/api/products/[id]`...
		cy.visit(`/products/${id}`);

		cy.get("button[aria-label='Add to cart']").click();
		cy.get("form input[type=submit]").click();

		cy.getAllLocalStorage().then(({ [LOCALHOST_URL]: localhost }) => {
			expect(JSON.parse(String(localhost.cart))).not.to.throw;
			const anonymous_cart = JSON.parse(String(localhost.cart)) as Record<string, unknown>;

			expect(anonymous_cart.products).to.have.length(1);
			const cart_item = cy.wrap(anonymous_cart.products).its(0);
			const expected_cart_item = { "id": 1, "productId": id, "quantity": 1 };
			cart_item.should("deep.equal", expected_cart_item);
		});
	});

	//TODO: test adding product to authenticated user cart
});

