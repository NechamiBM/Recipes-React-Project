import { useSelector } from 'react-redux';
import Header from './Header';

const Home = () => {
    const user = useSelector(state => state.user);
    console.log(user);
    return (
        <div>
            <Header page={'דף הבית'} />
            דף הבית החמוד והמתוק
        </div>
    )
}

export default Home;