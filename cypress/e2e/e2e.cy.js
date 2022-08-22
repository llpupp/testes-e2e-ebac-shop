/// <reference types="cypress" />

import adProdutos from '../support/page_objects/adProdutos.page';

const dadosProdutos = require('../fixtures/Produtos.json')

var faker = require('faker-br');


describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')

  
    });
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let empresaFaker = faker.company.companyName()
        let enderecoFaker = faker.address.streetName()
        let complementoFaker = faker.random.number()
        let cidadeFaker = faker.address.city()
        let estadoFaker = faker.address.state()
        let cepFaker = faker.address.zipCodeValid()
        let telefoneFaker = faker.phone.phoneNumber()
        let emailFaker = faker.internet.userName()
        let dominio = '@ebac.com'


        //adição de produtos

        adProdutos.adicionarProdutos(
            dadosProdutos[0].nome,
            dadosProdutos[0].tamanho,
            dadosProdutos[0].cor,
            dadosProdutos[0].quantidade
        )
        
        cy.get('.woocommerce-message').should('contain', '“Apollo Running Short” foi adicionado no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        
        adProdutos.adicionarProdutos(
            dadosProdutos[1].nome,
            dadosProdutos[1].tamanho,
            dadosProdutos[1].cor,
            dadosProdutos[1].quantidade
        )
        
        cy.get('.woocommerce-message').should('contain', '“Aether Gym Pant” foi adicionado no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        
        adProdutos.adicionarProdutos(
            dadosProdutos[2].nome,
            dadosProdutos[2].tamanho,
            dadosProdutos[2].cor,
            dadosProdutos[2].quantidade
        )
          
        cy.get('.woocommerce-message').should('contain', '“Arcadio Gym Short” foi adicionado no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        
        adProdutos.adicionarProdutos(
            dadosProdutos[3].nome,
            dadosProdutos[3].tamanho,
            dadosProdutos[3].cor,
            dadosProdutos[3].quantidade
        )
        
        cy.get('.woocommerce-message').should('contain', '“Ajax Full-Zip Sweatshirt” foi adicionado no seu carrinho.')

        // quantidade adicionada no carrinho

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)

        //finalização das compras

        cy.get('.woocommerce-message > .button').click()
        cy.get('.breadcrumb > .active').should('contain', 'Carrinho')
        cy.get('.checkout-button').click()
        cy.get('#order_review_heading').should('contain', 'Your order')

        // os detalhes de faturamento
        cy.detalhesFaturamento(nomeFaker, sobrenomeFaker, empresaFaker, 'Brasil', enderecoFaker, complementoFaker, cidadeFaker, estadoFaker, cepFaker, telefoneFaker, emailFaker + dominio)

        cy.get('#terms').check()
        cy.get('#place_order').click({ force: true })
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')
    });


})