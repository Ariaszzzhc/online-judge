import React from 'react';
import {Table} from 'reactstrap';
import {Link} from "react-router-dom";
import ReactLoading from 'react-loading';

export default class ProblemsTable extends React.Component {
    render() {
        if (this.props.problems === null) {
            return (
                <ReactLoading type="spin" color="#007bff" className="mx-auto"/>
            )
        }
        if (this.props.problems.length === 0) {
            return (
                <p>No available Problem</p>
            )
        }
        // noinspection JSUnresolvedVariable
        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Submit Count</th>
                    <th>Accept Count</th>
                    <th>Acceptance</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.problems.map((problem) =>
                        <tr key={problem.id}>
                            <th scope="row">{problem.indexInProblemSet}</th>
                            <td><Link to={`/problem/${problem.id}`}>{problem.title}</Link></td>
                            <td>{problem.difficulty}</td>
                            <td>{problem.submitCount}</td>
                            <td>{problem.acceptCount}</td>
                            <td>{problem.submitCount === 0 ? 0 : (problem.acceptCount / problem.submitCount * 100)}%</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        );
    }
}
