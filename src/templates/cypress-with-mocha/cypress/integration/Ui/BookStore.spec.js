/// <reference types="cypress" />

import store from '../../support/BookStore/BookStorePage'
import {screenshot} from '../../support/utils'

describe('Book Store Demo QA', () =>{
    beforeEach(() => {
        cy.visit('/books')
    })

    context('Happy path', () => {
        it('Validate screen', function () {
            store.validateTitle()
            store.validateElementsScreen()
            screenshot()
        })

        it('Search book', function () {
            const nameBook = 'Git Pocket Guide'
            store.inputNameBook(nameBook)
            store.validateNameBook(nameBook)
            screenshot()
        })

        it('Click in book', function () {
            const nameBook = 'Git Pocket Guide'
            store.inputNameBook(nameBook)
            store.clickInLinkNameBook()
            store.validateDetailBook(nameBook)
            screenshot()
        })
    })

    context('Alternative path', () => {
        it('Search wrong book name', function () {
            const nameBook = 'Invalid book'
            store.inputNameBook(nameBook)
            screenshot()
        })
    });
})
