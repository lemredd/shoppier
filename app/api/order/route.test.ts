describe("Route `/api/order` - Unauthorized Access", () => {
	it("responds with unauthorized status", () => {
		cy.getCookie("auth").should("be.null");
		cy.request({
			"url": "/api/order",
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(401);
		});

		cy.setCookie("auth", "foobarbaz");
		cy.request({
			"url": "/api/order",
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(401);
		});
	});
});

