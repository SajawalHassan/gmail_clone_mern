import { promotionData, socialData } from "../data/mailData";

const checkInclusion = (data: Array<any>, mail: any): boolean => {
  const result: boolean =
    data.some((keyword) => mail?.subject.toLowerCase().includes(keyword)) ||
    data.some((keyword) => mail?.body.toLowerCase().includes(keyword));

  return result;
};

export const identifyMail = (mail: any) => {
  let mailType: string = "";

  const includesPromotion: boolean = checkInclusion(promotionData, mail);

  const includesSocial: boolean = checkInclusion(socialData, mail);

  // Pushes mail into its corresponding array
  if (includesPromotion && !includesSocial) mailType = "promotions";
  else if (includesSocial && !includesPromotion) mailType = "social";
  else mailType = "primary";

  return mailType;
};
