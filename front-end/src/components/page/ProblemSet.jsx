import React from 'react';
import ProblemSetListGroup from "../list/ProblemSetListGroup";
import ProblemSetTable from "../table/ProblemSetTable";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import ProblemSetAPI from "../../api";

export default class ProblemSet extends React.Component {
    render() {
        let category;
        if (this.props.match.path.endsWith("contest")) {
            category = "Contest";
        } else {
            category = "Practice";
        }

        ProblemSetAPI.getProblemSets(category.toLowerCase());

        return (
            <div>
                <div className="container">
                    <Breadcrumb tag="nav">
                        <BreadcrumbItem tag={Link} to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem tag={Link} to="/problemSet">Problem Set</BreadcrumbItem>
                        <BreadcrumbItem active>{category}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProblemSetListGroup activeItem={category}/>
                        </div>
                        <div className="col-md-9">
                            <ProblemSetTable category={category}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
