import { Response } from "express";
import { RequestTypes } from "../types/reqTypes";
import { mailCreateValidation } from "../validation/mailValidation";

import Mail from "../models/Mail";
import User from "../models/User";

export const createMail = async (req: RequestTypes, res: Response) => {
  const { error } = mailCreateValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { body, subject, recieverEmail } = req.body;
    const { _id: senderId } = req?.user;

    const sender = await User.findById(senderId);

    const reciever = await User.findOne({ email: recieverEmail });
    if (!reciever)
      return res.status(404).json({ error: "Reciever not found!" });

    const newMail = new Mail({
      subject,
      body,
      recieverEmail,
      sender,
    });

    await newMail.save();

    res.json({
      message: "Mail created successfuly!",
      data: { mail: newMail, reciever },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};

export const getPrimaryMails = async (req: RequestTypes, res: Response) => {
  try {
    let mails: Array<any> = await Mail.find({
      recieverEmail: req.user.email,
    }).sort({ createdAt: -1 });

    mails = mails.filter((mail) => mail.mailType === "primary");

    res.json({ message: "Request successful!", mails });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};

export const getPromotionMails = async (req: RequestTypes, res: Response) => {
  try {
    let mails: Array<any> = await Mail.find({
      recieverEmail: req.user.email,
    }).sort({ createdAt: -1 });

    mails = mails.filter((mail) => mail.mailType === "promotions");

    res.json({ message: "Request successful!", mails });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};

export const getSocialMails = async (req: RequestTypes, res: Response) => {
  try {
    let mails: Array<any> = await Mail.find({
      recieverEmail: req.user.email,
    }).sort({ createdAt: -1 });

    mails = mails.filter((mail) => mail.mailType === "social");

    res.json({ message: "Request successful!", mails });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};

export const deleteMails = (req: RequestTypes, res: Response) => {
  const { mailsId } = req.body;

  try {
    mailsId.map(async (mailId: string) => {
      await Mail.findById(mailId).deleteOne();
    });

    res.json("Mail deleted!");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. /:" });
  }
};
