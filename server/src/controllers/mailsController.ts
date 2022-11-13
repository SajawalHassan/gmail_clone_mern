import { Response } from "express";
import { RequestTypes } from "../types/reqTypes";
import { mailCreateValidation } from "../validation/mailValidation";

import Mail from "../models/Mail";
import User from "../models/User";

export const createPost = async (req: RequestTypes, res: Response) => {
  const { error } = mailCreateValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { body, subject, recieverEmail } = req.body;
    const { _id: senderId } = req?.user;

    const reciever = await User.findOne({ email: recieverEmail });
    if (!reciever)
      return res.status(404).json({ error: "Reciever not found!" });

    const newMail = await Mail.create({
      subject,
      body,
      recieverEmail,
      senderId,
    });

    const sender = await User.findById(senderId);

    res.json({
      message: "Mail created successfuly!",
      data: { mail: newMail, sender, reciever },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};
