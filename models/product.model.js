const mongodb = require('mongodb');
const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; // with the plus symbol we ensure that wen we get price here forces a convertion to a number
        this.description = productData.description;
        this.image = productData.image // the name of the image file
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findById(productId){
        let prodId;
        try {
          prodId = new mongodb.ObjectId(productId);  
        } catch (error) {
            error.code = 404;
            throw error;
        }
        
        const product = await db.getDb().collection('products').findOne({ _id: prodId });

        if (!product) {
            const error = new Error('Could not find product with provided id.');
            error.code = 404;
            throw error;
        }

        return product;
    }

    static async findAll(){
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function(productDocument){
            return new Product(productDocument);
        });
    }

    async save() {
        const productData = { // here we don't want to store the image path but just the image name
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image //this is just the image name

        }
        await db.getDb().collection('products').insertOne(productData);
    }

}

module.exports = Product;