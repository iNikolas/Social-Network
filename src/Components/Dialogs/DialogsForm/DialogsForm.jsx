import React from 'react'
import {Field, Form} from "react-final-form";
import {maxLength} from "../../Common/Validators/validators";
import TextArea from "../../Common/Fields/textAreaComponent/TextArea";

const DialogsForm = (props) => {
    return <Form onSubmit={props.onAddMessage}
                 render={
                     ({handleSubmit, valid}) => {
                         return <div>
                             <form onSubmit={handleSubmit}>
                                 <Field validate={maxLength(1000)}
                                        name={'messageInputArea'}
                                        placeholder={'enter your answer here'}
                                        render={TextArea}
                                 />
                                 <button disabled={!valid}>Add Message</button>
                             </form>
                         </div>
                     }
                 }
/>
}

export default DialogsForm