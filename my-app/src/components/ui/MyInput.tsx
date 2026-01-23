import { ChangeEvent } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?:string
  value: string; // контролируемое значение
  onChange: (value: string) => void; // передаём только значение, а не событие
}
const MyInput: React.FC<InputProps> = ({label,error,value,onChange, className, ...props}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (  
    <input
        className={"px-3 py-3 border-2 border-white dark:border-black rounded-md "  + className}
        value={value}
        onChange={handleChange}
        {...props}
    />);
}
 
export default MyInput;