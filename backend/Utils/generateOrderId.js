const Bookings = require("../Schemas/Bookings/bookings");
const Sale = require("../Schemas/Sale/sale");

const generateOrderId = async () => {
  const totalBookings = await Bookings.estimatedDocumentCount();
  const generateId = `#TH00000${totalBookings + 1}`;
  return generateId;
};

const generateInvoiceId = async () => {
  const totalSale = await Sale.estimatedDocumentCount();
  const generateId = `#TH00000${totalSale + 1}`;
  return generateId;
};

const uniqueId = { generateOrderId, generateInvoiceId };
module.exports = uniqueId;
