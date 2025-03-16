describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the hero section with video and content', () => {
    cy.get('.hero').should('exist');
    cy.get('.hero-video').should('exist');
    cy.get('.hero-content-container').should('exist');
    cy.get('.hero-content').should('exist');
    cy.get('.hero-content p').contains('Latest in Trends');
    cy.get('.hero-content h2').contains('Discover Our Wide Collection');
    cy.get('.hero-content p').contains('Bringing you the finest luxury products to match your perfect style.');
    cy.get('.hero-content .btn').contains('Shop Now');
  });

  it('should display the browse categories section', () => {
    cy.goToCategoryList();
  });
  it('should display the popular products section', () => {
    cy.get('.popular-categories').should('exist');
    cy.get('.popular-categories h3').contains('Popular Products');
    cy.get('.categories-wrapper').should('exist');
    cy.get('.category-grid').should('exist');
    cy.get('.category-item').should('have.length', 8);
    cy.get('.category-item.large').should('have.length', 3);
    cy.get('.category-item.medium').should('have.length', 3);
    cy.get('.category-item.small').should('have.length', 2);
    cy.get('.category-item.offset-up').should('have.length', 3);
    cy.get('.category-item.offset-down').should('have.length', 2);
  });

  it('should display the footer with logo, address, links, and social icons', () => {
    cy.get('.footer').should('exist');
    cy.get('.footer-logo-container').should('exist');
    cy.get('.footer-logo').contains('LUXORA');
    cy.get('.footer-address').contains('Address of the Company');
    cy.get('.footer-links').should('exist');
    cy.get('.footer-links li').should('have.length', 3);
    cy.get('.footer-right').should('exist');
    cy.get('.footer-right a').should('have.length', 3);
    cy.get('.privacy-policy').contains('Privacy & Policy');
    cy.get('.footer-divider').should('exist');
    cy.get('.footer-bottom-text').contains('All rights reserved');
  });


  it('should handle category scrolling', () => {
    cy.get('.scroll-arrow').click();
    cy.get('.categories-wrapper').should('exist');
  });

  it('should handle user login', () => {
    // Open the login modal
    cy.get('.login-btn').click();
    cy.get('.login-modal').should('exist');

    // Fill in the login form
    cy.get('.login-modal input[placeholder="Username"]').type('akd');
    cy.get('.login-modal input[placeholder="Password"]').type('aa');

    // Submit the login form
    cy.get('.login-modal .login-submit').click();
  
  });

  it('should navigate to category page on clicking "View Products"', () => {
    // Click on the "View Products" button in the first category card
    cy.get('.category-card').first().within(() => {
      cy.get('.view-category-btn').click();
    });

    // Verify that the category page is loaded
    cy.url().should('include', '/category/');
    cy.get('.category-page').should('exist');


    // Check for the presence of elements on the category page
    cy.get('.banner-container').should('exist');
    cy.get('.shop-container').should('exist');
    cy.get('.sidebar').should('exist');
    cy.get('.right-section').should('exist');
    cy.get('.product-grid').should('exist');
    cy.get('.filter-button').contains('SHIRTS').click();

    // Add the first two products to the cart
    cy.get('.product-card').eq(0).within(() => {
      cy.get('.add-to-cart-btn').click();
    });
    
    cy.get('.product-card').eq(1).within(() => {
      cy.get('.add-to-cart-btn').click();
    });
    
    cy.visit('http://localhost:3000/Cart'); 
    
    // Open the login modal
    cy.get('.login-btn').click();
    cy.get('.login-modal').should('exist');
    
    // Fill in the login form
    cy.get('.login-modal input[placeholder="Username"]').type('akd');
    cy.get('.login-modal input[placeholder="Password"]').type('aa');
    
    // Submit the login form
    cy.get('.login-modal .login-submit').click();
    
    cy.get('.checkout-btn').click();

    });

  it("check signup ", ()=>{
    cy.visit('http://localhost:3000/Signup');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('password');
    cy.get('.signup-button').click();
    
  })
    
  });



