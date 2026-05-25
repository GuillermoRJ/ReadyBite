import Client from "../models/client.js";

const createClient = async (req, res) => {
  try {
    const data = req.body;

    if (data.id) {
      const existingId = await Client.findOne({ id: data.id });
      if (existingId)
        return res.status(400).json({
          message: "El número ya está registrado, por favor utiliza otro.",
        });
    }
    data.name.trim();
    const newClient = new Client(data);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const user = await Client.findOne({ id: req.params.id }).populate(
      "id",
      "name",
    );
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClients = async (req, res) => {
  const { page = 1, limit = 10, sort = "created_at" } = req.query;
  try {
    const clients = await Client.find()
      .sort({ [sort]: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id", "name");
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editClient = async (req, res) => {
  try {
    const updates = req.body;
    const targetId = Number(req.params.id);
    const client = await Client.findOneAndUpdate({ id: targetId }, updates, {
      new: true,
    });
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ id: req.params.id });
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createClient, getClientById, getClients, editClient, deleteClient };
