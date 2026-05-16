import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const appKey = "YOUR_KINVEY_APP_KEY"
const appSecret = "YOUR_KINVEY_APP_SECRET"
const kinveyBaseUrl = "https://baas.kinvey.com/";
const getAllUrl = kinveyBaseUrl + 'appdata' + "/" + appKey + '/flats';
//POST /user/:appKey/ HTTP/1.1

const demoUsers = [
  {
    _id: 'demo-admin',
    username: 'demo',
    profilePic: 'https://boygeniusreport.files.wordpress.com/2016/05/scared-surprised-cat-face.jpg?quality=98&strip=all&w=782',
    isAdmin: 'Yes',
    _kmd: { authtoken: 'demo-token' }
  }
];

let demoCats = [
  {
    _id: 'demo-mila',
    name: 'Mila',
    breed: 'Street',
    age: 2,
    contactNumber: 359888111222,
    information: 'Calm indoor cat that is ready for a local adoption demo. This record is hardcoded for offline review.',
    imgUrl: 'https://cdn.pixabay.com/photo/2016/08/10/14/39/cat-1583459__340.png',
    imgUrl2: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720__340.jpg',
    imgUrl3: 'https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736877__340.jpg',
    imgUrl4: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg',
    vaccinated: true,
    castrated: true,
    city: 'Sofia',
    _acl: { creator: 'demo-admin' }
  },
  {
    _id: 'demo-leo',
    name: 'Leo',
    breed: 'Tabby',
    age: 4,
    contactNumber: 359888333444,
    information: 'Playful cat listing used as local mock data when the historical Kinvey backend is unavailable.',
    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg',
    imgUrl2: 'https://cdn.pixabay.com/photo/2018/01/28/12/37/cat-3113513__340.jpg',
    imgUrl3: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720__340.jpg',
    imgUrl4: 'https://cdn.pixabay.com/photo/2016/08/10/14/39/cat-1583459__340.png',
    vaccinated: false,
    castrated: true,
    city: 'Plovdiv',
    _acl: { creator: 'demo-admin' }
  }
];

let demoMessages = [
  {
    _id: 'demo-message-1',
    message: 'Is Mila still available for adoption?',
    receiver: 'demo-admin',
    sender: 'demo-visitor',
    open: 'false',
    senderName: 'Portfolio Visitor',
    madeDate: '2026-05-14, 12:00',
    catName: 'Mila'
  }
];

@Injectable({
  providedIn: 'root'})
export default class KinveyRemoteServiceService {
  constructor(private http: HttpClient) { }
 
  //MAKE AUTH
  makeAuth(type) {
    return type === 'basic'
      ? 'Basic ' + btoa(appKey + ':' + appSecret)
      : 'Kinvey ' + localStorage.getItem('authtoken');
  }
  
  //IS AUTH
  isAuth() {
    return localStorage.getItem('authtoken') !== null;
  }

  //SAVE SESSION
  saveSession(userData) {
    localStorage.setItem('authtoken', userData._kmd.authtoken);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userId', userData._id);
    localStorage.setItem('picUrl', userData.profilePic);
    localStorage.setItem('isAdmin', userData.isAdmin);
  }

  //POST
  post(url, data, auth){
    return this.http.post(url, data, {headers: {'authorization': this.makeAuth(auth)}});
  }

  //PUT
  put(url, data, auth) {
    return this.http.put(url, data, { headers: { 'authorization': this.makeAuth(auth) } });
  }

  //GET
  get(url, auth) {
    return this.http.get(url, { headers: { 'authorization': this.makeAuth(auth) } });
  }

  //DELETE
  delete(url, id, auth){
    return this.http.delete(url, { headers: { 'authorization': this.makeAuth(auth) } })
  }

  //REGISTER
  register(username, password, profilePic){
    let userData = {
      _id: `demo-user-${Date.now()}`,
      username,
      profilePic: profilePic || demoUsers[0].profilePic,
      isAdmin: 'No',
      _kmd: { authtoken: 'demo-token' }
    };
    demoUsers.push(userData);
    return of(userData);
  }

  //LOGIN
  login(username, password) {
    return of(Object.assign({}, demoUsers[0], { username: username || demoUsers[0].username }));
  }

  //LOGOUT
  logout() {
    localStorage.clear();
    return of({ ok: true });
  }
  

  //UPDATE USER
  updateUser(username, password, id, profilePic) {
    let userData = Object.assign({}, demoUsers[0], { _id: id, username, profilePic });
    return of(userData);
  }

  //CREATE CAT
  CreateCat(name, breed, age, contactNumber, information, imgUrl, imgUrl2, imgUrl3, imgUrl4, vaccinated, castrated, city) {
    let obj = { _id: `demo-cat-${Date.now()}`, name, breed, age, contactNumber, information, imgUrl, imgUrl2, imgUrl3, imgUrl4, vaccinated, castrated, city, _acl: { creator: localStorage.getItem('userId') || 'demo-admin' } };
    demoCats = [obj].concat(demoCats);
    return of(obj);
  }

  //CREATE MESSAGE
  CreateMessage(message, receiver, sender, open, senderName, madeDate, catName) {
    let obj = { _id: `demo-message-${Date.now()}`, message, receiver, sender, open, senderName, madeDate, catName};
    demoMessages = [obj].concat(demoMessages);
    return of(obj);
  }

  //UPDATE MESSAGE
  UpdateMessage(catName, senderName, open, sender, receiver, message, madeDate, id) {
    let obj = { catName, senderName, open, sender, receiver, message, madeDate };
    demoMessages = demoMessages.map(messageData => messageData._id === id ? Object.assign({ _id: id }, obj) : messageData);
    return of(Object.assign({ _id: id }, obj))
  }

  //DELETE MESSAGE
  DeleteMessage(id) {
    demoMessages = demoMessages.filter(messageData => messageData._id !== id);
    return of({ _id: id })
  }

  //GET ALL CATS
  GetAllCats() {
    return of(demoCats);
  }

  //GET ALL USERS
  GetAllUsers() {
    return of(demoUsers);
  }
    
  //DELETE USER
  DeleteUser(id){
    return of({ _id: id })
  }

  //GET CAT BY ID
  GetCatById(id){
    return of(demoCats.find(cat => cat._id === id) || demoCats[0])
  }
  
  //UPDATE CAT BY ID
  UpdateCat(name, breed, age, contactNumber, information,imgUrl, id){
    let obj = { name, breed, age, contactNumber, information, imgUrl };
    demoCats = demoCats.map(cat => cat._id === id ? Object.assign({}, cat, obj) : cat);
    return of(Object.assign({ _id: id }, obj))
  }

  //DELETE CAT 
  deleteCat(id){
    demoCats = demoCats.filter(cat => cat._id !== id);
    return of({ _id: id });

  }

  //GET MESSAGES
  GetAllMessages() {
    return of(demoMessages);
  }

  //GET MESSAGES
  GetAllMessagesById(id) {
    return of(demoMessages.filter(message => message.receiver === id || message.sender === id));
  }

  //GET MESSAGE BY ID
  GetMessageById(id) {
    return of(demoMessages.find(message => message._id === id) || demoMessages[0]);
  }

  //GET USER BY ID
  GetUserById(id) {
    return of(demoUsers.find(user => user._id === id || user.username === id) || demoUsers[0])
  }
  
  //DELETE MESSAGE BY ID
  DeleteMessageById(id){
    demoMessages = demoMessages.filter(message => message._id !== id);
    return of({ _id: id });
  }
  


}




 
  
  


 

    

    
    



