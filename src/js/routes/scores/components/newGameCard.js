import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Table, Label } from 'reactstrap';

import ENV from '../../../../env';

class NewGameCard extends Component {
    state = {
        home: {
            name: ENV.newGame.home.name || '',
            score: ENV.newGame.home.score || '0',
            wickets: ENV.newGame.home.wickets || '0',
            overs: ENV.newGame.home.overs || '0',
            batting: ENV.newGame.home.batting || true,
        },
        visitor: {
            name: ENV.newGame.visitor.name || '',
            score: ENV.newGame.visitor.score || '0',
            wickets: ENV.newGame.visitor.wickets || '0',
            overs: ENV.newGame.visitor.overs || '0',
            batting: ENV.newGame.visitor.batting || false,
        },
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form>
                        <Table className="table">
                            <thead>
                            <tr>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">Home</th>
                                <th scope="col">Visitor</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{this.renderHomeTeamNameField()}</td>
                                <td>{this.renderVisitorTeamNameField()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Score</th>
                                <td>{this.renderHomeTeamScoreField()}</td>
                                <td>{this.renderVisitorTeamScoreField()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Overs</th>
                                <td>{this.renderHomeTeamOversField()}</td>
                                <td>{this.renderVisitorTeamOversField()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Wickets</th>
                                <td>{this.renderHomeTeamWicketsField()}</td>
                                <td>{this.renderVisitorTeamWicketsField()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Batting</th>
                                <td>{this.renderHomeTeamBattingField()}</td>
                                <td>{this.renderVisitorTeamBattingField()}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Button
                            className="btn-primary text-white btn-lg circle-btn-sm btn-block"
                            variant="raised"
                            onClick={this.handleCreateGame}
                        >
                            Create Game
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }

    renderHomeTeamNameField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="text"
                value={this.state.home.name}
                name="home-team"
                id="home-team-name"
                className="has-input input-sm"
                placeholder="Enter Name"
                onChange={(event) => this.setState({
                    home: {
                        ...this.state.home,
                        name: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderVisitorTeamNameField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="text"
                value={this.state.visitor.name}
                name="visitor-team"
                id="visitor-team-name"
                className="has-input input-sm"
                placeholder="Enter Name"
                onChange={(event) => this.setState({
                    visitor: {
                        ...this.state.visitor,
                        name: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderHomeTeamScoreField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="number"
                value={this.state.home.score}
                name="home-team-score"
                id="home-team-score"
                className="has-input input-sm"
                placeholder="Enter Score"
                onChange={(event) => this.setState({
                    home: {
                        ...this.state.home,
                        score: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderVisitorTeamScoreField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="number"
                value={this.state.visitor.score}
                name="visitor-team-score"
                id="visitor-team-score"
                className="has-input input-sm"
                placeholder="Enter Score"
                onChange={(event) => this.setState({
                    visitor: {
                        ...this.state.visitor,
                        score: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderHomeTeamWicketsField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="number"
                value={this.state.home.wickets}
                name="home-team-wickets"
                id="home-team-wickets"
                className="has-input input-sm"
                placeholder="Enter Wickets"
                onChange={(event) => this.setState({
                    home: {
                        ...this.state.home,
                        wickets: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderVisitorTeamWicketsField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="number"
                value={this.state.visitor.wickets}
                name="visitor-team-wickets"
                id="visitor-team-wickets"
                className="has-input input-sm"
                placeholder="Enter Wickets"
                onChange={(event) => this.setState({
                    visitor: {
                        ...this.state.visitor,
                        wickets: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderHomeTeamOversField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="number"
                value={this.state.home.overs}
                name="home-team-overs"
                id="home-team-overs"
                className="has-input input-sm"
                placeholder="Enter Overs"
                onChange={(event) => this.setState({
                    home: {
                        ...this.state.home,
                        overs: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderVisitorTeamOversField = () => {
        return <FormGroup className="has-wrapper">
            <Input
                type="number"
                value={this.state.visitor.overs}
                name="visitor-team-overs"
                id="visitor-team-overs"
                className="has-input input-sm"
                placeholder="Enter Overs"
                onChange={(event) => this.setState({
                    visitor: {
                        ...this.state.visitor,
                        overs: event.target.value
                    }
                })}
            />
        </FormGroup>;
    }

    renderHomeTeamBattingField = () => {
        return <FormGroup check>
            <Label check>
                <Input
                    type="checkbox"
                    checked={this.state.home.batting}
                    name="home-team-batting"
                    id="home-team-batting"
                    onChange={(event) => this.setState({
                        home: {
                            ...this.state.home,
                            batting: event.target.checked
                        }
                    })}
                />&nbsp;
            </Label>
        </FormGroup>;
    }

    renderVisitorTeamBattingField = () => {
        return <FormGroup check>
            <Label check>
                <Input
                    type="checkbox"
                    checked={this.state.visitor.batting}
                    name="visitor-team-batting"
                    id="visitor-team-batting"
                    onChange={(event) => this.setState({
                        visitor: {
                            ...this.state.visitor,
                            batting: event.target.checked
                        }
                    })}
                />&nbsp;
            </Label>
        </FormGroup>;
    }

    handleCreateGame = () => {
        const { home, visitor } = this.state;

        if (home.name && home.wickets && home.overs && home.score
            && visitor.name && visitor.wickets && visitor.overs && visitor.score) {
            const formData = { ...this.state, event_id: this.props.eventId }
            this.props.submit(formData);
        } else {
            console.log('something missing');
            console.log(this.state);
        }
    }
}

export default NewGameCard;
