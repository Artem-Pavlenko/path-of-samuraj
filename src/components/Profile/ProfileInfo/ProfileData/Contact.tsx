import React from "react";


type ContactType = {
    contactTitle: string
    contactValue: string | null
}

const Contact = ({contactTitle, contactValue}: ContactType) => {
    return (
        <div style={{paddingLeft: '10px'}}>
            <span>{contactTitle}: {contactValue ? contactValue : ''}</span>
        </div>
    )
}

export default Contact