const el =  require('../elements/HomeElements').homeElements

class HomePage {
    validateMessagemWelcome() {
        cy.get(el.HOME.TITLE_PAGE).should('contain', 'Profile')
    }
}

export default new HomePage()