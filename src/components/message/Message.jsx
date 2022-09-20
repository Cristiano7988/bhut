import React from "react";

const Message = ({content}) => {
    const { show, type, text } = content

    return show && <div className={type}>{text}</div>;

}

export default Message;
