/// <reference types="cypress" />

describe('Test all features of SauceDemo web', () => {
    before(() => {
        cy.visit('https://www.saucedemo.com')
    });
    
    it('Testing login screen, should arrive at home screen', () => {
        cy.fixture("sauceDemo").then(user => {
            const user1 = user[0]
            const username = user1.username
            const password = user1.password

            cy.loginSauce(username, password)

            cy.url().should('include', 'inventory.html')
        })
    });

    it('Testing order feature, should go back to main home again after ordering', () => {
        cy.fixture("sauceDemo").then(user => {
            const user1 = user[0]
            const firstName = user1.firstName
            const lastName = user1.lastName
            const Zip = user1.Zip

            cy.get('#add-to-cart-sauce-labs-backpack').click()
            cy.get('.shopping_cart_link').click();

            cy.url().should('include', 'cart.html')
            cy.get('#checkout').click();

            cy.url().should('include', 'checkout-step-one.html')
            cy.get('#first-name').clear()
            cy.get('#first-name').type(firstName)

            cy.get('#last-name').clear()
            cy.get('#last-name').type(lastName)

            cy.get('#postal-code').clear()
            cy.get('#postal-code').type(Zip)

            cy.get('input[name="continue"]').click()

            cy.url().should('include', 'checkout-step-two.html')
            cy.get('#finish').click()

            cy.url().should('include', 'checkout-complete.html')
            cy.get('#back-to-products').click()

            cy.url().should('include', 'inventory.html')
        })
    });

    it('Testing feature sort from A-Z', () => {
        cy.get('.product_sort_container').select('az')
        cy.wait(1000);
        cy.get('.inventory_item_name').then(($items) => {
            const texts = [...$items].map(item => item.innerText);
            const sorted = [...texts].sort();

            expect(texts).to.deep.equal(sorted);
        });
    })

    it('Testing feature sort from Z-A', () => {
        cy.get('.product_sort_container').select('za')
        cy.wait(1000);
        cy.get('.inventory_item_name').then(($items) => {
            const texts = [...$items].map(item => item.innerText);
            const sorted = [...texts].sort().reverse();

            expect(texts).to.deep.equal(sorted);
        });
    })

    it('Testing feature sort from Low-High Price', () => {
        cy.get('.product_sort_container').select('lohi')
        cy.wait(1000);
        cy.get('.inventory_item_price').then(($items) => {
            const prices = [...$items].map(item => {
                const text = item.innerText.replace('$', '')
                return parseFloat(text)
            });
            const sorted = [...prices].sort((a, b) => a - b);

            expect(prices).to.deep.equal(sorted);
        });
    })

    it('Testing feature sort from High-Low Price', () => {
        cy.get('.product_sort_container').select('hilo')
        cy.wait(1000);
        cy.get('.inventory_item_price').then(($items) => {
            const prices = [...$items].map(item => {
                const text = item.innerText.replace('$', '')
                return parseFloat(text)
            });
            const sorted = [...prices].sort((a, b) => b - a)

            expect(prices).to.deep.equal(sorted);
        });
    })

    it('Testing Badge for how many items selected', () => {
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.log('Seharusnya tidak ada badge pada logo keranjang')

        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1')
        cy.log('Seharusnya ada badge angka 1 pada logo keranjang')

        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '2')
        cy.log('Seharusnya ada badge angka 2 pada logo keranjang')

        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('#remove-sauce-labs-bike-light').click()
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.log('Seharusnya tidak ada badge angka pada logo keranjang')
    });

    it('Logout from sauce demo', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('#login-button').should('be.visible').and('have.value', 'Login')
    });
})