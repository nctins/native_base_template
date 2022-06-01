import express from 'express';
import authValidator from '../middleware/authValidator';
import authJWT from '../middleware/authJWT';
import AuthController from '../controllers/auth.controller';
import TopicController from '../controllers/topic.controller';
import VocabController from '../controllers/vocab.controller';
import { json } from 'body-parser';
import topicValidator from '../middleware/topicValidator';
import UserController from '../controllers/user.controller';

const APIRouter = express.Router();

//auth controller
APIRouter.post('/register', authValidator.register, AuthController.register);
APIRouter.post('/login', authValidator.login, AuthController.login);
APIRouter.post('/logout', authValidator.logout, AuthController.logout);
APIRouter.post('/refreshToken',authValidator.refreshToken, AuthController.refreshToken);

//topic controller
APIRouter.get('/getAllTopic', authJWT.verifyToken, TopicController.getAll);
APIRouter.post('/addTopic', authJWT.verifyToken, topicValidator.addTopic, TopicController.addTopic);
APIRouter.get('/search',authJWT.verifyToken, TopicController.topicSearch)
APIRouter.delete('/topic/:topicId', authJWT.verifyToken, topicValidator.removeTopic, TopicController.deleteTopic)

// vocab controller
APIRouter.get('/topic/:topicId/getVocab', authJWT.verifyToken, VocabController.getVocab);
APIRouter.get('/topic/:topicId/search', authJWT.verifyToken, VocabController.vocabSearch);
APIRouter.get('/vocab/:vocabId', authJWT.verifyToken, VocabController.getVocabById);
APIRouter.post('/topic/:topicId/addVocab', authJWT.verifyToken, VocabController.addVocab);
APIRouter.put('/vocab/:vocabId/updateVocab', authJWT.verifyToken, VocabController.updateVocab);
APIRouter.put('/vocab/:vocabId/changeFavorite', authJWT.verifyToken, VocabController.changeFavorite);
APIRouter.delete('/vocab/:vocabId/removeVocab', authJWT.verifyToken, VocabController.removeVocab)
APIRouter.get('/favorites', authJWT.verifyToken, VocabController.favorites);

// user controller
APIRouter.get('/user/getUser', authJWT.verifyToken, UserController.getUser);

// test api
APIRouter.post('/test', authJWT.verifyToken, (req,res)=>{
    res.status(200).json({
        success: true,
        message: "this is test api",
        JWTDecode: req.JWTDecode
    })
})

export default APIRouter