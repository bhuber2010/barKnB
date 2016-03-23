/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import {Settings} from '../api/user/user.model';
import Dog from '../api/dog/dog.model';


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
      photo: 'http://goo.gl/DxGeaa',
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
