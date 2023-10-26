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
});

