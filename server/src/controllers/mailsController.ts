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

    const sender = await User.findById(senderId);

    const reciever = await User.findOne({ email: recieverEmail });
    if (!reciever)
      return res.status(404).json({ error: "Reciever not found!" });

    const newMail = await Mail.create({
      subject,
      body,
      recieverEmail,
      sender,
    });

    res.json({
      message: "Mail created successfuly!",
      data: { mail: newMail, reciever },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};

export const getUsersMails = async (req: RequestTypes, res: Response) => {
  try {
    const mails: any = await Mail.find({ recieverEmail: req.user.email });
    const mailSenders = await User.find({
      _id: mails.map((mail: any) => {
        return mail.senderId;
      }),
    });

    res.json({ message: "Request successful!", data: { mails, mailSenders } });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};
