/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import {Settings} from '../api/user/user.model';
import Dog from '../api/dog/dog.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

Settings.create({
  owner: true,
  search_radius: 10,
  available_now: false,
  acnt_active: true,
  calendar_public: true
})
  .then((settings) => {
    User.find({}).remove();
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      address: '123 Cool Pl',
      city: 'Centennial',
      state: 'Colorado',
      about: 'I am a test user',
      telephone: '303-111-2222',
      backgroundCheck: true,
      settings: settings
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
      address: '123 Cool Pl',
      city: 'Centennial',
      state: 'Colorado',
      about: 'I am a test admin user',
      telephone: '303-111-2222',
      backgroundCheck: false
    })
    .then((testUser) => {
      Dog.create({
        owner_user: testUser,
        owner: true,
        name: 'Reese',
        breed: 'Chow/lab mix',
        photo: 'http://www.photo.com/photo.jpg',
        bio: 'I\'m an adorable black lab',
        vet_contact: 'not sure',
        rating: 10
      })
      .then((dog) => {
        testUser.dogs.push(dog);
        testUser.save();
        console.log('Seeded user: ', testUser);
        console.log('finished populating users');
      })
    });
  });
