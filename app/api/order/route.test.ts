describe("Route `/api` - Unauthorized Access", () => {
	it("responds with unauthorized status", () => {
		cy.request("/api/order").then(response => {
			expect(response.status).to.equal(401);
		});
	});
});

