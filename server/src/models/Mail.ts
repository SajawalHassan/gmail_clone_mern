import { model, Schema } from "mongoose";
import { identifyMail } from "../utils/mailSeperation";

const mailSchema: Schema = new Schema(
  {
    recieverEmail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: Object,
      required: true,
    },
    mailType: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

mailSchema.pre("save", function () {
  const mailType = identifyMail(this);

  this.mailType = mailType;
});

export default model("mails", mailSchema);
