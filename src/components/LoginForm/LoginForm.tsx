import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '20px',
            }}
        >
            <Input placeholder="Name"/>
            <Input placeholder="Board"/>
            <Button onClick={onLogin}>Login</Button>
        </div>
    );
};

export default LoginForm;