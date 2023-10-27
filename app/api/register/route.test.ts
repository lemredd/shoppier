describe("Route `/api/register` - Validation and Errors", () => {
	it("throws validation error", () => {
		const body = new FormData();
		cy.request({
			"method": "POST",
			"url": "/api/register",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});

		// Invalid email
		body.set("email", "invalid_email");
		body.set("password", "password");
		body.set("confirm_password", "password");
		cy.request({
			"method": "POST",
			"url": "/api/register",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});

		// Password is less than 8 characters
		body.set("email", "sample@email.com");
		body.set("password", "passwor");
		body.set("confirm_password", "passwor");
		cy.request({
			"method": "POST",
			"url": "/api/register",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});

		// Passwords don't match
		body.set("email", "sample@email.com");
		body.set("password", "password");
		body.set("confirm_password", "password1");
		cy.request({
			"method": "POST",
			"url": "/api/register",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});
	});

	it("throws error if email is already used", () => {
		const body = new FormData();
		body.set("email", "TEST_DATA@email.com");
		body.set("password", "password");
		body.set("confirm_password", "password");
		cy.request({
			"method": "POST",
			"url": "/api/register",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});
	})
});

	});
});
