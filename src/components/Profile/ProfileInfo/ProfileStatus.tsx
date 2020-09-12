import React, {ChangeEvent} from "react";

type StatusStateToPropsType = {
    status: string | null
}
type StatusDispatchToPropsType = {
    changeStatusText: (newText: string) => void
    addStatusText: () => void
}

type ProfileStatusType = StatusStateToPropsType & StatusDispatchToPropsType

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }

    activateEditMod() {
        this.setState({editMode: true})
    }

    //или заюзать стрелочную fn и тогда не будет утерян контекст и не нужно будет bind(this)
    // activatorEditMode = () => {
    //     this.state.editMode = true
    // }
    deactivateEditMode() {
        this.setState({editMode: false})
    }

    changeStatusText(e: ChangeEvent<HTMLInputElement>) {
        this.props.changeStatusText(e.currentTarget.value)
    }

    addStatusText() {
        this.deactivateEditMode()
        this.props.addStatusText()
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.editMode
                        ? <input
                            type="text"
                            value={this.props.status === null ? '' : this.props.status}
                            autoFocus={true}
                            onChange={this.changeStatusText.bind(this)}
                            onBlur={this.addStatusText.bind(this)}
                        />
                        : <span onDoubleClick={this.activateEditMod.bind(this)} title={'status'}>{this.props.status}</span>}
                </div>
                <div>
                    <button onClick={this.addStatusText.bind(this)}>save</button>
                </div>
            </div>
        )
    }
}

export default ProfileStatus;