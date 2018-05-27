import React from 'react';
import ProblemSetListGroup from "../list/ProblemSetListGroup";
import ProblemSetTable from "../table/ProblemSetTable";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import ProblemSetAPI from "../../api/ProblemSetAPI";

export default class ProblemSets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "problemSets": null
        };
    }

    fetchData(category) {
        ProblemSetAPI.getProblemSets(category.toLowerCase())
            .then(response => response.json())
            .then(response => {
                this.setState({
                    "problemSets": response
                })
            })
    }

    componentDidMount() {
        this.fetchData(this.props.category)
    }

    componentWillReceiveProps(props) {
        this.setState({
            "problemSets": null
        });
        this.fetchData(props.category)
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Breadcrumb tag="nav">
                        <BreadcrumbItem tag={Link} to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem tag={Link} to="/problemSets">Problem Set</BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.category}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProblemSetListGroup activeItem={this.props.category}/>
                        </div>
                        <div className="col-md-9">
                            <ProblemSetTable problemSets={this.state.problemSets}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
