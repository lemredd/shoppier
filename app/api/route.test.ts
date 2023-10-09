describe("Route: `/api`", () => {
	it("requests", () => {
		cy.request("/api");
	});

	it("responds with list of ..." /* For now, this lists users */, () => {
		cy.request("/api").then(response => {
			// TODO: make route depend on a test environment database
			expect(response.status).to.equal(200);
			expect(response.body).to.be.a("array");
		});
	});
});
