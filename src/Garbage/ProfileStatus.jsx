import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editModeStatus: false
    }


    activateEditMode = () => {
        this.setState({editModeStatus: true})
    }

    deactivateEditMode = (event) => {
        let text = event.target.value;
        if (!text) {
            text = '...'
            this.props.editProfileStatusField(text)
        }
        this.setState({editModeStatus: false})
    }

    editStatusField = (event) => {
        let text = event.target.value
        this.props.editProfileStatusField(text);
    }

    confirmStatusField = (event) => {
        let text = this.props.profileStatusInputArea;
        if (event.key === 'Enter') {
            this.props.confirmStatusFieldThunkCreator(text)
            this.setState({editModeStatus: false})
        }
    }
    
    render() {
        let Style = {
            display: 'block',
            textAlign: 'center',
            border: '1px dashed grey',
            margin: 'auto'
        }
        return <div>
            {!this.state.editModeStatus &&
            <div>
                <span style={Style} onClick={this.activateEditMode}>{this.props.profileStatusInputArea}</span>
            </div>}
            {this.state.editModeStatus &&
            <div>
                <input onKeyPress={this.confirmStatusField} onChange={this.editStatusField}
                       onBlur={this.deactivateEditMode} value={this.props.profileStatusInputArea}
                       autoFocus={true} style={Style}></input>
            </div>}
        </div>
    }
}

export default ProfileStatus