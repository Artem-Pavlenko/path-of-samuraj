import React from "react";


type ContactType = {
    contactTitle: string
    contactValue: string | null
}

const Contact = ({contactTitle, contactValue}: ContactType) => {
    return (
        <div style={{paddingLeft: '10px'}}>
            <b>{contactTitle}</b>: {contactValue !== null ? contactValue : ''}
        </div>
    )
}

export default Contact