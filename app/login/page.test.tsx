const env = { "PORT": 7357 };

describe("Page: `/products/[id]`", { env }, () => {
	it("redirects if logged in already", () => {
		cy.setCookie("auth", "TEST_DATA_auth_token");

		cy.visit("/login");
		cy.url().should("equal", "/");
	});
});

