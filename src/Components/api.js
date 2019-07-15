const graphqlQuery = (after = null) => {
  return `{
    viewer {
      login
      pullRequests(after: ${after}, first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          cursor
          node {
            id
            title
            number
            repository {
              owner {
                login
              }
            }
            createdAt
          }
        }
      }
    }
  }`;
};

function fetchFromGithub(after) {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
    },
    body: JSON.stringify({
      query: graphqlQuery(after)
    })
  }).then(res => res.json());
}

/**
 * Checks if PR is older than year inclusive of whole month
 * @param {*} node
 */
function isOlderThanYear(node) {
  if (!node) {
    return false;
  }

  const lastYearDate = new Date();
  lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
  // set date to 1st date of the month
  lastYearDate.setDate(0);

  return new Date(node.createdAt) < lastYearDate;
}

export async function fetchPullRequests() {
  let resp;
  let isDone = false;
  let cursor = null;
  let node;

  while (!isDone) {
    const json = await fetchFromGithub(cursor);

    if (!resp) {
      resp = json;
    } else {
      // update edges by merging previous and newly fetched edges
      resp.data.viewer.pullRequests.edges = [
        ...resp.data.viewer.pullRequests.edges,
        ...json.data.viewer.pullRequests.edges
      ];

      // Or
      //   resp.data.viewer.pullRequests.edges = resp.data.viewer.pullRequests.edges.concat(
      //     json.data.viewer.pullRequests.edges
      //   );
    }

    const totalEdges = json.data.viewer.pullRequests.edges.length;
    if (totalEdges > 0) {
      cursor = json.data.viewer.pullRequests.edges[totalEdges - 1].cursor;
      node = json.data.viewer.pullRequests.edges[totalEdges - 1].node;
    }

    isDone =
      json.data.viewer.pullRequests.edges.length === 0 ||
      totalEdges < 100 ||
      isOlderThanYear(node);
  }

  // filter out PRs that are older than a year as we may have some extra
  resp.data.viewer.pullRequests.edges = resp.data.viewer.pullRequests.edges.filter(
    edge => {
      return !isOlderThanYear(edge.node);
    }
  );

  return resp;
}
