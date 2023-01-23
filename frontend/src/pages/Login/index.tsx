import { LoginForm } from '../../components/LoginForm';

export const Login = () => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="bg-surface-1 py-10 px-12 rounded-xl">
                <LoginForm />
            </div>
        </div>
    );
};
