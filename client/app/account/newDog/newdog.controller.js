'use strict';

class NewDogController {
  constructor($scope, $state, $window, currentuserdata, DogData, User, Util) {
    this.errors = {};
    this.submitted = false;

    this.currentuserdata = currentuserdata;
    this.safeCb = Util.safeCb;
    this.$state = $state;
    this.$window = $window;
    this.User = User;
    this.DogData = DogData;

    $scope.$on('$stateChangeSuccess', () => {
      this.currentuserdata.getUserData()
        .then(userData => {
          console.log(userData);
          this.userData = userData;
        })

      this.ospry = new this.$window.Ospry('pk-test-bq46qdb2rtqoxaktikdso77w');

    });

  }

  uploadImg(img) {
    console.log(img);
    // this.ospry.up({
    //   files: img.files[0].file,
    //   imageReady: function(err, metadata, i) {
    //     if (err === null) {
    //       console.log('Image uploaded to: ', metadata);
    //     } else {
    //       console.log(err);
    //     }
    //   }
    // });
  }

  submitDog(form) {
    console.log(form);
    this.submitted = true;
    var newDog = new this.DogData();
    console.log(this.userData);
    if (form.$valid) {
      newDog.owner_user = this.userData._id;
      newDog.name = form.name.$modelValue;
      newDog.breed = form.breed.$modelValue;
      newDog.photo = form.photo.$modelValue;
      newDog.bio = form.bio.$modelValue;
      // newDog.shot = form.shot.$modelValue;
      newDog.vet_contact = form.vet_contact.$modelValue;
      newDog.$save().then((savedDog) => {
        console.log(savedDog);
        this.userData.dogs.push(savedDog);
        this.userData.$updateDog({ id: this.userData._id})
            .then((data) => {
              console.log(data);
              this.message = 'Profile successfully updated.';
              this.$state.go('profile');
            })
            .catch(() => {
              this.errors.other = 'Something went wrong!';
              this.message = '';
            })
      })
    }
  }
}

angular.module('barKnBApp')
  .controller('NewDogController', NewDogController);
