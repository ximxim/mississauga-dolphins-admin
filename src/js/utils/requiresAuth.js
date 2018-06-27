import React, { Component } from 'react';
import { getStore } from '../redux/store';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink,
    NavItem,
    DropdownItem,
    DropdownToggle,
    Collapse,
    Nav,
    UncontrolledDropdown,
    DropdownMenu,
} from 'reactstrap';

import SignIn from '../routes/signin';
import { requestSignOut, requestLoginSuccess } from '../redux/modules/AuthUser';
import { getClient } from './firebase';

export default function requiresAuth(Comp) {
    return class Auth extends Component {
        state = {
            isOpen: false,
        };

        render() {
            const store = getStore();
            const fClient = getClient();
            const state = store.getState();

            if (!state.authUser.uid) {
                fClient.auth().onAuthStateChanged(user => {
                    if (user && !state.authUser.loading)
                        store.dispatch(requestLoginSuccess(user));
                });

                return <SignIn />;
            } else {
                return (
                    <div>
                        {this.renderHeader(state.authUser, store)}
                        <Comp {...this.props} />;
                    </div>
                );
            }
        }

        renderHeader(user) {
            return (
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">MD Admin</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/Games">Games</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {user.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Settings</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.signOut}>
                                        Sign out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            );
        }

        signOut = () => {
            const store = getStore();
            this.toggle();
            store.dispatch(requestSignOut());
        };

        toggle = () => this.setState({ isOpen: !this.state.isOpen });
    };
}
