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

describe("Route `/api/order` - Order Operations", () => {
	it("lists all orders of authenticated user", () => {
		// TODO: make setting cookie unmanual (this is currently whiteboxed)
		// TODO: make separate database for test environment (currently testing on dev environment database)
		cy.setCookie("auth", "Chaim_McDermott@dana.io_1698226523787");
		cy.request({
			"url": "/api/order",
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body).to.be.a("array");
		});
	});
});
