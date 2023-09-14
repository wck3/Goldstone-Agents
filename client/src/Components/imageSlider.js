import { useState } from "react";
import './imageSlider.css';



const slideStyle = { backgroundImage: 'url(${slides[currentIndex].url})'};
const ImageSlider = ({Slides}) => {
    const [currentIndex, setCurrentUser] = useState(0);
    return(
        <div className="sliders">
            <div className="slide" style = { slideStyle}></div>
        </div>
    )
};

export default ImageSlider;