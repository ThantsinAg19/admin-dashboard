
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { TreeItem, TreeView, } from '@material-ui/lab';

import {
    RemoveCircle as RemoveIcon,
    AddCircle as AddIcon,
} from '@material-ui/icons';


import {
    Box,
    Link, CircularProgress,
    Dialog, DialogContent, makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { roleService } from '../../../service';
import { checkStatus } from '../../../module/util';
import { useDispatch } from 'react-redux';
import { component_reducer, system_reducer } from '../../../module';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        // maxWidth:'auto'
    },
    remove: {
        color: 'red'
    },
    add: {

    }
})

/**
 * 
 */

const route = 'children'

function UpdateRole() {

    const classes = useStyles();

    const { t } = useTranslation();

    /**
     * the whole role object
     */
    const [role, setRole] = useState();
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setTimeout(() => {
        setLoading(false)
    }, 1500);

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { state: prevState, currentIndex } = location;

    const goBack = () => {
        history.goBack();
        dispatch(system_reducer.update_user_role_by_idx(role, currentIndex));
    }


    useEffect(() => {
        setRole(prevState)
    }, [prevState])

    const update_Permission = async (permission, status) => {
        try {

            startLoading();

            const body = {
                role: role?._id,
                permission,
                status
            }

            const response = await roleService.updatePermission(body);

            if (checkStatus(response)) {
                const { data } = await response

                history.replace({
                    ...history.location,
                    state: data?.data || {}
                })

                setRole(data.data || {});

                stopLoading();
            }

            else stopLoading();
        } catch (error) {
            dispatch(component_reducer.set_snack_bar_content({
                message: error.message || 'Something went wrong!',
                type: 'error'
            }))
        }
    }


    const renderTree = (nodes, field) => {
        const id = (nodes?.code || '' + nodes?.name)
        
        if (!id) return;
        return (
            <TreeItem
                key={id}
                nodeId={id}
                onLabelClick={null}
                label={<Box my={1} onClick={() => {
                    console.log(field)
                    setCurrent(nodes)
                }}><input type={"checkbox"} checked={nodes?.status === 1 || nodes?.status === true}
                    onClick={() => update_Permission(field, !nodes?.status)}
                    /> {t(`sidebar.${nodes?.name}`)}</Box>}
            >
                {
                    Array.isArray(nodes?.children) ?
                        nodes.children.map((node, index) => renderTree(node, `${field ? field + '.' : ''}${route}.${index}`))
                        : null
                }
            </TreeItem>
        )
    }

    return (
        <div>
            <Link color={"inherit"} onClick={goBack}>
                {t('system_role_management.go_back')}
            </Link>
            <h2>{role?.rolename}</h2>

            <Box mt={2}>
                {current &&
                    <h4>{t(`sidebar.${current?.name}`)}</h4>
                }
            </Box>
            <Box style={{ maxWidth: 300 }}>

                <TreeView
                    className={classes.root}
                    defaultExpandIcon={<AddIcon color={'primary'} fontSize={'small'} />}
                    defaultCollapseIcon={<RemoveIcon color={'primary'} fontSize={'small'} />}
                    defaultExpanded={['treeRoot']}
                >
                    {renderTree({
                        name: 'treeRoot',
                        children: role?.permission || []
                    })}
                </TreeView>

            </Box>

            <Dialog
                open={loading}
                onClose={stopLoading()}
                maxWidth="sm"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }
                }}
            >
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateRole;