interface Types {
  Icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const MailTab = ({ onClick, Icon, label, active = false }: Types) => {
  return (
    <div
      className={`px-3 py-[18px] flex items-center space-x-5 hover:bg-gray-100 cursor-pointer text-gray-600 sm:min-w-[12rem] md:min-w-[15rem] border-b-4 border-transparent ${
        active && `border-blue-500 text-blue-500 font-[500]`
      }`}
      onClick={onClick}
    >
      <Icon />
      <h1>{label}</h1>
    </div>
  );
};

export default MailTab;
