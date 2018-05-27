import React from 'react';
import ProblemsTable from "../table/ProblemsTable";
import ProblemsListGroup from "../list/ProblemsListGroup";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import ProblemSetAPI from "../../api/ProblemSetAPI";
import StringUtils from "../../utils/StringUtils";

export default class Problems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "problemSetName": null,
            "problemSetType": null,
            "problems": null
        }
    }

    componentWillMount() {
        ProblemSetAPI.getProblemSet(this.props.match.params.number)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    "problemSetName": response.title,
                    "problemSetType": StringUtils.firstCharUpperCase(response.type)
                })
            });

        ProblemSetAPI.getProblems(this.props.match.params.number)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    "problems": response
                })
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Breadcrumb tag="nav">
                        <BreadcrumbItem tag={Link} to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem tag={Link} to="/problemSets">Problem Set</BreadcrumbItem>
                        <BreadcrumbItem tag={Link}
                                        to={`/problemSets/${this.state.problemSetType === null ? "" : this.state.problemSetType.toLowerCase()}`}>
                            {this.state.problemSetType === null ? "Loading..." : this.state.problemSetType}
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {this.state.problemSetName === null ? "Loading..." : this.state.problemSetName}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProblemsListGroup activeItem="ProblemsList" problemSetId={this.props.match.params.number}/>
                        </div>
                        <div className="col-md-9">
                            <ProblemsTable problems={this.state.problems}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
