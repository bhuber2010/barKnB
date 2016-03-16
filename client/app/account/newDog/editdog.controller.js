'use strict';

class EditDogController {
  constructor($scope, $state, $stateParams, currentuserdata, DogData) {
    this.errors = {};
    this.submitted = false;
    this.edit = false;

    this.currentuserdata = currentuserdata;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.DogData = DogData;

    $scope.$on('$stateChangeSuccess', () => {
      this.edit = true;
      this.currentuserdata.getUserData()
        .then(userData => {
          console.log(userData);
          this.userData = userData;
        })
      this.DogData.get({ id: $stateParams.dogID}).$promise
        .then((dog) => {
          console.log(dog);
          this.dog = {
            name: dog.name,
            breed: dog.breed,
            photo: dog.photo,
            bio: dog.bio,
            shot: dog.shot,
            vet_contact: dog.vet_contact
          };
        })
    });

  }

  submitDog(form) {
    console.log(form);
    this.submitted = true;
    var DogEdits = {};
    if (form.$valid) {
      DogEdits.owner_user = this.userData._id;
      DogEdits.name = form.name.$modelValue;
      DogEdits.breed = form.breed.$modelValue;
      DogEdits.photo = form.photo.$modelValue;
      DogEdits.bio = form.bio.$modelValue;
      // DogEdits.shot = form.shot.$modelValue;
      DogEdits.vet_contact = form.vet_contact.$modelValue;
      this.DogData.updateDog({ id: this.$stateParams.dogID}, DogEdits)
        .$promise
        .then((data) => {
          console.log(data);
          this.message = 'Profile successfully updated.';
          this.$state.go('profile');
        })
        .catch(() => {
          this.errors.other = 'Something went wrong!';
          this.message = '';
        })
    }
  }
}

angular.module('barKnBApp')
  .controller('EditDogController', EditDogController);
