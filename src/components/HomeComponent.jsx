import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLoginClick}>Go to Login</button>
        </div>
    );
};


export default HomeComponent