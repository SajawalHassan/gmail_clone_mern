import axios from "../api/axios";
import { store } from "../app/store";
import { setMails } from "../features/mailSlice";

export const getAllMails = async () => {
  try {
    const { data } = await axios.get(
      `/mails/${store.getState().mails.activeTab}`
    );

    store.dispatch(setMails(data.mails));

    return { data };
  } catch (error: any) {
    console.log(error.response?.data);
    return { error: error.response?.data };
  }
};

export const deleteMail = async (id: string) => {
  const mailDeleteArray = [`${id}`];

  try {
    await axios.delete("/mails/delete", {
      data: { mailsId: mailDeleteArray },
    });

    await getAllMails();
  } catch (error: any) {
    console.log(error.response?.data);
  }
};
