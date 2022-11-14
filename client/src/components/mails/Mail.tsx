interface Types {
  mail: any;
}

const Mail = ({ mail }: Types) => {
  return (
    <div className="w-max p-2 border m-10">
      <h1>subject: {mail.subject}</h1>
      <p>from: {mail.sender.email}</p>
    </div>
  );
};

export default Mail;
