import type { ComponentProps } from "react";
import cl from './Input.module.css';

type InputProps = ComponentProps<'input'>;

const Input = ({ type = 'text', ...rest }: InputProps) => {
    return <input {...rest} type={type} className={cl.input} />;
};

export default Input;
