const Product = require("../models/product.model")
const UploadToCloudinary = require("../utilites/cloudinary.utility")
const upload = require("../utilites/multer.utility")
const frontEndUrl = require("./frontendurl")
// adding a product
const addProduct = async  (req,res) =>{
    console.log(req.body)
    const {title,description,price,discount,subCategory,reviews,category,type,tags} = req.body;
    const imagesUrls = await Promise.all(
  req.files.map(file => UploadToCloudinary(file.path))
)

   let isNewArrival = type?.includes("isNewArrival") || false
   let isBestDeal = type?.includes('isBestDeal' ) || false
   let isFeatured = type?.includes('isFeatured' ) || false
    try {

       let newProduct = await Product.create({
        name : title,
        price,
        description,
        discount,
        category,
        isFeatured,
        isBestDeal,
        isNewArrival,
        tags,
        images : imagesUrls,
        subCategory
       })
       console.log('product saves successfully!')
    } catch (error) {
        console.log(error._message)
        console.log(error)
    }
   res.redirect(`${frontEndUrl}admin`)
}

// extrating all products 
const getProducts = async (req,res)=>{
    try {
        let products = await  Product.find();
        res.send(products)
    } catch (error) {
        res.send("an error occurred while fethcing data")
    }
}

// delete product
    const deleteProduct =  async (req,res)=>{
        const id = req.params.id;
        console.log(req.params)
        console.log(id)
        try {
            await Product.findByIdAndDelete(id)
            res.json({message:"product deleted"})
            
        } catch (error) {
            console.log('an error occured while delteing product')
        }
    }
module.exports = {addProduct,getProducts,deleteProduct}
