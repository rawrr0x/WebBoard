import { type InputHTMLAttributes } from 'react';
import cl from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      className={[cl.input, className].filter(Boolean).join(' ')}
    />
  );
};

export default Input;
