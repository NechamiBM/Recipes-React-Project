import Header from './Header';
import { useEffect, useState } from 'react';
import img1 from '../Images/img (5).jpg';
import img2 from '../Images/img (13).jpg';
import img3 from '../Images/img (3).jpg';
import img4 from '../Images/img (12).jpg';
import img5 from '../Images/img (21).jpg';
import img6 from '../Images/img (24).jpg';
import { Button, ButtonGroup, ButtonOr } from 'semantic-ui-react';
const Home = () => {
    const images = [img1, img2, img3, img4, img5, img6];
    const [currentImg, setcurrentImg] = useState(0);
    const nextImage = () => {
        setcurrentImg((prev) => (prev + 1) % images.length);
    };
    const prevImage = () => {
        setcurrentImg((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage();
        }, 3000);
        return () => {
            clearInterval(intervalId);
        };
    }, currentImg);
    return (
        <div>
            <Header page={'דף הבית'} />
            <img style={{ height: "75vh" }} src={images[currentImg]} alt={`Image ${currentImg + 1}`} />
            <br />
            <ButtonGroup style={{ direction: "ltr" }}>
                <Button onClick={prevImage} basic labelPosition='right' icon='left chevron' />
                <ButtonOr />
                <Button onClick={nextImage} basic labelPosition='left' icon='right chevron' />
            </ButtonGroup>
        </div >
    )
}

export default Home;