const Cart = require("../../../Schemas/Cart/cart");

const deleteCartData = async (userId) => {
  try {
    const result = await Cart.deleteMany({ userId: userId });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = deleteCartData;
