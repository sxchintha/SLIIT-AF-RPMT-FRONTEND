import React from "react";

function LoadingSpiner() {
    return (
        <div className="sxch-center">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingSpiner;