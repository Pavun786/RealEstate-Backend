const express= require("express")
const router = express.Router()
const {createProperty,getAllProperty,SearchProperty,findSingleProperty,editProperty,deleteProperty} = require("../Controller/propertyController")
const auth = require("../middleware/authMiddleware")


router.post("/create",auth,createProperty)
router.get("/getAll",auth,getAllProperty)
router.get("/:keyword",auth,SearchProperty)
router.get("/findOne/:id",auth,findSingleProperty)
router.put("/:id",auth,editProperty)
router.delete("/:id",auth,deleteProperty)

module.exports = router;