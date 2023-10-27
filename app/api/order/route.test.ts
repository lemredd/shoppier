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

describe("Route `/api/order` - Form Data Validation", () => {
	it("throws validation error", () => {
		// TODO: make setting cookie unmanual (this is currently whiteboxed)
		cy.setCookie("auth", "TEST_DATA_auth_token");

		const body = new FormData();
		cy.request({
			"method": "POST",
			"url": "/api/order",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(422);
		});
		
		body.set("address_id", "x");
		body.append("item_ids", "x1");
		body.append("item_ids", "x2");
		cy.request({
			"method": "POST",
			"url": "/api/order",
			"headers": { "content-type": "multipart/form-data" },
			body,
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(422);
		});

		// TODO: validate non `multipart/form-data` body(?)
	});
});

describe("Route `/api/order` - Order Operations", () => {
	it("lists all orders of authenticated user", () => {
		// TODO: make setting cookie unmanual (this is currently whiteboxed)
		cy.setCookie("auth", "TEST_DATA_auth_token");
		cy.request({
			"url": "/api/order",
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body).to.be.a("array");
		});
	});

	it("converts cart into order", () => {
		// TODO: make setting cookie unmanual (this is currently whiteboxed)
		cy.setCookie("auth", "TEST_DATA_auth_token");
		cy.request({
			"method": "POST",
			"url": "/api/order",
			"failOnStatusCode": false
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body).to.be.a("array");
		});
	});
});
