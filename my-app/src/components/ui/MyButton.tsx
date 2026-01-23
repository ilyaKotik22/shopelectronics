import React from "react";

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const MyButton = <T extends React.ElementType = "button">({
  as,
  children,
  ...props
}: ButtonProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className="bg-white cursor-pointer dark:bg-black dark:text-white text-neutral-800 px-5 py-2 rounded-md hover:bg-neutral-400 transition-all duration-150"
      {...props}
    >
      {children}
    </Component>
  );
};
