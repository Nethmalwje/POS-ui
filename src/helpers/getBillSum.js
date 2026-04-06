function calculateTotalBill(items) {
  return items.reduce((total, item) => {
    const price = Number(item.price);
    //const price = 1;
    const quantity = Number(item.quantity);
    //const quantity = 1;
    return total + price * quantity;
  }, 0);
}
export default calculateTotalBill;
