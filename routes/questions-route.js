const router = require("express").Router();
const {Question,validateQuestion} = require("../Models/questions-model");

const ErrorResponse=require('../utils/errorResponse')

router.get('/',async(req,res)=>{
    try{
        const allquestion=await Question.find();
        if(!allquestion) return next(new ErrorResponse(`no questions`))
        res.json({allquestion})
    }catch(err){
        next(err)
    }

})
router.get('/:id',async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id);
        if(!question) return next(new ErrorResponse(`no question`))
        res.json({question})
    }catch(err){
        next(err)
    }
   
})

router.post('/',async(req,res,next)=>{
    try{
        const { error } =validateQuestion(req.body);
        if (error) return next(new ErrorResponse(error.details[0].message));
      
        const question=new Question({
            title:req.body.title,
            choose:req.body.choose,
            mark:req.body.mark
        })
        const savedQuestion=await question.save();
        res.send(savedQuestion);
    }catch(err){
        next(err)
    }


})

router.get('/answersofquestion',async(req,res,next)=>{
    try{
        const question=await Question.find()   
        const descs =question.map(function(i){
             return i.choose.map(function(v){
                       return v.isCorrect
             })
        })
       res.send(descs)
    }catch(err){
        next(err)
    }


})
router.delete("/delete/:id", async (req, res,next) => {
    try{
        const question = await Question.findByIdAndRemove(req.params.id);
        if (!question) return next(new ErrorResponse(`no question found for delete it `))
        res.json({ message: " removed success" });
    }catch(err){
        next(err)
    }
      
  });




module.exports=router;
