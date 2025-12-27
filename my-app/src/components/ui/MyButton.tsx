interface ButtonProps<T extends React.ElementType = "button"> {
  as?: T;
  children: React.ReactNode;
};

const Button = <T extends React.ElementType = "button">({ as, children, ...props }: ButtonProps<T>) => {
  const Component = as || "button";
  return <Component {...props}>{children}</Component>;
};