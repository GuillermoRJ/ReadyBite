import Order from "../models/order.js";

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, status } = req.body;
    
    const order = new Order({
      items,
      totalAmount,
      status,
    });
    
    await order.save();
    
    // Es buena práctica popular los datos justo después de crear la orden
    // para que la respuesta al frontend esté completa
    await order.populate("items.product", "name price type");
    await order.populate("items.addons", "name price type");

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
      .populate("items.product", "name price")
      .populate("items.addons", "name price");

    if (!order)
      return res.status(404).json({ message: "Orden no encontrada" });
      
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  const { page = 1, limit = 10, sort = "createdAt" } = req.query;
  try {
    const orders = await Order.find()
      .sort({ [sort]: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("items.product", "name price")
      .populate("items.addons", "name price");
      
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editOrder = async (req, res) => {
  try {
    const updates = req.body;
    const targetId = Number(req.params.id);
    
    // Aplicamos returnDocument: "after" como lo vimos anteriormente
    const order = await Order.findOneAndUpdate(
      { orderId: targetId }, 
      updates, 
      { returnDocument: "after" }
    )
    .populate("items.product", "name price")
    .populate("items.addons", "name price");

    if (!order)
      return res.status(404).json({ message: "Orden no encontrada" });
      
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id });
    
    if (!order)
      return res.status(404).json({ message: "Orden no encontrada" });
      
    res.status(200).json({ message: "Orden eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createOrder,
  getOrderById,
  getOrders,
  editOrder,
  deleteOrder,
};