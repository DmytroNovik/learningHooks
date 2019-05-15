import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import * as actions from '../../store/actions/auth'
import {bindActionCreators} from 'redux';
import axios from 'axios';
import './style.scss'

function MainPage(props) {
    const {addCount} = props.actions;
    const {counter} = props;
    const [newUserFirstName, setNewUserFirstName] = useState("");
    const [newUserLastName, setNewUserLastName] = useState("");
    const [changedName, setChangedName] = useState("")
    const [edit, setEdit] = useState(null);
    const usersObj = useUsers();

    useEffect(() => {
        document.title = `You clicked ${counter} times`;
    });

    return (
        <div className='main-page-container'>
            <div className='add-new-user'>
                <TextField
                    className='new-user-input'
                    placeholder="First Name"
                    value={newUserFirstName}
                    onChange={(e) => setNewUserFirstName(e.target.value)}
                />
                <TextField
                    className='new-user-input'
                    placeholder="Last Name"
                    value={newUserLastName}
                    onChange={(e) => setNewUserLastName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color='primary'
                    onClick={() => usersObj.add(newUserFirstName, newUserLastName)}
                >ADD NEW USER</Button>
            </div>
            <ul className='users'>
                {usersObj.users.map((item, index) => (
                    <li key={index}>
                        {edit === index
                            ?
                            <Fragment>
                                <TextField
                                    defaultValue={usersObj.users[index].name}
                                    onChange={(e)=> setChangedName(e.target.value)}
                                />
                                <Button variant="contained" onClick={() => {
                                    usersObj.delete(index);
                                    setEdit(null);
                                }}>DELETE</Button>
                                <Button variant='contained' onClick={() => setEdit(null)}>Cancel</Button>
                                <Button variant="contained" onClick={() => {
                                    setEdit(null);
                                    usersObj.rename(index, changedName)
                                }}>SAVE</Button>
                            </Fragment>
                            :
                            <Fragment>
                                <span>{item.name}</span>
                                <Button variant="contained" onClick={() => setEdit(index)}>EDIT</Button>
                            </Fragment>
                        }
                    </li>
                ))}
            </ul>
            <p>COUNTER: {counter}</p>
            <p>
                <Button
                    onClick={addCount}
                    variant="contained"
                    color="primary"
                >ADD ONE MORE</Button>
            </p>
        </div>
    );
}

const useUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                setUsers(res.data);
            });
    }, []);

    return {
        users,
        add: (firstName, lastName) => setUsers([...users, {name: firstName + ' ' + lastName}]),
        delete: index => setUsers(users.filter(item => users.indexOf(item) !== index)),
        rename: (index, name) => setUsers(users.map(item => users.indexOf(item) === index ? Object.assign({}, item, {name: name}): item))
    }
};

const mapStateToProps = state => ({counter: state.auth.counter});
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);