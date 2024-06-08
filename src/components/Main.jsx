import React, { useState } from 'react';
import styles from '../styles/Main.module.css';
import { Link } from 'react-router-dom';

const FIELDS = {
    USERNAME: "username",
    ROOM: "room"
}

export const Main = () => {
    const {USERNAME, ROOM} = FIELDS;

    const [values, setValues] = useState({
        [USERNAME]: "",
        [ROOM]: ""
    });

    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]:value})
    }

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some((value) => !value)
        if(isDisabled)  e.preventDefault()
    }


  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <h1 className={styles.heading}>Join</h1>

            <form className={styles.form}>
                <div className={styles.group}>
                    <input 
                        type="text"
                        name="username"
                        value={values[USERNAME]}
                        placeholder='Username'
                        className={styles.input}
                     
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />

                </div>
                <div className={styles.group}>
                    <input 
                        type="text"
                        name="room"
                        placeholder='Room'
                        value={values[ROOM]}
                        className={styles.input}
              
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />
                </div>
                <Link className={styles.group} to={`/chat?username=${values[USERNAME]}&room=${values[ROOM]}`}
                onClick={handleClick}
                >
                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </Link>
            </form>
        </div>
    </div>
  )
}
