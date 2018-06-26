import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import { requestLogin } from '../../redux/modules/AuthUser';

import ENV from '../../../env';

class SignIn extends Component {

    state = {
        username: ENV.login.username || '',
        password: ENV.login.password || '',
    }

    render() {
        const { username, password } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h2>Mississauga Dolphins Admin Portal</h2>
                        <Form className="padder">
                            <FormGroup className="has-wrapper">
                                <Input
                                    type="email"
                                    value={username}
                                    name="username"
                                    id="username"
                                    className="has-input input-lg"
                                    placeholder="Enter Email Address"
                                    onChange={(event) => this.setState({ username: event.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <Input value={password}
                                       type="Password"
                                       name="password"
                                       id="password"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       onChange={(event) => this.setState({ password: event.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="mb-15">
                                <Button
                                    className="btn-success text-white btn-lg circle-btn-sm btn-block"
                                    variant="raised"
                                    onClick={this.onUserLogin}
                                    disabled={this.props.loading}
                                >
                                    Sign In
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    onUserLogin = () => {
        const { username, password } = this.state;
        const { history } = this.props;
        if (username !== '' && password !== '')
            this.props.requestLogin({ username, password, history });
    }
}

const mapStateToProps = ({ authUser }) => {
    const { uid: user, loading } = authUser;
    return { user, loading };
}

const mapDispatchToProps = { requestLogin };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
