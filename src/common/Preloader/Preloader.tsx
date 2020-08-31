import React from "react";
import preloader from '../../assets/images/35.gif'


let Preloader = () => {
    return (
        <div>
            {<img src={preloader} alt={"..."}/>}
        </div>
    )
}

export default Preloader;