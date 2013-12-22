PlaceApp.directive(
  'triggerButton',
  function(){
    return {
      restrict: 'E',
      templateUrl: '/partials/directives/trigger_button.html'
    };
  }
).directive(
  'myCustomer',
  function(){
    return {
      template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
  }
)