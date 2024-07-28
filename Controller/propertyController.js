const propertyModel = require("../model/propertyModel")


const createProperty = async(req,res)=>{

    try{

     const {propertyType,location,price,description,userId} = req.body;

    
      const verifyProperty = await propertyModel.findOne({propertyType})

      if(verifyProperty){

         res.status(403).send({message : "Property already exists"})
      }else{
        console.log("exe")
        const createOne = new propertyModel({
       
            propertyType : propertyType,
            location : location,
            price : price,
            description : description,
            createdBy : userId
        })
          console.log("exe2"),
          await createOne.save();

          res.status(200).send({message : "property created..!"})
     }


      } catch(err){

         res.status(500).send({message : err.message})
      }    
}

const getAllPropertyOfUser = async(req,res)=>{
    
   try{
    const {userId} = req.params;
    const allItems = await propertyModel.find({createdBy : userId})
    
    if(allItems){
        res.status(200).send(allItems)
    }else{
        res.send({message : "No property find"})
    }
   }catch(err){

      res.status(500).send({message : err.message})   
    
    }
    
}

const SearchProperty = async(req,res)=>{
   
    
    try {
        const { keyword,userId } = req.params;
       
        const resutls = await propertyModel
          .find({
            $or: [
              { propertyType: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
            createdBy : userId
          })
         
        res.status(200).send(resutls);
      } catch (error) {
       
        res.status(400).send({
          success: false,
          message: "Error In Search Product API",
          error,
        });
      }
}

const findSingleProperty = async(req,res)=>{
  

    try{
    
    const {id} = req.params;
    
    const getSingle = await propertyModel.findById(id) 

     
    if(getSingle){
        res.status(200).send(getSingle)
    }else{
        res.send({message : "There is No property"})
    }
    }catch(err){
        res.status(500).send({message : err.message})
    }
}


const editProperty = async(req,res)=>{

    try{
        const {id} = req.params;
        const data = req.body;
    
        const updateItem = await propertyModel.findByIdAndUpdate(id,data,{ new: true })
        res.status(200).send({message : "Property Updated",updateItem})
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

const propertyFilter = async (req,res) =>{

    try{
     
       const { checked,radio,userId} = req.body;
     
       let args ={};


       if(checked.length > 0){
        args.location =  { $in: checked };
       }
       

       if(radio && radio.toString()) {
        let str = radio.split(",").map((ele)=> +ele)
        console.log(str)
        args.price = {$gte:str[0],$lte:str[1]}
       }
        
        
      if(checked.length == 1 && checked.includes("Others")){
       
        let values = ["Chennai","Coimbathore","Chengalpattu"]
        const property = await propertyModel.find(
            {createdBy:userId,
             location:{$nin: values},
             ...args.price && { price: args.price }
            });
        res.status(200).send({success: true,property});
        
      }
      else if(checked.length > 0 && !checked.includes("Others")){
       
        const property = await propertyModel.find({createdBy:userId,location:{$in: checked},...args.price && { price: args.price }});
        res.status(200).send({success: true,property});
      }
      else if(checked.length == 0){
        
        const property = await propertyModel.find({createdBy:userId,...args.price && { price: args.price }});
        res.status(200).send({success: true,property}); 

      }
       else{
       
        let values = ["Chennai","Coimbathore","Chengalpattu"]
        let arr = checked;
        let temp=[]
        for(let i=0;i<values.length;i++){
           if(!arr.includes(values[i])){
             temp.push(values[i])
           }
        }
       const property = await propertyModel.find({createdBy:userId,location:{$nin: temp},...args.price && { price: args.price }});
        res.status(200).send({success: true,property});
       
      }
       
    }catch(error){
      
      console.log(error);
      res.status(400).send({
  
        success: false,
        message:"Error while filter the products",
        error
      })
  }
  }

const deleteProperty = async(req,res)=>{

    try{
        const {id} = req.params;
       
        const removeItem = await propertyModel.findByIdAndDelete(id)

        if(!removeItem){
            res.status(200).send({message : "There is no peroperty found"})
        }else{
            res.status(200).send({message : "Property deleted",removeItem})
        }
        
    }catch(err){
        res.status(500).send({message: err.message})
    }


}

module.exports = {createProperty,getAllPropertyOfUser,SearchProperty,findSingleProperty,propertyFilter,editProperty,deleteProperty};