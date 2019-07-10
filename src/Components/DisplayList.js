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
      <div>
        <h1> Github Pull Requests</h1>
        <div className="listsWrapper">
          {this.state.PRLists.map((PRList, index) => {
            return (
              <li className="lists" key={index}>
                {PRList.repository.owner.login}/{PRList.repository.name}
                <a href="">{PRList.title} </a>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DisplayList;
