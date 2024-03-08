describe('Time estimation functionality', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('.sc-bMvGRv.IstSR').click()
        })
        cy.get('[data-testid="modal:tracking"]').within(() => {
            cy.get('input[placeholder="Number"]').first().clear()
            cy.get('input[placeholder="Number"]').eq(1).clear()
            cy.contains('button', 'Done')
                .click()
                .should('not.exist')
                
        })

      });
    })
        const estimatedHours = '10'
        const newEstimatedHours = '20'
        const getIssueDetails = () => cy.get('[data-testid="modal:issue-details"]')
        const getTimeWindow = () => cy.get('[data-testid="modal:tracking"]')
        const timeSpent = '2'
        const timeRemaining = '5'

    
    

    it('Should add, edit and remove time estimation', () =>{
        
        
         //Add estimation
         getIssueDetails().within(() => {
            cy.get('.sc-rBLzX.irwmBe').should('contain', 'No time logged') //Step 1
            cy.get('.sc-dxgOiQ.HrhWu')
                .click()
                .clear()
                .type(estimatedHours).type('{enter}')// Step 2     
            cy.get('.sc-dxgOiQ.HrhWu').should('value', estimatedHours)
            cy.get('.sc-rBLzX.irwmBe').should('contain', estimatedHours)

            cy.get('[data-testid="icon:close"]').first().click() // Step 3 
        })

        cy.get('[data-testid="list-issue"]')
            cy.contains('This is an issue of type: Task.').click(); // Step 4


        cy.get('.sc-dxgOiQ.HrhWu').should('value', estimatedHours)
        cy.get('.sc-rBLzX.irwmBe').should('contain', estimatedHours)
        cy.get('.sc-bMvGRv.IstSR').click()
        getTimeWindow().within(() => {
            cy.get('.sc-fhYwyz.jxvanQ').should('contain', estimatedHours)
            cy.get('[data-testid="icon:close"]')
            .click()
            .should('not.exist')
        })

        //Update estimation
         getIssueDetails().within(() => {
            cy.get('.sc-dxgOiQ.HrhWu')
                .click()
                .clear()
                .type(newEstimatedHours).type('{enter}') // Step 1
            cy.get('.sc-dxgOiQ.HrhWu').should('value', newEstimatedHours)
            cy.get('.sc-rBLzX.irwmBe').should('contain', newEstimatedHours)
            cy.get('[data-testid="icon:close"]').first().click() //Step 2
         })

         cy.get('[data-testid="list-issue"]')
            cy.contains('This is an issue of type: Task.').click(); //Step 3

      
         cy.get('.sc-dxgOiQ.HrhWu').should('value', newEstimatedHours)
         cy.get('.sc-rBLzX.irwmBe').should('contain', newEstimatedHours)
         cy.get('.sc-bMvGRv.IstSR').click()
         getTimeWindow().within(() => {
            cy.get('.sc-fhYwyz.jxvanQ').should('contain', newEstimatedHours)
            cy.get('[data-testid="icon:close"]')
            .click()
            .should('not.exist')
        })

        //DELETING ESTIMATION
        getIssueDetails().within(() => { //Step 1
            cy.get('.sc-dxgOiQ.HrhWu')
                .click()
                .clear()
                .type('{enter}')
                .click({ force: true });
            cy.get('.sc-dxgOiQ.HrhWu').should('be.empty')
                
            cy.get('.sc-rBLzX.irwmBe') 
                .find('div') 
                .should('have.length', 1);
            cy.get('[data-testid="icon:close"]').first().click() // Step 2     
        })

        cy.get('[data-testid="list-issue"]') // Step 3
        cy.contains('This is an issue of type: Task.').click(); 

    
        cy.get('.sc-rBLzX.irwmBe') 
                .find('div') 
                .should('have.length', 1);

        cy.get('.sc-bMvGRv.IstSR').click()
        getTimeWindow().within(() => {
            cy.get('.sc-rBLzX.irwmBe') 
                .find('div')  
                .should('have.length', 1); 
            cy.get('[data-testid="icon:close"]')
                .click()
                .should('not.exist')
        })
        
    })

    it('Should add, edit and remove time spent and remaining', () =>{

        //Log time
        getIssueDetails().within(() => {
            cy.get('.sc-bMvGRv.IstSR').click() // Step 1
        })
        getTimeWindow().within(() => {
            cy.get('input[placeholder="Number"]')
            .should('be.visible') //Step 2
            .first()
            .click()
            .clear().
            type(timeSpent) //Step 3
            cy.get('input[placeholder="Number"]').eq(1).clear().type(timeRemaining)//Step 4
        })
        getTimeWindow().within(() => {
            cy.contains('button', 'Done') // Step 5
                .click()
                .should('not.exist')
        })
      
            cy.get('.sc-rBLzX.irwmBe').should('not.contain', 'No Time Logged')
            cy.get('.sc-rBLzX.irwmBe').should('contain', timeSpent).and('contain', 'logged')
            cy.get('.sc-rBLzX.irwmBe').should('contain', timeRemaining).and('contain', 'remaining')

             
        //Remove logged time
        getIssueDetails().within(() => {
            cy.get('.sc-bMvGRv.IstSR').click() //Step 1
        })
        getTimeWindow().within(() => {
            cy.get('input[placeholder="Number"]')
            .should('be.visible') //Step 2
            .first()
            .click()
            .clear()
            cy.get('input[placeholder="Number"]').eq(1).click().clear() //Step 3,4
        })
        getTimeWindow().within(() => {
        cy.contains('button', 'Done')//Step 5
            .click()
            .should('not.exist')
        })
        //assert
        cy.get('.sc-rBLzX.irwmBe').should('contain', 'No time logged' )
        getIssueDetails().within(() => {
            cy.get('[class="sc-dxgOiQ HrhWu"]')
                .click()
                .clear()
                .type('{enter}')
            cy.get('.sc-dxgOiQ.HrhWu').should('be.empty')})
            cy.get('.sc-rBLzX.irwmBe') 
                .find('div')  
                .should('have.length', 1).and('contain', 'No time logged')

    })

})