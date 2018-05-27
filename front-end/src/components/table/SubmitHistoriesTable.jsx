import React from 'react';
import {Pagination, PaginationItem, PaginationLink, Table} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Link} from "react-router-dom";

export default class SubmitHistoriesTable extends React.Component {
    render() {
        if (this.props.submitHistories === null) {
            return (
                <ReactLoading type="spin" color="#007bff" className="mx-auto"/>
            )
        }
        if (this.props.submitHistories.content.length === 0) {
            return (
                <p>No available SubmitHistory</p>
            )
        }
        // noinspection JSUnresolvedVariable
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Table responsive hover className="text-center">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Problem</th>
                                <th>Submit Time</th>
                                <th>Result</th>
                                <th>Running Time</th>
                                <th>User Nick</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.submitHistories.content.map((history) =>
                                    <tr key={history.id}>
                                        <td scope="row">{history.problem.id}</td>
                                        <td>
                                            <Link to={`/problems/${history.problem.id}`}
                                                  onClick={() => window.localStorage.setItem(`code-${history.problem.id}`, history.sourceCode)}>
                                                {history.problem.title}
                                            </Link>
                                        </td>
                                        <td>{history.submitTime}</td>
                                        <td>{history.judgeResult}</td>
                                        <td>{history.runningTime === null ? "-" : history.runningTime}</td>
                                        <td>{history.user.nick}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Pagination>
                            <PaginationItem disabled={this.props.submitHistories.first}>
                                <PaginationLink previous tag={Link}
                                                to={`?page=${this.props.submitHistories.number - 1}`}/>
                            </PaginationItem>
                            {
                                Array.from(new Array(this.props.submitHistories.totalPages), (val, index) => index).map(index =>
                                    <PaginationItem disabled={this.props.submitHistories.number === index}>
                                        <PaginationLink tag={Link} to={`?page=${index}`}>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            }
                            <PaginationItem disabled={this.props.submitHistories.last}>
                                <PaginationLink next tag={Link} to={`?page=${this.props.submitHistories.number + 1}`}/>
                            </PaginationItem>
                        </Pagination>
                    </div>
                </div>
            </div>
        );
    }
}
