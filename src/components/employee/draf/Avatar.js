import React, {useState} from "react";
import FileInput from "./FileInput";
import ImageCropper from "./ImageCropper";
import './imagecropper.css'

const Avatar = () => {
    const [image, setImage] = useState("");
    const [currentPage, setCurrentPage] = useState("choose-img");
    const onImageSelected = (selectedImage) => {
        setImage(selectedImage);
        setCurrentPage("crop-img")
    }

    return (
        <div>
            {
                currentPage === "choose-img" ? (<FileInput onImageSelected={onImageSelected}/>)
                    : currentPage === "crop-img" ? (<ImageCropper image={image}/>)
                    : (<div>3th</div>)
            }
        </div>
    )
}

export default Avatar;


