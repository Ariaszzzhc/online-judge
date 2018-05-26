import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";

export default class ProblemSetListGroup extends React.Component {
    render() {
        // noinspection JSUnresolvedVariable
        return (
            <ListGroup>
                <ListGroupItem active={this.props.activeItem === "Practice"} tag={Link} to="/problemSets/practice"
                               action>Practice</ListGroupItem>
                <ListGroupItem active={this.props.activeItem === "Contest"} tag={Link} to="/problemSets/contest"
                               action>Contest</ListGroupItem>
            </ListGroup>
        )
    }
};
