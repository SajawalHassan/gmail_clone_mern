interface Types {
  Icon: any;
  label: string;
  iconClassName?: string;
  className?: string;
  handleClick?: () => void;
  labelIsShown?: boolean;
}

const IconButton = ({
  Icon,
  label,
  handleClick,
  className,
  iconClassName,
  labelIsShown = true,
}: Types) => {
  return (
    <button
      className={`icon-btn group relative ${className}`}
      onClick={handleClick}
    >
      <Icon className={`text-zinc-700 ${iconClassName}`} />
      {labelIsShown && (
        <h1 className="hidden group-hover:block top-10 py-1 px-2 bg-gray-600 inset-x-0 mx-auto center-absolutly text-white text-[10px] font-bold rounded-[4px] w-max">
          {label}
        </h1>
      )}
    </button>
  );
};

export default IconButton;
