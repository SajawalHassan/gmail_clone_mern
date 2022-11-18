interface Types {
  Icon: any;
  label: string;
  iconClassName?: string;
  className?: string;
  handleClick?: () => void;
}

const IconButton = ({
  Icon,
  label,
  handleClick,
  className,
  iconClassName,
}: Types) => {
  return (
    <div
      className={`icon-btn group relative ${className}`}
      onClick={handleClick}
    >
      <Icon className={`text-zinc-700 ${iconClassName}`} />
      <h1
        className={`hidden group-hover:block top-10 py-1 px-2 bg-gray-600 inset-x-0 mx-auto center-absolutly text-white text-[10px] font-bold rounded-[4px] w-max`}
      >
        {label}
      </h1>
    </div>
  );
};

export default IconButton;
