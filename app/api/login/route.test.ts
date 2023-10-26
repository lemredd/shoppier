describe("Route `/api/login` - Authentication", () => {
	it("throws validation error", () => {
		const invalid_form_data = new FormData();
		cy.request({
			"method": "POST",
			"url": "/api/login",
			"form": true,
			"body": invalid_form_data,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.isOkStatusCode).to.be.false;
		});
	});
});

