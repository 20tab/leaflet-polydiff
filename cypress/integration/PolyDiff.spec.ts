context("Map", () => {
  describe("Layers", () => {
    describe("Polydiff", () => {
      it("generates diff polygons", () => {
        cy.visit("");
        cy.get("a[title='Zoom out']").click();
        cy.get("[stroke='#f9c4c0']");
        cy.wait(400);
        cy.get("a[title='Zoom out']").click();
        cy.get("[stroke='#6351c6']");
      });
    });
  });
});
