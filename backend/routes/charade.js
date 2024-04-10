const express = require('express');
const router = express.Router();

const charadeCtrl = require('../controllers/charade'); 

router.get('/', charadeCtrl.getAllCharades); 

router.get('/details', charadeCtrl.getAllTitlesAndFormats);  

router.post('/add', charadeCtrl.addCharade); 

// router.get('/:id', charadeCtrl.getSingleCharade); 

// router.delete('/:id', charadeCtrl.deleteCharade); 

// router.put('/:id/comments', charadeCtrl.addComment); 

// router.put('/:id/likes', charadeCtrl.likeCharade); 

// router.put('/:id', charadeCtrl.modifyCharade); 

module.exports = router; 
