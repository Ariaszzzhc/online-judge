import React from 'react';
import {Table} from 'reactstrap';
import {Link} from "react-router-dom";

export default class ProblemsTable extends React.Component {
    render() {
        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Score</th>
                    <th>Submit Count</th>
                    <th>Accept Count</th>
                    <th>Acceptance</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td><Link to={`/problem/1`}>HelloWorld</Link></td>
                    <td>20</td>
                    <td>5</td>
                    <td>2</td>
                    <td>1%</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td><Link to="/problem/2">HelloWorld</Link></td>
                    <td>20</td>
                    <td>5</td>
                    <td>2</td>
                    <td>1%</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}
