import React from "react";
import PRListsData from "./PRLists";

class DisplayList extends React.Component {
  constructor() {
    super();
    this.state = {
      PRLists: PRListsData.data.viewer.pullRequests.nodes
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
                href="https://github.com/${PRList.repository.owner.login}/${PRList.repository.name}"
              >
                {PRList.repository.owner.login}/{PRList.repository.name}
              </a>
              <a href="https://github.com/${PRList.repository.owner.login}/${PRList.repository.name}/pull/${PRList.number}">
                {PRList.title}
              </a>
            </li>
          );
        })}
      </div>
    );
  }
}

export default DisplayList;
