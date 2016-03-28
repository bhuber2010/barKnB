'use strict';
(function(){

class CaretakerComponent {
  constructor($window, $timeout, dashdata, DogData, $state, $stateParams, lodash) {
    this.lodash = lodash;
    this.GMaps = $window.GMaps;
    this.google = $window.google;
    this.dashdata = dashdata;
    this.DogData = DogData;
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.selectedBreed = '';
    this.selectedCity = '';
    this.selectedState = '';
    this.mapViewToggle = true;

    this.map = new this.GMaps({
      div: '#map',
      lat: 39.7392360,
      lng: -104.9902510,
      zoom: 4
    });

    this.GMaps.geolocate({
      success: position => {
        this.map.setCenter(position.coords.latitude, position.coords.longitude);
        this.map.zoomIn(8);
      },
      error: error => {
        alert('Geolocation failed: ', error.message);
      },
      not_supported: () => {
        alert("Your browser does not support geolocation");
      }
    });

    this.DogData.getAllDogs().$promise
      .then(doglist => {
        this.dogs = doglist;
        return doglist;
      })
      .then(doglist => {
        var cats = {
          breeds: [],
          cities: [],
          states: [],
        };
        doglist.forEach(dog => {
          if (!dog.owner_user.city) {
            dog.owner_user.city = 'Unknown';
          }
          if (!dog.owner_user.state) {
            dog.owner_user.state = 'Unknown';
          }
          cats.breeds.push(dog.breed.toUpperCase());
          cats.cities.push(dog.owner_user.city.toUpperCase());
          cats.states.push(dog.owner_user.state.toUpperCase());

          this.mapResults(dog, this.$stateParams.activity)

        })

        this.breeds = lodash(cats.breeds).uniq().value();
        this.cities = lodash(cats.cities).uniq().value();
        this.states = lodash(cats.states).uniq().value();

        return this.map;
      })
      .then((map) => {
        console.log(this.map);
      })

  }

  toggleMap() {
    this.mapViewToggle = !this.mapViewToggle;
    this.google.maps.event.trigger(this.map,'resize');
  }

  selectedCityChanged(city) {
    this.GMaps.geocode({
      address: `${city}`,
      callback: (results, status) => {
        console.log(status, results);
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.map.setCenter(latlng.lat(), latlng.lng())
        }
      }
    })
  }

  selectedStateChanged() {
    this.map.removeMarkers();
    if (this.selectedState) {
      var filteredDogs = this.lodash.filter(this.dogs, dog => {
        return dog.owner_user.state.toLowerCase() == this.selectedState.toLowerCase()
      });
      filteredDogs.forEach((dog, i) => {
        this.mapResults(dog, this.$stateParams.activity);
        if (filteredDogs.length - 1 == i) {
          console.log(this.map);
          // this.map.fitZoom();
        }
      })
    } else {
      this.dogs.forEach((dog, i) => {
        this.mapResults(dog, this.$stateParams.activity);
        if (this.dogs.length - 1 == i) {
          console.log(this.map);
          // this.map.fitZoom();
        }
      })
    }
  }

  mapResults(dogObj, activity) {
    this.GMaps.geocode({
      address: `${dogObj.owner_user.address}, ${dogObj.owner_user.city}, ${dogObj.owner_user.state}`,
      callback: (results, status) => {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            title: dogObj.name,
            infoWindow: {
              content: `Name: ${dogObj.name}<br> Breed: ${dogObj.breed}`
            },
            icon : {
              url : '../../../assets/images/dog_icon.png'
            },
            click:(e) => {
              this.$state.go('schedule', {id: dogObj._id, activity: activity})
            },
            mouseover: function(e) {
              this.infoWindow.open(this.map, this);
            },
            mouseout: function(e) {
              this.infoWindow.close();
            }
          });
        }
      }
    });
  }

}

angular.module('barKnBApp')
  .component('caretaker', {
    templateUrl: 'app/dashboard/caretaker/caretaker.html',
    controller: CaretakerComponent,
    controllerAs: 'ct'
  });

})();
