import { Link } from "react-router-dom";
import React, { useState } from 'react'
import { Input, Menu, Segment, Icon, IconGroup } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

const Home = ({ page }) => {
    const user = useSelector(state => state.user);
    return (
        <>
            <Menu pointing secondary>
                <Link to="/home">
                    <Menu.Item active={page === 'דף הבית'}>
                        <Icon name="home" size='large' color="teal" style={{ marginLeft: "10px" }} /> דף הבית
                    </Menu.Item>
                </Link>
                <Link to="/userrecipes">
                    <Menu.Item active={page === 'המתכונים שלי'} >
                        <Icon name="male" size='large' color="teal" style={{ marginLeft: "10px" }} />  המתכונים שלי
                    </Menu.Item>
                </Link>
                <Link to="/allRecipes">
                    <Menu.Item active={page === 'מתכונים'}>
                        <Icon name="birthday cake" size='large' color="teal" style={{ marginLeft: "10px" }} />  מתכונים
                    </Menu.Item>
                </Link>
                <Link to="/buy">
                    <Menu.Item active={page == 'רשימת קניות'}  >
                        <Icon name="shopping basket" size='large' color="teal" style={{ marginLeft: "10px" }} />רשימת קניות
                    </Menu.Item>
                </Link>
                <Link to="/addRecipe">
                    <Menu.Item active={page === 'הוספת מתכון'}  >
                        <Icon name="plus" size='large' color="teal" style={{ marginLeft: "10px" }} /> הוספת מתכון
                    </Menu.Item>
                </Link>
                <Link to="/addCategory">
                    <Menu.Item active={page === 'הוספת קטגוריה'}  >
                        <Icon name="plus" size='large' color="teal" style={{ marginLeft: "10px" }} />  הוספת קטגוריה
                    </Menu.Item>
                </Link>
                <Link to="/">
                    <Menu.Menu position='left'>
                        <Menu.Item  >
                            <Icon name="remove user" size='large' color="teal" style={{ marginLeft: "10px" }} /> החלף משתמש
                        </Menu.Item>
                    </Menu.Menu>
                </Link>
            </Menu>
            <div style={{ textAlign: "left", marginLeft: "10px" }}>
                <b>שלום {localStorage.getItem("userName")}</b>
                <Icon inverted color="teal" size='big' circular name="user" />
            </div>
        </>
    )
}

export default Home;