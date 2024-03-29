import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
// Material components
import {LinearProgress, Typography, withStyles} from '@material-ui/core';
// Shared components
import {Portlet, PortletContent} from '../../../../components';
// Component styles
import styles from './styles';
import {checkValidation, countries} from "../../../../actions/app";
import {changeProfileState, updateProfilePic} from "../../../../actions/dashboard/profile";
import {notify} from "../../../../components/app/notification";
import {connect} from "react-redux";
import ReactNotification from "react-notifications-component";

class AccountProfile extends Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
        this.state = {
            profile: 0
        }
    }

    uploadPic(e, removePic) {
        e.preventDefault();
        const target = e.target;
        if (removePic) {
            this.props.dispatch(updateProfilePic({}, true, this.props.profile.country));
        } else {
            checkValidation(e);
            const photo = document.getElementById("photo").files[0];
            const ext = e.currentTarget.value.match(/\.(.+)$/)[1];
            this.props.dispatch(changeProfileState(Object.assign(this.props.profile, {[target.name]: target.value})));
            switch (ext) {
                case 'jpg':
                    return this.props.dispatch(updateProfilePic(photo, false, this.props.profile.country));
                case 'jpeg':
                    return this.props.dispatch(updateProfilePic(photo, false, this.props.profile.country));
                case 'png':
                    return this.props.dispatch(updateProfilePic(photo, false, this.props.profile.country));
                default:
                    return notify(this.notificationDOMRef, 'danger', 'Only png, jpg, jpeg files supported.');

            }
        }
    }

    componentDidMount() {
        if (!this.props.getProfilePageLoading && this.props.getProfileStatus === 200 && !this.props.getProfileError && !this.props.edit) {
            this.setState({profile: 0});
            let profile = 0;
            if (!!this.props.profile.email) {
                profile = profile + 25;
            }
            if (!!this.props.profile.name) {
                profile = profile + 25;
            }
            if (!!this.props.profile.mobile_data) {
                const countriesData = countries();
                let isCountryCode = false;
                for (let i in countriesData) {
                    if (countriesData[i].callingCodes.length > 0) {
                        if (this.props.profile.mobile_data.toString() === "+" + countriesData[i].callingCodes[0].toString()) {
                            isCountryCode = true;
                        }
                    }
                }
                if (this.props.profile.mobile_data === "+") {
                    isCountryCode = true;
                }
                if (!isCountryCode) {
                    profile = profile + 25;
                }
            }
            if (!!this.props.profile.photo) {
                profile = profile + 25;
            }
            this.setState({profile});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.getProfilePageLoading && nextProps.getProfileStatus === 200 && !nextProps.getProfileError && !nextProps.edit) {
            this.setState({profile: 0});
            let profile = 0;
            if (!!nextProps.profile.email) {
                profile = profile + 25;
            }
            if (!!nextProps.profile.name) {
                profile = profile + 25;
            }
            if (!!nextProps.profile.mobile_data) {
                const countriesData = countries();
                let isCountryCode = false;
                for (let i in countriesData) {
                    if (countriesData[i].callingCodes.length > 0) {
                        if (nextProps.profile.mobile_data.toString() === "+" + countriesData[i].callingCodes[0].toString()) {
                            isCountryCode = true;
                        }
                    }
                }
                if (nextProps.profile.mobile_data === "+") {
                    isCountryCode = true;
                }
                if (!isCountryCode) {
                    profile = profile + 25;
                }
            }
            if (!!nextProps.profile.photo) {
                profile = profile + 25;
            }
            this.setState({profile});
        }
    }

    render() {
        const {classes, className, ...rest} = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <Portlet
                {...rest}
                className={rootClassName}
            >
                <PortletContent>
                    <div className={classes.details}>
                        <div className="user-profile MuiAvatar-root AccountProfile-avatar-116 MuiAvatar-colorDefault">
                            <div className="profile-edit">
                                <img
                                    className="img-circle"
                                    style={{
                                        cursor: "pointer",
                                        maxWidth: "110px",
                                        borderRadius: "100%",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                    src={!!this.props.profile.photo ? this.props.profile.photo : require("../../../../images/avatar.png")}
                                    onError={() => this.src = require("../../../../images/avatar.png")}
                                    alt="User"/>
                                <input type="file" id="photo" name="photo"
                                       style={{display: "none", cursor: "pointer"}}
                                       onChange={(e) => this.uploadPic(e, false)}/>
                                <span className="icons-edit">
                                    <label htmlFor="photo" className="fa fa-camera" aria-hidden="true"></label>
                                <i id="cross" onClick={(e) => this.uploadPic(e, true)} className="fa fa-times-circle"
                                   aria-hidden="true"/>
                                    </span>
                                {/*<i className="fa fa-times-circle" aria-hidden="true"/>*/}
                            </div>

                        </div>
                        <div className={classes.info} style={{width: '100%', textAlign: 'center', marginTop: "20px"}}>
                            <Typography variant="h2">{this.props.name}</Typography>
                            <Typography
                                className="AccountProfile-locationText-544"
                                variant="body1">{this.props.email}
                            </Typography>
                            {/*<Typography*/}
                            {/*    className={classes.dateText}*/}
                            {/*    variant="body1"*/}
                            {/*>*/}
                            {/*</Typography>*/}
                        </div>
                        <div className={classes.progressWrapper}>
                            <Typography variant="body1">Profile Completeness: {this.state.profile}%</Typography>
                            <LinearProgress
                                value={this.state.profile}
                                variant="determinate"
                            />
                        </div>
                    </div>
                </PortletContent>
                {/*<PortletFooter>*/}
                {/*    <button*/}
                {/*        style={{cursor: "pointer"}}*/}
                {/*        className="MuiButtonBase-root MuiButton-root AccountProfile-uploadButton-363 MuiButton-text MuiButton-textPrimary add-blue"*/}
                {/*        tabIndex="0" type="button"><span style={{cursor: "pointer"}} className="MuiButton-label"><span*/}
                {/*        className="MuiButton-label"><label style={{cursor: "pointer"}} htmlFor="photo"*/}
                {/*                                           className="blue-butn">Upload picture</label>*/}
                {/*        <input type="file" id="photo" name="photo"*/}
                {/*               style={{display: "none", cursor: "pointer"}}*/}
                {/*               onChange={(e) => this.uploadPic(e, false)}/>*/}
                {/*        </span>*/}
                {/*        </span>*/}
                {/*        <span*/}
                {/*            className="MuiTouchRipple-root"></span></button>*/}

                {/*    <button className="MuiButtonBase-root MuiButton-root MuiButton-text remove-red" tabIndex="0"*/}
                {/*            type="button" onClick={(e) => this.uploadPic(e, true)}>*/}
                {/*        <span className="MuiButton-label">Remove picture</span><span*/}
                {/*        className="MuiTouchRipple-root"></span></button>*/}

                {/*</PortletFooter>*/}
                <ReactNotification ref={this.notificationDOMRef}/>
            </Portlet>
        );
    }
}

AccountProfile.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const {
        noOnChangeProfile, profile, getProfilePageLoading, getProfileStatus, getProfileError, getProfileMessage,
        updateProfileInfoPageLoading,
        updateProfileInfoStatus,
        updateProfileInfoError,
        updateProfileInfoMessage,
        updateProfilePhotoPageLoading,
        updateProfilePhotoStatus,
        updateProfilePhotoError,
        updateProfilePhotoMessage,
        edit
    } = state.profileReducer;
    const {user_id, name, mobile_data, photo, email} = noOnChangeProfile;
    return {
        noOnChangeProfile, profile,
        user_id,
        name,
        mobile_data,
        photo,
        email,
        getProfilePageLoading,
        getProfileStatus,
        getProfileError,
        getProfileMessage,
        updateProfileInfoPageLoading,
        updateProfileInfoStatus,
        updateProfileInfoError,
        updateProfileInfoMessage,
        updateProfilePhotoPageLoading,
        updateProfilePhotoStatus,
        updateProfilePhotoError,
        updateProfilePhotoMessage,
        edit
    }
};
export default withRouter(connect(mapStateToProps)(withStyles(styles)(AccountProfile)))
