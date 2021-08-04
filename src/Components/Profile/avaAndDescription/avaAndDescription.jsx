import React, {useRef, useState} from 'react'
import css from './avaAndDescription.module.css'
import avatar from "../../../img/Avatar/defaultAvatar.jpg";

const AvaAndDescription = (props) => {

    const fileEL = useRef(null)
    const [changeAvatar, setChangeAvatar] = useState(false)
    const showAvatarDownloading = (isCurrentUser) => {
        if (isCurrentUser) fileEL.current.click()
    }
    const onFileDownloading = (event) => {
        let formData = new FormData()
        formData.append('image', event.currentTarget.files[0])
        props.changeAvatarThunkCreator(formData)
    }

    let fullName, aboutMe, photoURL, jobStatus, jobStatusText, jobDescription, contactsKeysArray, contactsObject,
        contacts, id, currentUserId, isCurrentUser


    if (props.profile.data === null) {
        return null
    } else {
        fullName = props.profile.data.fullName
        aboutMe = props.profile.data.aboutMe
        if (props.profile.data.photos.large === null) {
            photoURL = props.profile.data.photos.small
        } else {
            photoURL = props.profile.data.photos.large
        }
        if (props.profile.data.lookingForAJob !== true) {
            jobStatus = false
            jobStatusText = 'Не ищу работу!'
        } else {
            jobStatus = true
            jobStatusText = 'В поиске работы!'
        }
        jobDescription = props.profile.data.lookingForAJobDescription
        contactsKeysArray = Object.keys(props.profile.data.contacts)
        contactsObject = props.profile.data.contacts
        contacts = contactsKeysArray.map(social => (contactsObject[social] === null || contactsObject[social] === '') ? null :
            <div><span className={css.social}>{social.toUpperCase() + ': '}</span><a className={css.socialLink}
                                                                                     href={contactsObject[social]}>{contactsObject[social]}</a>
            </div>)
        id = props.profile.data.userId
        currentUserId = props.authData.id
        isCurrentUser = currentUserId === id
    }
    let styleGreen = {
        color: 'green',
        backgroundColor: 'white',
        textAlign: 'center'
    }
    let styleGrey = {
        color: 'grey',
        backgroundColor: 'white',
        textAlign: 'center'
    }

    return (
        <div>
            {(props.profile.data === null) ? null : <div>
                <header className={css.fullName}>{fullName.toUpperCase()}</header>
                <span className={css.aboutMe}>{`«${(aboutMe === null) ? '...' : aboutMe}»`}</span>
                <div className={css.infoWrapper}>
                    <div className={css.photos}>
                        <img onClick={() => showAvatarDownloading(isCurrentUser)}
                             src={photoURL === null ? avatar : photoURL} title={fullName}/>
                        <input accept='image/*' onChange={onFileDownloading} ref={fileEL} id='download-avatar' style={{visibility: 'hidden'}}
                                               type='file'/>
                        <div className={css.jobDescription}>
                            <span className={css.workStatus}
                                  style={jobStatus ? styleGreen : styleGrey}>{jobStatusText}</span>
                            <span
                                className={css.jobDescription}>{`«${(jobDescription === null) ? '...' : jobDescription}»`}</span>
                        </div>
                    </div>
                    <div className={css.restOfInformation}>
                        <span className={css.social}>{`ID: ${id}`}</span>
                        <div className={css.socialLinks}>
                            {contacts}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default AvaAndDescription