interface Types {
  Icon: any;
  text: string;
  label?: string;
  isActive?: boolean;
}

const SidebarOption = ({
  Icon,
  text,
  label = text,
  isActive = false,
}: Types) => {
  return (
    <div
      className={`flex items-center py-1 space-x-4 relative group sm:justify-center lg:justify-start lg:pl-10 pl-10 sm:p-2 sm:mx-auto sm:rounded-full sm:w-max w-[95%] rounded-r-full lg:mx-0 lg:rounded-r-full lg:rounded-l-none sm:my-2 lg:my-0 lg:w-[95%] ${
        isActive ? `bg-[#C2E7FF]` : `hover:bg-gray-200 cursor-pointer`
      }`}
    >
      <Icon />
      <p className="sm:hidden lg:block">{text}</p>
      <p className="absolute hidden sm:group-hover:block left-8 lg:hidden lg:group-hover:hidden py-1 px-2 bg-gray-600 text-white text-[14px] font-bold rounded-[4px] w-max">
        {label}
      </p>
    </div>
  );
};

export default SidebarOption;
