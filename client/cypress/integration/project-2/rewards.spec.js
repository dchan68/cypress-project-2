/// <reference types="cypress" />

describe("Rewards dashboard", () => {
    beforeEach(() => {
        cy.visit("/rewards")
    })

    it("should display a list of rewards", () => {
        cy.get("ul")
          .should("contain", "500 points for drinking 8 cups of water for 7 straight days")
          .and("contain", "850 points for fasting for 5 days straight")
    })

    it("should display a lit of rewards with mock", () => {
        cy.intercept("GET", "http://localhost:4000/rewards", { //Note that it's 4000 bc server from server folder is listening on port 4000
            fixture: "rewards.json"
        })

        cy.get("ul")
        .should("contain", "500 points for drinking 8 cups of water for 7 straight days")
        .and("contain", "850 points for fasting for 5 days straight")
    })
})