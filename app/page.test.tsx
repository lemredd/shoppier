describe("Page: `/`", () => {
	it("loads", () => {
		cy.visit("/");
		cy.get("main").should("have.text", "root page");
	});
});

