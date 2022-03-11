const express=require('express');

const router=express.Router();

const {create,findAll,findByproductId,updateByTagging,deleteByTaggingYear}=require('../controllers/productController')

router.post('/',create);

router.get('/',findAll);

router.get('/:id',findByproductId)

router.put('/update',updateByTagging)

router.put('/delete',deleteByTaggingYear)


module.exports = router;