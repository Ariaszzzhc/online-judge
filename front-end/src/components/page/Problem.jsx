import {Link} from "react-router-dom";
import React from "react";
import {Breadcrumb, BreadcrumbItem, Button, Input, ListGroup, ListGroupItem} from "reactstrap";
import ReactLoading from 'react-loading';
import StringUtils from "../../utils/StringUtils";
import ProblemAPI from "../../api/ProblemAPI";
//monaco
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands';
import 'monaco-editor/esm/vs/editor/contrib/find/findController';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
import SubmitAPI from "../../api/SubmitAPI";

//monaco
// noinspection JSUnusedGlobalSymbols
self.MonacoEnvironment = {
    getWorker: () => new Worker('../../../node_modules/monaco-editor/esm/vs/editor/editor.worker')
};

export default class Problem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            problem: null,
            problemSetId: null,
            problemSetType: null,
            problemSetName: null,
            submitting: false,
            language: "C",
            errorMessage: null
        };

        this.monacoEditor = null;
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

    componentWillUnmount() {
        window.localStorage.setItem(`code-${this.state.problem.id}`, this.monacoEditor.getValue());
    }

    createMonacoEditor(element) {
        if (this.monacoEditor === null) {
            this.monacoEditor =
                monaco.editor.create(element, {
                    value: window.localStorage.getItem(`code-${this.state.problem.id}`),
                    language: 'cpp'
                });
        }
    }

    submitCode() {
        this.setState({
            "submitting": true
        });
        SubmitAPI.submit(
            this.state.problem.id,
            {
                "language": this.state.language,
                "sourceCode": this.monacoEditor.getValue()
            }
        )
            .then(response => response.json())
            .then(json => {
                if (json.hasOwnProperty("message")) {
                    throw new Error(json.message)
                }
                return json
            })
            .then(json => {
                this.props.history.push(`/submitHistories/${json.id}`);
            })
            .catch(error => {
                this.setState({
                    submitting: false,
                    errorMessage: error.message
                });
            });
    }

    onLanguageChange(e) {
        this.setState({
            language: e.target.value
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
                                <div className="row mb-4">
                                    <div className="col-md-6 col-lg-3">
                                        <Input type="select" value={this.state.language}
                                               onChange={e => this.onLanguageChange(e)}>
                                            <option>C</option>
                                        </Input>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="border border-1" style={{height: '500px'}}
                                             ref={element => this.createMonacoEditor(element)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Button color="primary" className="float-right"
                                                disabled={this.state.submitting}
                                                onClick={() => {
                                                    this.submitCode()
                                                }}>
                                            Submit
                                        </Button>
                                        <div className="float-right" style={{padding: '9px'}}
                                             hidden={!this.state.submitting}>
                                            <ReactLoading color="blue" type="spin" height={20} width={20}/>
                                        </div>
                                        <span className="float-right"
                                              style={{padding: '7px'}}>{this.state.errorMessage}</span>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
};
