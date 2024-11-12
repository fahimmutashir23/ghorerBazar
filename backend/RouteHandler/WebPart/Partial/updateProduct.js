const Products = require("../../../Schemas/Product/product");

const updateProduct = async (products) => {
    for (const product of products) {
      const id = product.productId;
      const quantity = product.quantity;
  
      await Products.updateOne(
        { _id: id },
        {
          $inc: {
            sold: quantity,    // Increment sale by quantity
            stock: -quantity,   // Decrement stock by quantity
          },
        }
      );
    }
}

module.exports = updateProduct;