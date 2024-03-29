import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
// Material helpers
// Material components
import {Grid, withStyles} from '@material-ui/core';
// Shared layouts
import {Dashboard as DashboardLayout} from '../../../layouts';
// Custom components
import AccountDetails from './account_details/index';
import AccountProfile from './account_profile/index';

import {clearProfileApiResponse, getProfile} from "../../../actions/dashboard/profile";
import Error from "../../../components/app/error";
import Loader from "../../../components/app/spinner/loader";

// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 4
    }
});

class MyAccount extends Component {
    state = {tabIndex: 0};

    componentWillMount() {
        this.props.dispatch(clearProfileApiResponse());
        this.props.dispatch(getProfile())
    }

    render() {
        return (
            <div className="loading-outer">
                {
                    (this.props.getProfilePageLoading ||
                        this.props.updateProfileInfoPageLoading ||
                        this.props.updateProfilePhotoPageLoading ||
                        this.props.getCountryCodePageLoading ) &&
                    <div className="folder-file-loading">
                        <Loader isPageLoading={true}/>
                    </div>
                }
                <DashboardLayout title="Account">
                    <div className={this.props.classes.root}>
                        {
                            (this.props.getProfileStatus === 200 && !this.props.getProfileError) &&
                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xl={4}
                                    xs={12}
                                >
                                    <AccountProfile/>
                                </Grid>
                                <Grid
                                    item
                                    lg={8}
                                    md={6}
                                    xl={8}
                                    xs={12}
                                >
                                    <AccountDetails/>
                                </Grid>
                            </Grid>
                        }

                        {
                            (!this.props.getProfilePageLoading && this.props.getProfileError) &&
                            <Error status={(this.props.getProfileStatus).toString()}
                                   message={this.props.getProfileMessage}/>
                        }

                    </div>
                </DashboardLayout>
            </div>
        )
            ;
    }
}

const mapStateToProps = (state) => {
    const {getCountryCodePageLoading} = state.accountReducer;
    const {
        profile, edit, getProfilePageLoading, getProfileStatus, getProfileError, getProfileMessage,
        updateProfileInfoPageLoading,
        updateProfileInfoStatus,
        updateProfileInfoError,
        updateProfileInfoMessage,
        updateProfilePhotoPageLoading,
        updateProfilePhotoStatus,
        updateProfilePhotoError,
        updateProfilePhotoMessage
    } = state.profileReducer;
    const {user_id, name, mobile_data, photo, email} = profile;
    return {
        getCountryCodePageLoading,
        edit,
        user_id,
        name,
        mobile_data,
        photo,
        email,
        profile,
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
        updateProfilePhotoMessage
    }
};
export default withRouter(connect(mapStateToProps)(withStyles(styles)(MyAccount)))