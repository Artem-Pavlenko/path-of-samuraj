import React, {ChangeEvent} from "react";

type StatusStateToPropsType = {
    status: string | null
}
type StatusDispatchToPropsType = {
    updateProfileStatus: (status: string) => void
}

type ProfileStatusType = StatusStateToPropsType & StatusDispatchToPropsType

class ProfileStatusClassComponent extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        statusText: this.props.status
    }

    activateEditMod() {
        this.setState({editMode: true})
    }

    deactivateEditMode() {
        this.setState({editMode: false})
    }

    changeStatusText(e: ChangeEvent<HTMLInputElement>) {
        this.setState({statusText: e.currentTarget.value})
    }

    addStatusText(e: ChangeEvent<HTMLInputElement>) {
        this.deactivateEditMode()
        this.props.updateProfileStatus(e.currentTarget.value)
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.editMode
                        ? <input
                            type="text"
                            value={this.state.statusText === null  ? '' : this.state.statusText}
                            autoFocus={true}
                            onChange={this.changeStatusText.bind(this)}
                            onBlur={this.addStatusText.bind(this)}
                        />
                        : <span onDoubleClick={this.activateEditMod.bind(this)} title={'status'} >
                            {this.props.status === '' || this.props.status === null ? '---' : this.props.status}
                        </span>
                    }
                </div>
                <div>
                    {/*<button onClick={this.addStatusText.bind(this)}>save</button>*/}
                </div>
            </div>
        )
    }
}

export default ProfileStatusClassComponent;