import React from 'react';
import ProblemsTable from "../table/ProblemsTable";
import ProblemsListGroup from "../list/ProblemsListGroup";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";

export default class Problems extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <Breadcrumb tag="nav">
                        <BreadcrumbItem tag={Link} to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem tag={Link} to="/problemSet">Problem Set</BreadcrumbItem>
                        <BreadcrumbItem tag={Link} to="/problemSet/practice">Practice</BreadcrumbItem>
                        <BreadcrumbItem active>Basic Level Practice</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProblemsListGroup activeItem="ProblemsList" problemSetId={this.props.match.params.number}/>
                        </div>
                        <div className="col-md-9">
                            <ProblemsTable/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
