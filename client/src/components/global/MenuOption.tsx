interface Types {
  text: string;
}

const MenuOption = ({ text }: Types) => {
  return (
    <div className="w-full py-1 pl-5 hover:bg-menu-option cursor-pointer text-sm">
      {text}
    </div>
  );
};

export default MenuOption;
