interface ButtonProps<T extends React.ElementType = "button"> {
  as?: T;
  children: React.ReactNode;
};

export const MyButton = <T extends React.ElementType = "button">({ as, children, ...props }: ButtonProps<T>) => {
  const Component = as || "button";
  return <Component className="bg-white cursor-pointer text-neutral-800 px-5 py-2 rounded-md hover:bg-neutral-400 transition-all duration-150" {...props}>{children}</Component>;
};