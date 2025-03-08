describe("Swiper Gallery Test", function () {
	it('Checks if second slide contains "United Kingdom"', function () {
		cy.visit("http://localhost:3000");
		cy.get(".swiper-button-next").click();
		cy.get(".swiper-slide-active").should("contain", "United Kingdom");
	});
});

describe("Swiper Gallery Test", function () {
	it('Checks if third slide contains "Paris"', function () {
		cy.visit("http://localhost:3000");
		cy.get(".swiper-button-next").click();
		cy.wait(2000);
		cy.get(".swiper-button-next").click({ force: true });
		cy.wait(2000);
		cy.get(".swiper-slide-active").should("contain", "Paris");
	});
});

describe("Swiper Gallery Additional Tests", () => {
	const baseUrl = "http://localhost:3000";

	beforeEach(() => {
		cy.visit(baseUrl);
	});

	it("Pozwala na nawigację między slajdami za pomocą przycisków", () => {
		cy.get(".swiper-slide-active .card-description").within(() => {
			cy.get("h1").should("contain", "Rome");
			cy.get("p").should("contain", "Italy");
		});

		cy.get(".swiper-button-next").click();
		cy.wait(2000);
		cy.get(".swiper-slide-active .card-description").within(() => {
			cy.get("h1").should("contain", "London");
			cy.get("p").should("contain", "United Kingdom");
		});

		cy.get(".swiper-button-next").click({ force: true });
		cy.wait(2000);
		cy.get(".swiper-slide-active .card-description").within(() => {
			cy.get("h1").should("contain", "Paris");
			cy.get("p").should("contain", "France");
		});

		cy.get(".swiper-button-prev").click({ force: true });
		cy.wait(2000);
		cy.get(".swiper-slide-active .card-description").within(() => {
			cy.get("h1").should("contain", "London");
			cy.get("p").should("contain", "United Kingdom");
		});
	});

	it("Wyświetla tytuł i opis dla każdego slajdu", () => {
		const slides = [
			{ title: "Rome", description: "Italy" },
			{ title: "London", description: "United Kingdom" },
			{ title: "Paris", description: "France" },
		];

		slides.forEach((slide, index) => {
			cy.visit(baseUrl);
			for (let i = 0; i < index; i++) {
				cy.get(".swiper-button-next").click();
				cy.wait(500);
			}
			cy.get(".swiper-slide-active .card-description").within(() => {
				cy.get("h1").should("contain", slide.title);
				cy.get("p").should("contain", slide.description);
			});
		});
	});

	it("Galeria poprawnie dostosowuje się do różnych urządzeń", () => {
		const viewports = [
			{ name: "desktop", width: 1440, height: 900 },
			{ name: "tablet", width: 768, height: 1024 },
			{ name: "mobile", width: 375, height: 667 },
		];

		viewports.forEach((vp) => {
			cy.viewport(vp.width, vp.height);
			cy.visit(baseUrl);

			cy.get(".swiper").should("be.visible");

			cy.get(".swiper-button-next").should("be.visible").click();
			cy.wait(2000);
			cy.get(".swiper-button-prev").should("be.visible").click();
			cy.wait(2000);
		});
	});

	it("Wszystkie elementy galerii są poprawnie wyświetlane", () => {
		cy.visit(baseUrl);

		cy.get(".swiper").should("be.visible");

		cy.get(".swiper-slide .card-description h1").then(($titles) => {
			const uniqueTitles = [
				...new Set($titles.map((i, el) => Cypress.$(el).text()).get()),
			];
			expect(uniqueTitles).to.have.length(3);
		});

		cy.get(".swiper-button-next").should("exist").and("be.visible");
		cy.get(".swiper-button-prev").should("exist").and("be.visible");
	});
});
