import React from 'react';
import {Table} from 'reactstrap';
import {Link} from "react-router-dom";

export default class ProblemSetTable extends React.Component {
    render() {
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
                <tr>
                    <td><Link to="/problemSet/1">Basic Level Practice</Link></td>
                    <td>System</td>
                    <td>Practice</td>
                    <td>Forever</td>
                </tr>
                <tr>
                    <td><Link to="/problemSet/2">Advanced Level Practice</Link></td>
                    <td>System</td>
                    <td>Practice</td>
                    <td>Forever</td>
                </tr>
                <tr>
                    <td>Top Level Practice</td>
                    <td>System</td>
                    <td>Practice</td>
                    <td>Forever</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}
