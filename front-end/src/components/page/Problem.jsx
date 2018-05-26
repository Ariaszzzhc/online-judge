import {Link} from "react-router-dom";
import React from "react";
import {Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem} from "reactstrap";
import ReactLoading from 'react-loading';
import StringUtils from "../../utils/StringUtils";
import ProblemAPI from "../../api/ProblemAPI";

export default class Problem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "problem": null,
            "problemSetId": null,
            "problemSetType": null,
            "problemSetName": null
        }
    }

    componentWillMount() {
        ProblemAPI.getProblem(this.props.match.params.number)
            .then(response => response.json())
            .then(response => {
                // noinspection JSUnresolvedVariable
                this.setState({
                    "problem": response,
                    "problemSetId": response.problemSet.id,
                    "problemSetType": StringUtils.firstCharUpperCase(response.problemSet.type),
                    "problemSetName": response.problemSet.title
                })
            });
    }

    render() {
        // noinspection JSUnresolvedVariable
        return (
            <div>
                <div className="container">
                    <Breadcrumb tag="nav">
                        <BreadcrumbItem tag={Link} to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem tag={Link} to="/problemSets">Problem Set</BreadcrumbItem>
                        <BreadcrumbItem tag={Link}
                                        to={`/problemSets/${this.state.problem === null ? "" : this.state.problemSetType}`}>
                            {this.state.problem === null ? "Loading..." : this.state.problemSetType}
                        </BreadcrumbItem>
                        <BreadcrumbItem tag={Link}
                                        to={`/problemSets/${this.state.problemSetId === null ? "" : this.state.problemSetId}`}>
                            {this.state.problem === null ? "Loading..." : this.state.problemSetName}
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {this.state.problem === null ? "Loading..." : `#${this.state.problem.indexInProblemSet} ${this.state.problem.title}`}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                {
                    this.state.problem === null ?
                        <ReactLoading type="spin" color="#007bff" className="mx-auto"/>
                        : (
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h1>{this.state.problem.indexInProblemSet}. {this.state.problem.title}</h1>
                                        <hr/>
                                        <p className="lead">{this.state.problem.description}</p>
                                        <p className="font-weight-bold">Sample Input</p>
                                        {
                                            this.state.problem.sampleInput === null ?
                                                <p>{"<No Input>"}</p> : (
                                                    <pre className="sample">{this.state.problem.sampleInput}</pre>)
                                        }
                                        <p className="font-weight-bold">Sample Output</p>
                                        {
                                            this.state.problem.sampleOutput === null ?
                                                <p>{"<No Output>"}</p> : (
                                                    <pre className="sample">{this.state.problem.sampleOutput}</pre>)
                                        }
                                    </div>
                                    <div className="col-md-3">
                                        <ListGroup>
                                            <ListGroupItem>
                                                <span className="float-left">Difficulty:</span>
                                                <span className="float-right">{this.state.problem.difficulty}</span>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <span className="float-left">Total Accepted:</span>
                                                <span className="float-right">{this.state.problem.acceptCount}</span>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <span className="float-left">Total Submissions:</span>
                                                <span className="float-right">{this.state.problem.submitCount}</span>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <span className="float-left">Contributor:</span>
                                                <span
                                                    className="float-right">{this.state.problem.problemSet.contributor}</span>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col">

                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
};
