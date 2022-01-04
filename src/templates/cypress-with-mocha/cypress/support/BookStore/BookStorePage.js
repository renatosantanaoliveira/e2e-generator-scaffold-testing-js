const el =  require('./BookStoreElements').bookStoreElements

class HomePage {
    validateTitle() {
        cy.get(el.LIST.TITLE).should('contain', 'Book Store')
    }

    validateElementsScreen(){
        cy.get(el.LIST.TITLE).should('be.visible')
        cy.get(el.LIST.INPUT_BOOK).should('be.visible')
        cy.get(el.LIST.TABLE_BOOKS).should('be.visible')
    }

    inputNameBook(name){
        cy.get(el.LIST.INPUT_BOOK).type(name)
    }

    validateNameBook(name){
        cy.contains(name).should('be.visible')
    }

    clickInLinkNameBook(){
        cy.get(el.LIST.LINK_FIRST_BOOK).click()
    }

    validateDetailBook(title){
        cy.get(el.DETAIL_BOOK.LBL_ISBN).should('be.visible')
        cy.get(el.DETAIL_BOOK.BOOK_TITLE).should('be.visible')
        cy.contains(title).should('be.visible')
        cy.get(el.DETAIL_BOOK.BOOK_AUTHOR).should('be.visible')
    }
}

export default new HomePage()