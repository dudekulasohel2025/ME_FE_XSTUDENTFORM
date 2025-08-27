describe("Student Form App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // change to your app URL
  });
  
  it("UI renders: title and Form Inputs", () => {
    cy.contains("Student Registration Form").should("be.visible");
    cy.contains("Name").should("be.visible");
    cy.contains("Username").should("be.visible");
    cy.contains("College").should("be.visible");
    cy.contains("Email").should("be.visible");
    cy.contains("Password").should("be.visible");
    cy.contains("Address").should("be.visible");
    cy.contains("Register").should("be.visible");
  });

  it("Shows error when name is not filled", () => {
    cy.get('input[name="username"]').type("john");
    cy.get('input[name="college"]').type("IIT Delhi");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="address"]').type("Delhi, India");

    cy.contains("button", "Register").click();

    cy.contains("Name is required").should("be.visible");
  });

  it("Shows error for invalid email format", () => {
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="username"]').type("john");
    cy.get('input[name="college"]').type("IIT Delhi");
    cy.get('input[name="email"]').type("invalidEmail");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="address"]').type("Delhi, India");

    cy.contains("button", "Register").click();

    cy.contains("Enter a valid email address").should("be.visible");
  });

  it("Shows error if password is too short", () => {
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="username"]').type("john");
    cy.get('input[name="college"]').type("IIT Delhi");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="address"]').type("Delhi, India");

    cy.contains("button", "Register").click();

    cy.contains("Password must be at least 8 characters").should("be.visible");
  });
});

