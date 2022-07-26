import { Component, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from '../../services/user.service';
import IUserData from '../../model-types/user.type';

type Props = {};
type State = {
    users: Array<IUserData>,
    currentUser: IUserData | null,
    currentIndex: number,
    searchEmail: string
};

export default class UserList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchEmail = this.searchEmail.bind(this);
        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchEmail: ""
        };
    }
    componentDidMount() {
        this.retrieveUsers();
        console.log(this.state);
    }
    onChangeSearchEmail(e: ChangeEvent<HTMLInputElement>) {
        const searchEmail = e.target.value;
        this.setState({
            searchEmail: searchEmail
        });
    }
    retrieveUsers() {
        UserService.getAll()
            .then((response: any) => {
                this.setState({
                    users: response.data.users
                });
                console.log(response.data.users);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }
    setActiveUser(user: IUserData, index: number) {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
    }
    removeAllTutorials() {
        UserService.deleteAll()
            .then((response: any) => {
                console.log(response.data);
                this.refreshList();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    searchEmail() {
        debugger;
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
        UserService.findByEmail(this.state.searchEmail)
            .then((response: any) => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    render() {
        const { searchEmail: searchEmail, users: users, currentUser: currentUser, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchEmail}
                            onChange={this.onChangeSearchEmail}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchEmail}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>
                    <ul className="list-group">
                        { users && 
                            users.map((user, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveUser(user, index)}
                                    key={index}
                                >
                                    {user.email}
                                </li>
                            ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentUser ? (
                        <div>
                            <h4>User</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentUser.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {currentUser.email}
                            </div>
                            {/* <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentUser.published ? "Published" : "Pending"}
                            </div> */}
                            {/* <Link
                                to={"/tutorials/" + currentUser.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link> */}
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
