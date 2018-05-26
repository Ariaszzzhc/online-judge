import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";

export default class ProblemSetListGroup extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem active={this.props.activeItem === "Practice"} tag={Link} to="/problemSet/practice"
                               action>Practice</ListGroupItem>
                <ListGroupItem active={this.props.activeItem === "Contest"} tag={Link} to="/problemSet/contest"
                               action>Contest</ListGroupItem>
            </ListGroup>
        )
    }
};
