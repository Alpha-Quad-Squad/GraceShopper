import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import './postCheckoutRedirect.css'

const PostCheckoutRedirect = () => {

    const [allowRedirect, setAllowRedirect] = useState(false);

    useEffect(() => {
        const time = setTimeout(() => {
            setAllowRedirect(true);
        }, 2500);
        return () => clearTimeout(time)
    }, [])

    if (allowRedirect) {
        return <Redirect to="/home" />
    } else {
        return (
            <div className="Payment-submitted-div">
                <div >
                    <p>Payment successfully submitted</p>
                    <p>Thank you</p>
                </div>
            </div>
        )
    }
}

export default PostCheckoutRedirect;