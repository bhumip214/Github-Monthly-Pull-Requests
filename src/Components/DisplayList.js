import React from "react";
import PRListsData from "./PRLists";

class DisplayList extends React.Component {
  constructor() {
    super();
    this.state = {
      PRLists: PRListsData.data.viewer.pullRequests.nodes,
      Username: PRListsData.data.viewer.login
    };
  }
  render() {
    return (
      <div className="listsWrapper">
        {this.state.PRLists.map((PRList, index) => {
          return (
            <li className="lists" key={index}>
              <a
                className="ownerRepoName"
                href={`https://github.com/${PRList.repository.owner.login}/${
                  PRList.repository.name
                }`}
              >
                {PRList.repository.owner.login}/{PRList.repository.name}
              </a>
              <a
                className="PRName"
                href={`https://github.com/${PRList.repository.owner.login}/${
                  PRList.repository.name
                }/pull/${PRList.number}`}
              >
                {PRList.title}
              </a>
              <div className="subtitle">
                #{PRList.number} {new Date(PRList.createdAt).toDateString()} by{" "}
                <a href="">{this.state.Username}</a>
              </div>
            </li>
          );
        })}
      </div>
    );
  }
}

export default DisplayList;
