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
    const newClient = new Client(data);
    await newClient.save();
    res.status(201).json(newClient);
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
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClient = async (req,res) => {
  try{
  const targetId = Number(req.params.id);
    const client = await Client.findOneAndDelete({ id: targetId }, updates, {
      new: true,
    });
    if (!client)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(client);
    console.log(`El cliente ${req.params.name} ha sido eliminado`)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createClient, editClient };
