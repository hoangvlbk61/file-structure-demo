/** @format */

import React from "react";
import "./App.css";
import { connect } from "react-redux";
import REDUX_TYPES from "./const/redux-types";

const defaultPost = {
	title: "",
	body: ""
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			postInfo: defaultPost,
			status: "create"
		};

		this.props.dispatch({
			type: REDUX_TYPES.POST.FETCH
		});
	}

	handleSubmit() {
    const {postInfo, status} = this.state ;
    if(status === "create") 
      this.props.dispatch({
        type: REDUX_TYPES.POST.CREATE,
        payload: postInfo
      })
    else 
    this.props.dispatch({
      type: REDUX_TYPES.POST.UPDATE,
      payload: postInfo
    })
    this.onCreate()
	}

  onCreate() {
    console.log("call create ");
    
    this.setState({
      postInfo: defaultPost,
			status: "create"
    })
  }

	onReset() {
		this.setState({
			postInfo: defaultPost
		});
	}

	onEdit(e) {
		this.setState({
      postInfo: e,
      status: "edit"
		});
	}

	onDelete(id) {
		this.props.dispatch({
      type: REDUX_TYPES.POST.DELETE,
      payload: {
        Id: id
      }
    });
	}

	onChangeTitle(e) {
		this.setState({
			postInfo: {
				...this.state.postInfo,
				title: e
			}
		});
	}

	onChangeBody(e) {
		this.setState({
			postInfo: {
				...this.state.postInfo,
				body: e
			}
		});
	}

	render() {
		const { posts = [] } = this.props.post;
    const { postInfo } = this.state;
    console.log("RENDER: ", postInfo);
    
		return (
			<div>
				<button type="button" onClick={() => this.onCreate()}> Create </button>
				<form>
					<input
						placeholder="Title"
						name="title"
						value={postInfo.title}
						onChange={e => this.onChangeTitle(e.target.value)}
					/>{" "}
					<br />
					<input
						placeholder="Content"
						name="body"
						value={postInfo.body}
						onChange={e => this.onChangeBody(e.target.value)}
					/>{" "}
					<br />
					<button type="button" onClick={() => this.handleSubmit()}> Post </button>
					<button type="button" onClick={() => this.onReset()}> Reset </button>
				</form>
				<div
					style={{
						borderTop: "1px solid black",
						width: "100%",
						margin: "20px 20px 20px 20px"
					}}
				/>
				<table>
					<thead>
						<tr>
							<th> Id </th>
							<th> Title </th>
							<th> Content </th>
							<th> Action </th>
						</tr>
					</thead>
					<tbody>
						{posts.map(e => (
							<tr key={e.id}>
								<td> {e.id}</td>
								<td> {e.title}</td>
								<td> {e.body}</td>
								<td>
									{" "}
									<button onClick={() => this.onEdit(e)}>
										{" "}
										Sửa{" "}
									</button>
									<button onClick={() => this.onDelete(e.id)}>
										{" "}
										Xóa{" "}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(App);
