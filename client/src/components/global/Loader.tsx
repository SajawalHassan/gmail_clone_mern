interface Types {
  className?: string;
}

const Loader = ({ className }: Types) => {
  return (
    <div
      style={{ borderTopColor: "blue" }}
      className={`w-6 h-6 border-2 border-blue-300 animate-spin rounded-full ${className}`}
    />
  );
};

export default Loader;
