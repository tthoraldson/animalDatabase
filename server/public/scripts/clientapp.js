$(document).ready(function(){
  console.log('document ready');

  displayAnimals();
  $('#add').on('click', '#addAnimal', addAnimal);
});

function addAnimal(){
  event.preventDefault();
  console.log('clicked');
  var animal = {};

  $.each($('#add').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });

  console.log(animal);

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function () {
      console.log('POST /animals works!');
      $('#display').empty();
      displayAnimals();
    },

    error: function (response) {
      console.log('POST /animals does not work...');
    }
  });
};

function displayAnimals(){
  $.ajax({
      type: 'GET',
      url: '/animals',
      success: function (animals) {
        $('#display').empty();

        console.log('GET /animals returns:', animals);
        animals.forEach(function (animal) {
          $('#display').append('<li><b>' + animal.animal + '</b> ' + animal.count + '</li>');
        });
      },


      error: function (response) {
        console.log('GET /animals fail. No animals could be retrieved!');
      }
    });
};
