import React from 'react';
import {Table} from 'reactstrap';
import {Link} from "react-router-dom";
import ReactLoading from 'react-loading';

export default class ProblemSetTable extends React.Component {
    render() {
        if (this.props.problemSets === null) {
            return (
                <ReactLoading type="spin" color="#007bff" className="mx-auto"/>
            )
        }
        if (this.props.problemSets.length === 0) {
            return (
                <p>No available ProblemSet</p>
            )
        }
        // noinspection JSUnresolvedVariable
        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Contributor</th>
                    <th>Type</th>
                    <th>Available Until</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.problemSets.map((problemSet) =>
                        <tr key={problemSet.id}>
                            <td><Link to={`/problemSets/${problemSet.id}`}>{problemSet.title}</Link></td>
                            <td>{problemSet.contributor}</td>
                            <td>{problemSet.type}</td>
                            <td>{problemSet.expire === null ? "Forever" : problemSet.expire}</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        );
    }
}
