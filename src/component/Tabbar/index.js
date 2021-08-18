import React from 'react';
import styles from './index.module.css';
import {
    ArrowRight,
    ArrowLeft
} from '@material-ui/icons';
import { IconButton, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import * as common from '../../module/reducer/type';
import { useDispatch } from 'react-redux';
import { Link, useLocation  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    links: {
        textDecoration: 'none',
        color: '#000',
        width: '100%',
        maxWidth: 360,
    },
}))

const TabbarView = ({ tabs }) => {

    const classes = useStyles();

    const currentLocation = useLocation();

    const { t } = useTranslation();

    let scroller = document.querySelector('.row-scroll');

    let direction = 0;
    let active = false;
    let max = 10;
    let Vx = 0;
    let prevTime = 0;
    let f = 0.2;
    let prevScroll = 0;

    function physics(time) {
        var diffTime = time - prevTime;
        if (!active) {
            diffTime = 80;
            active = true;
        }
        prevTime = time;

        Vx = (direction * max * f + Vx * (1 - f)) * (diffTime / 20);

        var thisScroll = scroller.scrollLeft;
        var nextScroll = Math.floor(thisScroll + Vx);

        if (Math.abs(Vx) > 0.5 && nextScroll !== prevScroll) {
            scroller.scrollLeft = nextScroll;
            requestAnimationFrame(physics);
        } else {
            Vx = 0;
            active = false;
        }
        prevScroll = nextScroll;
    }

    const dispatch = useDispatch();

    return (
        <div className={styles.Row}>
            <IconButton
                onMouseDown={() => {
                    direction = -5;
                    if (!active) {
                        requestAnimationFrame(physics)
                    }
                }}
                onMouseUp={() => direction = 0}
                size={"small"}
            >
                <ArrowLeft />
            </IconButton>
            <div className={`${styles.RowScroll} row-scroll`}>
                {
                    tabs.map((tab, index, arr) => {
                        const previousTab = arr[index - 1];
                        console.log(previousTab);
                        return <div
                            key={index}
                            className={
                                currentLocation.pathname === tab.url ?
                                    styles.TabItemFrame_Current_Tab :
                                    styles.TabItemFrame
                            }
                        >
                            <Link to={tab.url} className={classes.links}>
                                <div className={styles.TabItemLink}>
                                    <h5
                                        style={
                                            currentLocation.pathname === tab.url ?
                                                { color: '#FEFEFE' } :
                                                { color: 'black' }
                                        }
                                    >
                                        {t(`sidebar.${tab.name}`)}
                                    </h5>
                                    <Link to={previousTab ? previousTab.url : '/'}>
                                        <IconButton
                                            size={"small"}
                                            style={
                                                currentLocation.pathname === tab.url ?
                                                    { color: '#FEFEFE' } :
                                                    { color: 'gray' }
                                            }
                                            onClick={() => {
                                                dispatch({ type: common.DEL_TAB, payload: tab });
                                            }}>
                                            <CancelIcon fontSize={"small"} />
                                        </IconButton>
                                    </Link>
                                </div>
                            </Link>
                        </div>
                    })

                }
            </div>
            <IconButton
                style={{ marginLeft: 'auto' }}
                onMouseDown={() => {
                    direction = 5;
                    if (!active) {
                        requestAnimationFrame(physics);
                    }
                }}
                onMouseUp={() => {
                    direction = 0;
                }}
                size={"small"}
            >
                <ArrowRight fontSize={"small"} />
            </IconButton>
        </div>
    );
}

export default TabbarView;