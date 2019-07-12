import React from "react";
import pullRequestsData from "./PRLists";
import { groupByMonth } from "./helper";

class DisplayList extends React.Component {
  constructor() {
    super();
    this.state = {
      pullRequests: pullRequestsData.data.viewer.pullRequests.nodes,
      username: pullRequestsData.data.viewer.login,
      months: groupByMonth(pullRequestsData.data.viewer.pullRequests.nodes)
    };
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
            <div>
              <h1 key={index} className="lists">
                {month.month}
              </h1>
              {month.pullRequests.map((pullRequest, index) => {
                return (
                  <li className="lists" key={index}>
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
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayList;
