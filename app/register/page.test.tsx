const env = { "PORT": 7357 };

describe("Page: `/register`", { env }, () => {
	const LOCALHOST_URL = `http://localhost:${env.PORT}`;

	it("redirects if logged in already", () => {
		cy.setCookie("auth", "TEST_DATA_auth_token");

		cy.visit("/register");
		cy.url().should("equal",`${LOCALHOST_URL}/`);
	});

	// TODO: complete test
	it.skip("gives user option to complete profile details or do it later", () => {
	});
});

