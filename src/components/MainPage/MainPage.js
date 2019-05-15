import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import * as actions from '../../store/actions/auth'
import {bindActionCreators} from 'redux';
import axios from 'axios';
import './style.scss'

function MainPage(props) {
    const {addCount} = props.actions;
    const {counter} = props;
    const [firstName, setFirstName] = useState("Dima");
    const [lastName, setLastName] = useState("Novik");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                setUsers(res.data);
            });
    }, []);

    return (
        <div className={'inputs-block'}>
            <ul className='users'>{users.map(item => (<li key={item.id}>{item.name}</li>))}</ul>
            <p>COUNTER: {counter}</p>
            <p>
                <Button
                    onClick={addCount}
                    variant="contained"
                    color="primary"
                >ADD ONE MORE</Button>
            </p>
            <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
    );
}

const mapStateToProps = state => ({counter: state.auth.counter});
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);