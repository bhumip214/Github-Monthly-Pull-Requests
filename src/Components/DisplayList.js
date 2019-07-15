import React from "react";
import pullRequestsData from "./PRLists";
import { groupByMonth } from "./helper";
import { fetchPullRequests } from "./api";

class DisplayList extends React.Component {
  constructor() {
    super();
    this.state = {
      pullRequests: [],
      username: "",
      months: []
    };
  }

  componentDidMount() {
    fetchPullRequests().then(json => {
      const nodes = json.data.viewer.pullRequests.edges.map((edge, index) => {
        return edge.node;
      });

      console.log(nodes);

      this.setState({
        pullRequests: nodes,
        username: json.data.viewer.login,
        months: groupByMonth(nodes)
      });
    });
  }

  render() {
    return (
      <div className="listsWrapper">
        {this.state.months.map((month, index) => {
          console.log(month);
          if (month.pullRequests.length === 0) {
            return null;
          }
          return (
            <div key={index}>
              <h1 className="lists">{month.month}</h1>
              <ul>
                {month.pullRequests.map(pullRequest => {
                  return (
                    <li className="lists" key={pullRequest.id}>
                      <a
                        className="ownerRepoName"
                        href={`https://github.com/${
                          pullRequest.repository.owner.login
                        }/${pullRequest.repository.name}`}
                      >
                        {pullRequest.repository.owner.login}/
                        {pullRequest.repository.name}
                      </a>
                      <a
                        className="PRName"
                        href={`https://github.com/${
                          pullRequest.repository.owner.login
                        }/${pullRequest.repository.name}/pull/${
                          pullRequest.number
                        }`}
                      >
                        {pullRequest.title}
                      </a>
                      <div className="subtitle">
                        #{pullRequest.number}{" "}
                        {new Date(pullRequest.createdAt).toDateString()} by{" "}
                        <a href="">{this.state.username}</a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayList;
