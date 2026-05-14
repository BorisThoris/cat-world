import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const appKey = "YOUR_KINVEY_APP_KEY"
const appSecret = "YOUR_KINVEY_APP_SECRET"
const kinveyBaseUrl = "https://baas.kinvey.com/";
const getAllUrl = kinveyBaseUrl + 'appdata' + "/" + appKey + '/flats';
//POST /user/:appKey/ HTTP/1.1

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
    //POST /user/:appKey/ HTTP/1.1
    let obj = { username, password, profilePic:"https://boygeniusreport.files.wordpress.com/2016/05/scared-surprised-cat-face.jpg?quality=98&strip=all&w=782"};
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/";
    let data = obj;
    return (this.post(url, data, 'basic'));
  }

  //LOGIN
  login(username, password) {
    //POST /user/:appKey/login HTTP/1.1
    let obj = {username, password};
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/login";
    let data = obj;
    return (this.post(url, data, 'basic'));
  }

  //LOGOUT
  logout() {
    //POST /user/:appKey/_logout HTTP/1.1
    
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/_logout";
    let data = null;
    return (this.post(url, data, 'kinvey'));
  }
  

  //UPDATE USER
  updateUser(username, password, id, profilePic) {
    // PUT/user/:appKey/:id HTTP / 1.1
    let obj = { username, profilePic };
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/" + id;
    let data = obj;
    return (this.put(url, data, 'kinvey'));
  }

  //CREATE CAT
  CreateCat(name, breed, age, contactNumber, information, imgUrl, imgUrl2, imgUrl3, imgUrl4, vaccinated, castrated, city) {
    // /appdata/:appKey/:collectionName HTTP/1.1
    let obj = { name, breed, age, contactNumber, information, imgUrl, imgUrl2, imgUrl3, imgUrl4, vaccinated, castrated, city};
    let url = kinveyBaseUrl + 'appdata' + "/" + appKey + "/" + "Cats";
    let data = obj;
    return (this.post(url, data, 'kinvey'));
  }

  //CREATE MESSAGE
  CreateMessage(message, receiver, sender, open, senderName, madeDate, catName) {
    // /appdata/:appKey/:collectionName HTTP/1.1
    let obj = { message, receiver, sender, open, senderName, madeDate, catName};
    let url = kinveyBaseUrl + 'appdata' + "/" + appKey + "/" + "Messages";
    let data = obj;
    return (this.post(url, data, 'kinvey'));
  }

  //UPDATE MESSAGE
  UpdateMessage(catName, senderName, open, sender, receiver, message, madeDate, id) {
    ///appdata/:appKey/:collectionName/:id HTTP/1.1
    let obj = { catName, senderName, open, sender, receiver, message, madeDate };
    let url = kinveyBaseUrl + 'appdata' + '/' + appKey + '/' + "Messages" + "/" + id
    let data = obj;
    return (this.put(url, data, 'kinvey '))
  }

  //DELETE MESSAGE
  DeleteMessage(id) {
    //DELETE /appdata/:appKey/:collectionName/:id?query=... HTTP/1.1
    let url = kinveyBaseUrl + 'appdata' + '/' + appKey + '/' + "Messages" + "/" + id
    return (this.delete(url, id, 'kinvey '))
  }

  //GET ALL CATS
  GetAllCats() {
    // /appdata/:appKey/:collectionName HTTP/1.1
    let url = kinveyBaseUrl + 'appdata' + "/" + appKey + "/" + "Cats";
    return (this.get(url, 'kinvey'));
  }

  //GET ALL USERS
  GetAllUsers() {
    // GET /user/:appKey/:id HTTP/1.1
    // return remote.get('appdata', "Products", 'kinvey');
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/";
    return (this.get(url, 'kinvey'));
  }
    
  //DELETE USER
  DeleteUser(id){
    //DELETE /user/:appKey/:id HTTP/1.1
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/" + id;
    return (this.delete(url,  null, 'kinvey'))
  }

  //GET CAT BY ID
  GetCatById(id){
    //GET /appdata/:appKey/:collectionName/:id
    let url = kinveyBaseUrl + 'appdata' + "/" + appKey + "/" + "Cats" + "/" + id
    return (this.get(url, "kinvey"))
  }
  
  //UPDATE CAT BY ID
  UpdateCat(name, breed, age, contactNumber, information,imgUrl, id){
    ///appdata/:appKey/:collectionName/:id HTTP/1.1
    let obj = { name, breed, age, contactNumber, information, imgUrl };
    let url = kinveyBaseUrl + 'appdata' + '/' + appKey + '/' + "Cats" + "/" + id
    let data = obj;
    return (this.put(url, data, 'kinvey '))
  }

  //DELETE CAT 
  deleteCat(id){
    //DELETE /appdata/:appKey/:collectionName/:id?query=... HTTP/1.1
    let url = kinveyBaseUrl + 'appdata' + '/' + appKey + '/' + 'Cats' + '/' + id
    return(this.delete(url,id,'kinvey'));

  }

  //GET MESSAGES
  GetAllMessages() {
    // /appdata/:appKey/:collectionName HTTP/1.1
    // return remote.get('appdata', "Products", 'kinvey');
    let url = kinveyBaseUrl + 'appdata' + "/" + appKey + "/" + "Messages";
    return (this.get(url, 'kinvey'));
  }

  //GET MESSAGES
  GetAllMessagesById(id) {
    // /appdata/:appKey/:collectionName HTTP/1.1
    // return remote.get('appdata', "Products", 'kinvey');
    let url = kinveyBaseUrl + 'Messages' + "/" + appKey + "/" + id;
    return (this.get(url, 'kinvey'));
  }

  //GET MESSAGE BY ID
  GetMessageById(id) {
    //GET /appdata/:appKey/:collectionName/:id
    //let url = kinveyBaseUrl + 'appdata' + "/" + appKey + "/" + "Cats" + "/" + id
    let url = kinveyBaseUrl + "appdata" + "/" + appKey + "/" + "Messages" + "/" + id;
    return (this.get(url, 'kinvey'));
  }

  //GET USER BY ID
  GetUserById(id) {
    //GET /user/:appKey/:id HTTP/1.1
    let url = kinveyBaseUrl + 'user' + "/" + appKey + "/" + id; 
    return (this.get(url, "kinvey"))
  }
  
  //DELETE MESSAGE BY ID
  DeleteMessageById(id){
    let url = kinveyBaseUrl + 'appdata' + '/' + appKey + '/' + 'Messages' + '/' + id
    return (this.delete(url, id, 'kinvey'));
  }
  


}




 
  
  


 

    

    
    



