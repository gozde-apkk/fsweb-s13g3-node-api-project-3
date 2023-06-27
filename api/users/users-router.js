const express = require('express');

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir
const userModel = require("./users-model");
const postModel = require("../posts/posts-model");

const mw = require("../middleware/middleware");
const router = express.Router();

router.get('/', async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try{
    let allUser = await userModel.get();
    res.json(allUser);
  }catch(error){
    res.status(500).json({message:"error"})
  }
});

router.get('/:id',mw.validateUserId ,(req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  try{
    res.json(req.currentUser)
  }catch(error){
    next(error);
  }
});

router.post('/',mw.validateUserId , async(req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try{
    const insertedUser = await userModel.insert({name:req.body.name});
  }catch(error){
    next(error)
  }
});

router.put('/:id', mw.validateUserId , mw.validateUser , async(req, res,next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try{
   
    const updatedUser = await userModel.update(req.params.id,{name:req.body.id})
    res.json(updatedUser);
  }catch(error){
    next(error)
  }

});

router.delete('/:id', mw.validateUserId ,async(req, res,next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try{
    await userModel.remove(req.params.id);
    res.json(req.currentUser);
  }catch(error){
    next(error);
  }
});

router.get('/:id/posts',mw.validateUserId ,async (req, res,next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try{
    const userPost = await userModel.getUserPosts(req.params.id)
    res.json(userPost)
  }catch(error){
    next(error);
  }
});

router.post('/:id/posts', mw.validateUserId , async(req, res,next) => {
  // YENİ OLUŞTURULAN post NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try{
       let insertedPost = await postModel.insert({user_id:req.params.id, text:req.body.text});
       res.status(201).json(insertedPost)
  }catch(error){
    next(error);
  }
});

// routerı dışa aktarmayı unutmayın

module.exports = router;