Write an angular application with the following requirements

Create DTO like this which will be used to make requests
creditCardNumber (mandatory, string)
cardholder (mandatory, string)
expirationDate (mandatory, Date, cannot be in the past)
securityCode (optional, string, 3 digits)
amount (mandatory, number, must be greater than 0)

Write a Payment service with a function that creates a POST request. 

Create a new page and a new component (to be used in this page) with inputs for the DTO created at point 1, and add validations on these inputs based on the mandatory or optional parameters described. Create a button with a click event and call the payment service method.

In the app.component.html, create a button (name it anyway you like) or an <a> and use the angular router to navigate to the new page created at the previous point.

Recommendations:
Use the style guide to separate the models/dto and the services 
Use RxJS when making requests
To test this, you can create any backend of your choice and make sure the endpoint is reached.
Avoid as much as you can the any type. Use it only if needed. It is strongly recommended to use types in TypeScript
When subscribing to anything, make sure to unsubscribe when the component is destroyed

Optional:
Use CSS or SCSS to style your component(s). Although functionality is more important, you can also make it look pretty.
