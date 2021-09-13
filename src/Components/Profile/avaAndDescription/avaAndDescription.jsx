import React, { useEffect, useRef, useState } from "react";
import css from "./avaAndDescription.module.css";
import avatar from "../../../img/Avatar/defaultAvatar.jpg";
import { Field, Form } from "react-final-form";
import SocialLink from "./SocialLink/SocialLink";
import Loader from "../../Common/loader/Loader";

const AvaAndDescription = (props) => {
  let fullName,
    photoURL,
    jobStatusText,
    contactsKeysArray,
    contacts,
    id,
    currentUserId,
    isCurrentUser;

  useEffect(() => {
    setAboutMe(props.profile.data?.aboutMe);
    setJobStatus(props.profile.data?.lookingForAJob);
    setLookingForAJobDescription(props.profile.data?.lookingForAJobDescription);
    setContactsObject(props.profile.data?.contacts);
  }, [
    props.profile.data?.aboutMe,
    props.profile.data?.lookingForAJob,
    props.profile.data?.lookingForAJobDescription,
    props.profile.data?.contacts,
  ]);

  const inpRef = useRef(null);

  function handleContactsObjectChange(newContactsEntry) {
    setContactsObject((prevState) => {
      return {
        ...prevState,
        ...newContactsEntry,
      };
    });
  }

  const [isFetching, setIsFetching] = useState(false);
  const [contactsObject, setContactsObject] = useState({});
  const [lookingForAJobDescription, setLookingForAJobDescription] =
    useState(null);
  const [aboutMe, setAboutMe] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const fileEL = useRef(null);
  const showAvatarDownloading = (isCurrentUser) => {
    if (isCurrentUser) fileEL.current.click();
  };
  const onFileDownloading = (event) => {
    let formData = new FormData();
    formData.append("image", event.currentTarget.files[0]);
    props.changeAvatarThunkCreator(formData);
  };

  if (props.profile.data === null) {
    return null;
  } else {
    fullName = props.profile.data.fullName;
    if (props.profile.data.photos.large === null) {
      photoURL = props.profile.data.photos.small;
    } else {
      photoURL = props.profile.data.photos.large;
    }
    if (jobStatus !== true) {
      jobStatusText = "Не ищу работу!";
    } else {
      jobStatusText = "В поиске работы!";
    }

    contactsKeysArray = Object.keys(contactsObject);

    contacts = contactsKeysArray.map((social) =>
      contactsObject[social] === null ||
      contactsObject[social] === "" ? null : (
        <div key={social}>
          <span
            style={{
              minWidth: "6em",
              display: "inline-block",
              textAlign: "right",
            }}
            className={css.social}
          >
            {social.toUpperCase() + ": "}
          </span>
          <a className={css.socialLink} href={contactsObject[social]}>
            {social.toLowerCase()}
          </a>
        </div>
      )
    );
    id = props.profile.data.userId;
    currentUserId = props.authData.id;
    isCurrentUser = currentUserId === id;
  }
  let styleGreen = {
    color: "green",
    backgroundColor: "white",
    textAlign: "center",
  };
  let styleGrey = {
    color: "grey",
    backgroundColor: "white",
    textAlign: "center",
  };

  return editMode ? <ProfileForm /> : <Markup />;

  function Markup() {
    return (
      <div>
        {props.profile.data === null ? null : (
          <div>
            <header className={css.fullName}>{fullName.toUpperCase()}</header>
            <span className={css.aboutMe}>{`«${
              aboutMe === null ? "..." : aboutMe
            }»`}</span>
            <div className={css.infoWrapper}>
              {isCurrentUser ? (
                <button
                  className={css["edit-mode"]}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              ) : null}
              <div className={css.photos}>
                <img
                  onClick={() => showAvatarDownloading(isCurrentUser)}
                  src={photoURL === null ? avatar : photoURL}
                  title={fullName}
                />
                <input
                  accept="image/*"
                  onChange={onFileDownloading}
                  ref={fileEL}
                  id="download-avatar"
                  style={{ visibility: "hidden" }}
                  type="file"
                />
                <div className={css.jobDescription}>
                  <span
                    className={css.workStatus}
                    style={jobStatus ? styleGreen : styleGrey}
                  >
                    {jobStatusText}
                  </span>
                  <span className={css.jobDescription}>{`«${
                    lookingForAJobDescription === null
                      ? "..."
                      : lookingForAJobDescription
                  }»`}</span>
                </div>
              </div>
              <div className={css.restOfInformation}>
                <span
                  style={{
                    minWidth: "6em",
                    display: "inline-block",
                    textAlign: "right",
                  }}
                  className={css.social}
                >{`ID: `}</span>
                <span className={css.social}>{id}</span>
                <div className={css.socialLinks}>{contacts}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function ProfileForm() {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Loader hidden={!isFetching} />
        {props.profile.data === null ? null : (
          <div hidden={isFetching}>
            <Form
              onSubmit={async (e) => {
                setIsFetching(true);
                let properObject = {
                  userId: currentUserId,
                  fullName: fullName,
                  aboutMe: e.aboutMe,
                  lookingForAJob: e.lookingForAJob,
                  lookingForAJobDescription: e.lookingForAJobDescription,
                  contacts: {
                    ...contactsObject,
                  },
                };
                await props.updateProfileData(properObject, currentUserId);
                setIsFetching(false);
                setEditMode(false);
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <header className={css.fullName}>
                    {fullName.toUpperCase()}
                  </header>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Field
                      style={{
                        border: "1px dashed grey",
                        backgroundColor: "deepSkyBlue",
                      }}
                      name="aboutMe"
                      initialValue={aboutMe}
                      className={css.aboutMe}
                      placeholder="Edit About me"
                      type="text"
                      onBlur={(e) => {
                        setAboutMe(e.target.value);
                      }}
                      component="input"
                    />
                  </div>
                  <div className={css.infoWrapper}>
                    <button type="submit" className={css["edit-mode"]}>
                      Save
                    </button>
                    <div className={css.photos}>
                      <img
                        onClick={() => showAvatarDownloading(isCurrentUser)}
                        src={photoURL === null ? avatar : photoURL}
                        title={fullName}
                      />
                      <input
                        accept="image/*"
                        onChange={onFileDownloading}
                        ref={fileEL}
                        id="download-avatar"
                        style={{ visibility: "hidden" }}
                        type="file"
                      />
                      <div
                        className={css.jobDescription}
                        style={{
                          position: "relative",
                          backgroundColor: "deepSkyBlue",
                        }}
                      >
                        <Field
                          onClick={() => setJobStatus(() => !jobStatus)}
                          className={css.workStatus}
                          initialValue={jobStatus}
                          style={{
                            position: "absolute",
                            padding: "0px",
                            margin: "0px",
                            left: "5px",
                            top: "-1px",
                          }}
                          name="lookingForAJob"
                          component="input"
                          type="checkbox"
                        />
                        <span
                          className={css.workStatus}
                          style={jobStatus ? styleGreen : styleGrey}
                        >
                          {jobStatusText}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <Field
                            style={{
                              border: "1px dashed grey",
                              top: "0",
                              left: "-5px",
                              backgroundColor: "deepSkyBlue",
                            }}
                            className={css.jobDescription}
                            placeholder="Edit Job Description"
                            name="lookingForAJobDescription"
                            type="text"
                            component="input"
                            initialValue={lookingForAJobDescription}
                            onBlur={(e) =>
                              setLookingForAJobDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className={css.restOfInformation}>
                      <span
                        style={{
                          minWidth: "6em",
                          display: "inline-block",
                          textAlign: "right",
                        }}
                        className={css.social}
                      >{`ID: `}</span>
                      <span className={css.social}>{id}</span>
                      <div className={css.socialLinks}>
                        {contactsKeysArray.map((social) => (
                          <div key={social}>
                            <span
                              style={{
                                minWidth: "6em",
                                display: "inline-block",
                                textAlign: "right",
                              }}
                              className={css.social}
                            >
                              {social.toUpperCase() + ": "}
                            </span>
                            <SocialLink
                              placeholder={social.toUpperCase()}
                              name={social}
                              initialLink={contactsObject[social]}
                              handleContactsObjectChange={
                                handleContactsObjectChange
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            />
          </div>
        )}
      </div>
    );
  }
};

export default AvaAndDescription;
