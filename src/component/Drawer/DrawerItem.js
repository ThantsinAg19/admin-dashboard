import React from 'react';
import * as common from '../../module/reducer/type';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Collapse,
    ListItem,
    ListItemText,
    makeStyles,
    ListItemIcon,
    Icon
} from '@material-ui/core'

import { ExpandLess, ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    Collapse: {
        paddingLeft: 10,
    },
    links: {
        textDecoration: 'none',
        color: '#fff',
        width: '100%',
        maxWidth: 360,
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#2E414F',
        margin: 0
    },
    icon_color : {
        color: "white"
    }
}))

const ListIcon = ({
    icon = 'dashboard',
}) => (
    <ListItemIcon style={{color: 'white'}}>
        <Icon
            // color={"secondary"}
            fontSize={"small"}
        >
            {icon || 'dashboard'}
        </Icon>
    </ListItemIcon>
)

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
    typoProps = {},
    subOption = {},
    expand = false,
    activeNow,
    recursiveHandler = function () { },
    handleClick = function () { },
    t,
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const onDrawerItemClick = (subOption) => {
        dispatch({type: common.ADD_TAB, payload: subOption});
    }

    if (!subOption.children)
        return (
            <Link to={subOption.url} className={classes.links} onClick={() => { onDrawerItemClick(subOption) }}>
                <ListItem button>
                    <ListIcon icon={subOption.icon} />
                    <ListItemText
                        // inset
                        primaryTypographyProps={{
                            style: {
                                ...typoProps,
                                color: activeNow
                            },
                        }}
                        primary={t(`sidebar.${subOption.name}`)}
                    />
                </ListItem>
            </Link >
        )

    return (
        <div className={classes.root}>
            <ListItem button
                onClick={handleClick}
            >
                <ListIcon icon={subOption.icon} />
                <ListItemText
                    // inset
                    style={{color: 'white'}}
                    primary={t(`sidebar.${subOption.name}`)}
                    primaryTypographyProps={{
                        style: typoProps
                    }}
                />
                {
                    expand ?
                        <ExpandLess style={{color: 'white'}} fontSize={"small"} />
                        :
                        <ExpandMore style={{color: 'white'}} fontSize={"small"} />
                }
            </ListItem>
            <Collapse
                in={expand}
                timeout="auto"
                className={classes.Collapse}
                unmountOnExit
                disableStrictModeCompat
            >
                {recursiveHandler(subOption.children)}
            </Collapse>
        </div>
    )
}