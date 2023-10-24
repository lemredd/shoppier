describe("Route `/api` - Unauthorized Access", () => {
	it("responds with unauthorized status", () => {
		cy.getCookie("auth").should("be.null");
		cy.request({
			"url": "/api/order",
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(401);
		});
	});
});

