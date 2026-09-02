import type { ComponentProps } from 'react';
import cl from './Button.module.css';

type ButtonProps = ComponentProps<'button'>;

const Button = ({ children, ...rest }: ButtonProps) => {
    return <button className={cl.button} {...rest} >{children}</button>
};

export default Button;
