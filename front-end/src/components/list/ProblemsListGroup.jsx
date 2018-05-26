import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";

export default class ProblemsListGroup extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem active={this.props.activeItem === "ProblemsList"} tag={Link}
                               to={`/problemSet/${this.props.problemSetId}`} action>Problem List</ListGroupItem>
                <ListGroupItem tag={Link} to={`/submitHistory/${this.props.problemSetId}`} action>Submit
                    History</ListGroupItem>
                <ListGroupItem tag={Link} to={`/rank/${this.props.problemSetId}`} action>Rank</ListGroupItem>
            </ListGroup>
        )
    }
};
