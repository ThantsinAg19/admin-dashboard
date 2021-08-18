import React, { useEffect, } from 'react';
import {
  colors,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route
} from 'react-router-dom'

import './App.css'

import { action_GetPermission } from './module/action/action.user';
import {
  Drawer,
  Header,
  System,
} from './container'
import { AppButton, AppLoading, ButtonType } from './component';
import { close_prompt_dialog } from './module/reducer/reducer.components';
import TabbarView from './component/Tabbar';
import AppSnackBar from './component/AppSnackBar';
import Signin from './auth/SignIn';
import ForgetPassword from './auth/ForgetPassword';
import OTPinput from './auth/OTPinput';
import ResetPassword from './auth/ResetPassword';
// import { AppTabBar } from './component';
import { GET_STORED_ACCESS_TOKEN } from './util/storage';
import { System as SystemPage, Profile } from './pages';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    flex: 1,
    height: '100%',
    width: '85%',
    padding: theme.spacing(3)
  },
  toolBar: {
    marginTop: 50
    // padding: theme.spacing(0, 1),
    // ...theme.mixins.toolbar
  },
  btn_delete: {
    backgroundColor: theme.palette.error.dark,
    '&:hover': {
      background: theme.palette.error.dark,
    }
  },
  typo_delete: {
    color: colors.white,
    fontSize: 13
  },
  snack_bar: {
    minWidth: 500,
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const {
    show_prompt_dialog = false,
    delete_item,
  } = useSelector(state => state.component)

  const tab = useSelector(state => state.tabbar);

  /**
   * close prompt dialog
   */
  const close_prompt = () => dispatch(close_prompt_dialog())
  /**
   * function
   */
  const handle_click_delete = async () => {
    try {
      await delete_item.delete('1')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (GET_STORED_ACCESS_TOKEN)
      dispatch(action_GetPermission());
  }, [dispatch])

  if (!GET_STORED_ACCESS_TOKEN)
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path="/sign-in" component={Signin} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/verify-opt-code" component={OTPinput} />
          <Route exact path="/reset-password" component={ResetPassword} />
          {/* <Route exact path="/" component={ForgetPassword} /> */}
          <Route component={Signin} />
        </Switch>
      </div>
    )




  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolBar}>
          {/* <AppTabBar /> */}
          {
            (Array.isArray(tab) && tab.length > 0) &&
            <TabbarView tabs={tab} />
          }
          <Switch>
            {/** System */}
            <Route exact path="/role-management" component={System.Roles} />
            <Route exact path="/user-management" component={System.UserList} />

            {/** Update Role */}
            <Route exact path="/update-role" component={SystemPage.UpdateRole} />

            {/** Profile */}
            <Route exact path="/profile" component={Profile} />
          </Switch>

        </div>
      </main>

      {/**
			 * prompt to delete
			 */}
      <Dialog
        open={show_prompt_dialog}
        onClose={close_prompt}
        aria-labelledby="prompt-to-delete"
        maxWidth="sm"
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogTitle id="prompt-to-delete">
          Are you sure want to delete ?
        </DialogTitle>
        <DialogContent>
          {
            delete_item?.name
          }
        </DialogContent>
        <DialogActions>
          <AppButton
            variant={ButtonType.variant.contained}
            color={ButtonType.color.secondary}
            onClick={close_prompt}
          >
            cancel
          </AppButton>
          <AppButton
            variant={ButtonType.variant.contained}
            className={classes.btn_delete}
            onClick={handle_click_delete}
          >
            <Typography className={classes.typo_delete}>
              delete
            </Typography>
          </AppButton>
        </DialogActions>
      </Dialog>
      <AppSnackBar
        className={classes.snack_bar}
      />
      <AppLoading />
    </div>
  )
}