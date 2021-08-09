import React, {useEffect, useState} from 'react'
import {Field} from "react-final-form"


function SocialLink({placeholder, name, initialLink, handleContactsObjectChange}) {
    return <Field
        style={{
            border: '1px dashed grey',
            top: '0',
            left: '-5px',
            backgroundColor: 'deepSkyBlue'
        }}
        placeholder={placeholder}
        name={name}
        type='text'
        component='input'
        initialValue={initialLink}
        onBlur={(e) => {
            handleContactsObjectChange({[name]: e.currentTarget.value})
        }}
    />
}

export default SocialLink