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

	});
});
