import Footer from "./Footer"
import Header from "./Header"
import React from "react";


function DefaultLayout ({children})  {
    

    return (
        <>
        <Header/>
            {children}
        <Footer/>
        </>
    )

}
export default DefaultLayout;