const express= require("express")
const router = express.Router()
const {createProperty,getAllPropertyOfUser,SearchProperty,findSingleProperty,propertyFilter,editProperty,deleteProperty} = require("../Controller/propertyController")
const auth = require("../middleware/authMiddleware")


router.post("/create",auth,createProperty)
router.get("/getAll/:userId",auth,getAllPropertyOfUser)
router.get("/search/:keyword/:userId",auth,SearchProperty)
router.get("/findOne/:id",auth,findSingleProperty)
router.put("/:id",auth,editProperty)
router.delete("/:id",auth,deleteProperty)
router.post("/property-filter",propertyFilter);

module.exports = router;