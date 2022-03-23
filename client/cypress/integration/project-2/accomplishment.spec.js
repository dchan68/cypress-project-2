/// <reference types="cypress" />

describe("Accomplishment Dashboard", () => {
    beforeEach(() => {
        cy.visit("/accomplishments")
    })

    it("should display inappropriate content error when text or accomplishment includes giraffe", () => {
        cy.get("[placeholder='Title']").type("This is my accomplishment")
        cy.get("[placeholder='My accomplishment...']").type("I pet a giraffe")
        cy.get("[type='checkbox']").click()
        cy.get("button").click()
        cy.contains("Your content is not appropriate").should("be.visible")
    })

    //Instead of doing what's above, can do this using Mock
    it("should display inappropriate content error when text or accomplishment includes giraffe using Mock", () => {

        cy.intercept('POST', "http://localhost:4000", (req) => {
            req.reply((res) => {
                res.send({
                    msg: "Your content is not appropriate"
                })
            })
        })
        cy.get("[placeholder='Title']").type("This is my accomplishment")
        cy.get("[placeholder='My accomplishment...']").type("I pet a giraffe")
        cy.get("[type='checkbox']").click()
        cy.get("button").click()
        cy.contains("Your content is not appropriate").should("be.visible")
    })
})

