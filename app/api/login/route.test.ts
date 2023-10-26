describe("Route `/api/login` - Validation and Errors", () => {
	it("throws validation error", () => {
		const invalid_form_data = new FormData();
		cy.request({
			"method": "POST",
			"url": "/api/login",
			"headers": { "content-type": "multipart/form-data" },
			"body": invalid_form_data,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});
	});

	it("throws invalid user data error", () => {
		const body = new FormData();
		// Non-existent user
		body.set("username_or_email", "invalid@email.com");
		body.set("password", "invalid_password");
		cy.request({
			"method": "POST",
			"url": "/api/login",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
			expect(response.status).to.equal(422);
		});

		// Existing user but invalid password
		body.set("username_or_email", "TEST_DATA@email.com");
		body.set("password", "invalid_password");
		cy.request({
			"method": "POST",
			"url": "/api/login",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
			expect(response.status).to.equal(422);
		});
	});
});

