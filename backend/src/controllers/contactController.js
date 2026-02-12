import Contact from '../models/Contact.js';

export const createContact = async (req, res, next) => {
  try {
    const { email, firstName, phone, message } = req.body;

    if (!email || !firstName || !message) {
      return res.status(422).json({
        message: 'Email, first name, and message are required.'
      });
    }

    const contact = await Contact.create({
      email,
      firstName,
      phone,
      message
    });

    res.status(201).json({
      message: 'Enquiry received.',
      contactId: contact._id
    });
  } catch (error) {
    next(error);
  }
};
