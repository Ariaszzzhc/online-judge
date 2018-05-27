import React from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import ProblemSetAPI from "../../api/ProblemSetAPI";
import StringUtils from "../../utils/StringUtils";
import ProblemsListGroup from "../list/ProblemsListGroup";
import SubmitHistoryAPI from "../../api/SubmitHistoryAPI";
import SubmitHistoriesTable from "../table/SubmitHistoriesTable";

export default class SubmitHistories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            problemSetId: this.props.match.params.number,
            problemSet: null,
            submitHistories: null
        }
    }

    componentWillMount() {
        ProblemSetAPI.getProblemSet(this.state.problemSetId)
            .then(response => response.json())
            .then(json => {
                json.type = StringUtils.firstCharUpperCase(json.type);
                this.setState({
                    problemSet: json
                })
            });

        this.fetchData(this.props.location.search)
    }

    componentWillReceiveProps(props) {
        this.fetchData(props.location.search)
    }

    fetchData(searchParams: String) {
        SubmitHistoryAPI.getSubmitHistories(this.state.problemSetId, searchParams)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    submitHistories: json
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
                                        to={`/problemSets/${this.state.problemSet === null ? "" : this.state.problemSet.type.toLowerCase()}`}>
                            {this.state.problemSet === null ? "Loading..." : this.state.problemSet.type}
                        </BreadcrumbItem>
                        <BreadcrumbItem tag={Link}
                                        to={`/problemSets/${this.state.problemSet === null ? "" : this.state.problemSetId}`}>
                            {this.state.problemSet === null ? "Loading..." : this.state.problemSet.title}
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Submit History</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProblemsListGroup activeItem="SubmitHistory" problemSetId={this.state.problemSetId}/>
                        </div>
                        <div className="col-md-9">
                            <SubmitHistoriesTable submitHistories={this.state.submitHistories}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
