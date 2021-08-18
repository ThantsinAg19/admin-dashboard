import React, { useEffect, useState } from 'react';

import {
    Avatar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
import clsx from 'clsx';
import {
    ChevronRight,
    ChevronLeft,
} from '@material-ui/icons';
import _ from 'lodash';

import DrawerItem from './DrawerItem';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_STORED_USER_INFO } from '../../util/storage';


export const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        backgroundColor: '#2E4150'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        },
        backgroundColor: '#2E4150'
    },
    toolBar: {
        backgroundColor: '#233547',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        paddingLeft: 20,
        color: "white",
        ...theme.mixins.toolbar
    },
    Collapse: {
        paddingLeft: 2
    },
    listItemText: {
        wordBreak: "break-word",
        maxWidth: 180,
        whiteSpace: "normal",
        color: "white"
    },
    rightBorder: {
        borderRight: '2px solid red !important',
        marginRight: 2,
        backgroundColor: '#2E414F'
    },
    ItemBorder: {
        borderBottom: '1px solid #3E5160 !important',
        backgroundColor: '#2E414F'
    },
    ItemCurrent: {
        backgroundColor: '#083265',
    },
    user_name: {
        fontSize: 14,
        fontWeight: "bold",
        maxWidth: 200,
        color: 'white'
    },
    role_text: {
        fontSize: 12,
        color: 'white'
    },
    branch: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },
    icon_color: {
        color: 'white'
    },
}))

const DrawerBar = ({
    /**
     * state
     */
    menuState,
    role,
    permission,
    /**
     * action
     */
    Toggle
}) => {

    const { t } = useTranslation()
    const location = useLocation();
    const pathName = location.pathname || '/';

    const [data, setData] = useState({
        roleName: '',
        permission: []
    });

    useEffect(() => {
        if (role && Array.isArray(permission))
            setData({
                roleName: role,
                permission: permission
            })
    }, [role, permission])

    const [menu, setMenu] = useState({});
    const classes = useStyles();


    const typo_Props = menuState ?
        {
            wordBreak: "break-word",
            maxWidth: 180,
            whiteSpace: "normal",
            fontSize: '0.8rem',
            fontWeight: 'bold'
        }
        :
        {}

    const handleClick = (item, level = 2) => {

        let temp = _.cloneDeep(menu);

        if (level !== 1 || temp[item]) {

            temp[item] = !temp[item]

            setMenu(temp)

        }
        else {
            let obj = {}

            obj[item] = !obj[item]

            setMenu(obj)
        }
    }

    const handler = (children, level = 2) => {
        if (Array.isArray(children)) {

            return children.map((subOption, index) => (
                <div key={subOption.name + index}
                    className={
                        clsx(classes.ItemBorder,
                            {
                                [classes.rightBorder]: menu[subOption.name],
                                [classes.ItemCurrent]: pathName === subOption.url
                            })
                    }
                >
                    <DrawerItem
                        typoProps={typo_Props}
                        subOption={subOption}
                        expand={menu[subOption.name]}
                        activeNow={pathName === subOption?.url ? '#FFF' : '#FFF'}
                        recursiveHandler={() => handler(subOption.children)}
                        handleClick={() => handleClick(subOption.name, level)}
                        t={t}
                    />
                </div>
            ))

        }
    }

    return (
        <React.Fragment>
            <Drawer
                variant="persistent"
                className={
                    clsx(classes.drawer, {
                        [classes.drawerOpen]: menuState,
                        [classes.drawerClose]: !menuState
                    })
                }
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: menuState,
                        [classes.drawerClose]: !menuState
                    })
                }}
                anchor="left"
                open
            >
                <div className={classes.toolBar}>
                    <ListItem style={{
                        marginLeft: 20,
                    }}>
                        <ListItemAvatar>
                            <Avatar
                                src={"../../assets/img/pp.png"}
                                alt={"profile picture"}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<span className={classes.user_name}>{GET_STORED_USER_INFO?.name}</span>}
                            secondary={
                                <>
                                    <span className={classes.branch}>{GET_STORED_USER_INFO?.branchname}</span>
                                    <br />
                                    <span className={classes.role_text}>{GET_STORED_USER_INFO?.rolename}</span>
                                </>
                            }
                        />
                    </ListItem>
                    {
                        menuState ?
                            <IconButton className={classes.icon_color} onClick={Toggle}>
                                <ChevronLeft />
                            </IconButton>
                            :
                            <IconButton className={classes.icon_color} onClick={Toggle}>
                                <ChevronRight />
                            </IconButton>
                    }

                </div>
                <List>
                    {handler(data.permission, 1)}
                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default DrawerBar