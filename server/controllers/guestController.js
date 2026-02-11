import Guest from '../models/Guest.js';

export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ guests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addGuest = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email and phone are required' });
    }

    const guest = await Guest.create({
      userId: req.user.id,
      name,
      email,
      phone,
      status: status || 'Invited'
    });

    res.status(201).json({ message: 'Guest added successfully', guest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, status } = req.body;

    const guest = await Guest.findById(id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    if (guest.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied - Not your guest' });
    }

    guest.name = name || guest.name;
    guest.email = email || guest.email;
    guest.phone = phone || guest.phone;
    guest.status = status || guest.status;

    await guest.save();
    res.json({ message: 'Guest updated successfully', guest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findById(id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    if (guest.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied - Not your guest' });
    }

    await Guest.findByIdAndDelete(id);
    res.json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
