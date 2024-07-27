const propertyModel = require("../model/propertyModel")


const createProperty = async(req,res)=>{

    try{

     const {propertyType,location,price,description} = req.body;

    
      const verifyProperty = await propertyModel.findOne({propertyType})

      if(verifyProperty){

         res.status(403).send({message : "Property already exists"})
      }else{
        console.log("exe")
        const createOne = new propertyModel({
       
            propertyType : propertyType,
            location : location,
            price : price,
            description : description
         
        })
          console.log("exe2"),
          await createOne.save();

          res.status(200).send({message : "property created..!"})
     }


      } catch(err){

         res.status(500).send({message : err.message})
      }    
}

const getAllProperty = async(req,res)=>{

   try{
    const allItems = await propertyModel.find({})
    
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
        const { keyword } = req.params;
       
        const resutls = await propertyModel
          .find({
            $or: [
              { propertyType: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
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
      console.log(data)
        const updateItem = await propertyModel.findByIdAndUpdate(id,data,{ new: true })
        res.status(200).send({message : "Property Updated",updateItem})
    }catch(err){
        res.status(500).send({message: err.message})
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

module.exports = {createProperty,getAllProperty,SearchProperty,findSingleProperty,editProperty,deleteProperty};