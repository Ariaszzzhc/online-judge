import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";

export default class ProblemsListGroup extends React.Component {
    render() {
        // noinspection JSUnresolvedVariable
        return (
            <ListGroup>
                <ListGroupItem active={this.props.activeItem === "ProblemsList"} tag={Link}
                               to={`/problemSets/${this.props.problemSetId}`} action>Problem List</ListGroupItem>
                <ListGroupItem active={this.props.activeItem === "SubmitHistory"} tag={Link}
                               to={`/submitHistories/${this.props.problemSetId}`} action>Submit
                    History</ListGroupItem>
                <ListGroupItem active={this.props.activeItem === "Rank"} tag={Link}
                               to={`/ranks/${this.props.problemSetId}`} action>Rank</ListGroupItem>
            </ListGroup>
        )
    }
};
