import { useNavigate } from 'react-router-dom';
import StartSubComponent from './subcomponents/StartSubComponent';
import AboutSubComponent from './subcomponents/AboutSubComponent';
import AppsSubComponent from './subcomponents/AppsSubComponent';

const HomeComponent = () => {
    

    return (
        <>
            <StartSubComponent />
            <AboutSubComponent />
            <AppsSubComponent />
        </>
    );
};


export default HomeComponent