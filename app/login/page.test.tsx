const env = { "PORT": 7357 };

describe("Page: `/products/[id]`", { env }, () => {
	const LOCALHOST_URL = `http://localhost:${env.PORT}`;

	it("redirects if logged in already", () => {
		cy.setCookie("auth", "TEST_DATA_auth_token");

		cy.visit("/login");
		cy.url().should("equal",`${LOCALHOST_URL}/`);
	});

	it("redirects to home after successful login", () => {
		cy.visit("/login");
		
		cy.get("input[name='username_or_email']").type("TEST_DATA@email.com");
		cy.get("input[name='password']").type("TEST_DATA_password");
		cy.get("form input[type=submit]").click();

		cy.url().should("equal",`${LOCALHOST_URL}/`);
	});
});

