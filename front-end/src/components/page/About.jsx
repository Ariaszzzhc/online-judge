import React from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";

export default class About extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <Breadcrumb tag="nav">
                        <BreadcrumbItem tag={Link} to="/">Home</BreadcrumbItem>
                        <BreadcrumbItem active>About</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <h1>What is Online Judge</h1>
                            <p className="lead">An <span className="font-weight-bold">online judge</span> is an online
                                system to test programs in programming contests.</p>
                            <p className="lead">The system can compile and execute code, and test them with
                                pre-constructed
                                data. Submitted code may be run with restrictions, including time limit, memory limit,
                                security restriction and so on. The output of the code will be captured by the system,
                                and
                                compared with the standard output. The system will then return the result. When mistakes
                                were found in a standard output, rejudgement using the same method must be made.</p>
                            <p>Start to <Link to="/problemSet">submit my first code</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
