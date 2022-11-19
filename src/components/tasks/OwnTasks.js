import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOwnedTasks } from "../../store/actions/task";

class OwnTasks extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.fetchOwnedTasks();

    this.setState({ loading: false });
  }

  render() {
    let tasks = <p>Loading...</p>;
    if (!this.state.loading) {
      tasks = this.props.tasks.map((task) => (
        <div>
          <p>{task.name}</p>
          <p>{task.creationDate}</p>
        </div>
      ));
    }

    return <div>{tasks}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOwnedTasks: () => dispatch(fetchOwnedTasks()),
  };
};

const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnTasks);
