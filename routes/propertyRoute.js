const express= require("express")
const router = express.Router()
const {createProperty,getAllProperty,findSingleProperty,editProperty,deleteProperty} = require("../Controller/propertyController")
const auth = require("../middleware/authMiddleware")


router.post("/create",auth,createProperty)
router.get("/getAll",auth,getAllProperty)
router.get("/:id",auth,findSingleProperty)
router.put("/:id",auth,editProperty)
router.delete("/:id",auth,deleteProperty)

module.exports = router;