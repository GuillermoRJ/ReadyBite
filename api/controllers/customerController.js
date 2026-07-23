import Customer from "../models/customer.js";

const createCustomer = async (req, res) => {
  try {
    const data = req.body;

    if (data.id) {
      const existingId = await Customer.findOne({ id: data.id });
      if (existingId)
        return res.status(400).json({
          message: "El número ya está registrado, por favor utiliza otro.",
        });
    }
    data.name.trim();
    const newCustomer = new Customer(data);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const user = await Customer.findOne({ id: req.params.id }).populate(
      "id",
      "name",
    );
    if (!user)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {
  const { page = 1, limit = 10, sort = "created_at" } = req.query;
  try {
    const customers = await Customer.find()
      .sort({ [sort]: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id", "name");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editCustomer = async (req, res) => {
  try {
    const updates = req.body;
    const targetId = Number(req.params.id);
    const customer = await Customer.findOneAndUpdate({ id: targetId }, updates, {
      new: true,
    });
    if (!customer)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ id: req.params.id });
    if (!customer)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createCustomer, getCustomerById, getCustomers, editCustomer, deleteCustomer };
