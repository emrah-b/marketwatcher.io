import React, { Component } from "react"
import { createAlert, cancelCreateAlert, resetCreateAlert }  from "../actions"
import { connect } from "react-redux"

import schema from "../schemas/alert"
import Validator from "../utils/validator"
import classNames from "classnames"
import SiteAlert from "../components/SiteAlert"

export class CreateAlert extends Component {
    state = {
        alert: {
            name: "",
            ownerID: this.props.auth.user.id,
            requiredCriteria: "",
            niceTohaveCriteria: "",
            excludedCriteria: "",
            threshold: "",
            status: 1
        }
    }

    componentDidMount() {
        this.props.dispatch(resetCreateAlert())
    }

    validator = new Validator(schema)

    handleSave = (e) => {
        e.preventDefault()
        if(this.props.newAlert.isFetching) return
        this.validator.validate(this.state.alert)
        this.forceUpdate()
        if(this.validator.isValid)
            this.props.dispatch(createAlert(this.state.alert))
    }

    handleInputChange = (field, e) => {
        let newState = this.state
        newState.alert[field] = e.target.value

        this.setState(newState)
        this.validator.validateField(field, e.target.value)
    }

    render() {
        return (
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            {this.props.newAlert && this.props.newAlert.error &&
                                <SiteAlert message="There was an error creating the alert" danger/>
                            }

                            <div className="card">
                                <div className="header header-underlined">
                                    <h4 className="title">Create Alert</h4>
                                </div>
                                <div className="content">
                                    <form>
                                        <CreateAlertInputRow field="name" errors={this.validator.errors}>
                                            <label className="form-control-label">Alert Title</label>
                                            <input id="alert-title" autoFocus type="text" className="form-control border-input"
                                                onChange={this.handleInputChange.bind(this, "name")} value={this.state.alert.name} />
                                        </CreateAlertInputRow>
                                        <div className="row bordered-spacer-10"></div>
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Alert Criteria</label>
                                            </div>
                                        </div>
                                        <CreateAlertInputRow field="requiredCriteria" errors={this.validator.errors} horizontal>
                                            <label className="col-sm-3">Must include</label>
                                            <div className="col-sm-9">
                                                <input className="form-control border-input" id="must-include" onChange={this.handleInputChange.bind(this, "requiredCriteria")}
                                                value={this.state.alert.requiredCriteria}/>
                                            </div>
                                        </CreateAlertInputRow>
                                        <CreateAlertInputRow field="niceTohaveCriteria" errors={this.validator.errors} horizontal>
                                            <label className="col-sm-3">Can include</label>
                                            <div className="col-sm-9">
                                                <input className="form-control border-input" id="can-include" onChange={this.handleInputChange.bind(this, "niceTohaveCriteria")}
                                                value={this.state.alert.niceTohaveCriteria}/>
                                            </div>
                                        </CreateAlertInputRow>
                                        <CreateAlertInputRow field="excludedCriteria" errors={this.validator.errors} horizontal>
                                            <label className="col-sm-3">Exclude</label>
                                            <div className="col-sm-9">
                                                <input className="form-control border-input" id="exclude" onChange={this.handleInputChange.bind(this, "excludedCriteria")}
                                                value={this.state.alert.excludedCriteria}/>
                                            </div>
                                        </CreateAlertInputRow>
                                        <div className="bordered-spacer-10"></div>
                                        <CreateAlertInputRow field="threshold" errors={this.validator.errors}>
                                            <label>Threshold</label>
                                            <input id="threshold" type="number" className="form-control border-input"
                                                onChange={this.handleInputChange.bind(this, "threshold")} value={this.state.alert.threshold} />
                                        </CreateAlertInputRow>
                                        <div className="row">
                                            <div className="col-md-6 col-md-offset-6 text-right">
                                                <a id="cancel" className={classNames("btn btn-danger btn-fill btn-wd", {"disabled": this.props.newAlert.isFetching})} onClick={()=> this.props.dispatch(cancelCreateAlert())}>Cancel</a>
                                                &nbsp;
                                                <button type="submit" id="save-alert" className={classNames("btn btn-info btn-fill btn-wd", {"disabled": this.props.newAlert.isFetching})} onClick={this.handleSave}>Create</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

/* eslint-disable */
class CreateAlertInputRow extends Component {
    render() {
        let field = this.props.field
        let error = this.props.errors[field]

        let errorTextId = `${field}-error`
        return (
            <div className="row">
                <div className={classNames("col-md-12 form-group", {"has-error": error})}>
                    {this.props.children}
                    {error &&
                        <small id={errorTextId} className={classNames("text-danger", {"col-sm-9 col-sm-offset-3": this.props.horizontal})}>{error.message}</small>
                    }
                </div>
            </div>
        )
    }
}
/* eslint-enable */

const mapStateToProps = (state) => ({
    newAlert: state.newAlert,
    auth: state.auth
})

export default connect(mapStateToProps)(CreateAlert)
