export const COMPONNET_TYPE = {
    TOGGLE_MENU: "TOGGLE_MENU",

    TOGGLE_LOADING_PROGRESS: "TOGGLE_LOADING_PROGRESS",

    SET_OPEN_DIALOG: "SET_OPEN_DIALOG",

    SET_CLOSE_DIALOG: "SET_CLOSE_DIALOG",

    SET_TEMP_DATA: "SET_TEMP_DATA",

    CLAER_TEMP_DATA: "CLAER_TEMP_DATA",

    SET_OPEN_QUOTATION_DIALOG: "SET_OPEN_QUOTATION_DIALOG",

    SET_CLOSE_QUOTATION_DIALOG: "SET_CLOSE_QUOTATION_DIALOG",

    OPEN_TABLE_DIALOG: "OPEN_TABLE_DIALOG",

    CLOSE_TALBE_DIALOG: "CLOSE_TALBE_DIALOG",

    /**
     * create or update quotation rules
     * 
     * TODO - tsa - later better using only one type and set the payload in action
     * eg: 
     *  type : quotation_rule
     *  open () => {type , true}
     *  close () => {type , false}
     */
    OPEN_QUOTATION_RULE: "OPEN_QUOTATION_RULE",

    CLOSE_QUOTATION_RULE: "CLOSE_QUOTATION_RULE",

    /**
     * prompt or confirmation for deleteoperation
     */
    SET_DELETE_PROMPT: "SET_DELETE_PROMPT",

    SET_ITEM_TO_DELETE: "SET_ITEM_TO_DELETE",

    /**
     * snack bar content
     * mean : showing alert with type respectively
     */
    SET_SNACK_BAR_CONTENT: "SET_SNACK_BAR_CONTENT",

    /**
     * alert bar content
     * showing alert box < info, error, warning, error >
     */
    SET_ALERT_BOX_CONTENT: "SET_ALERT_BOX_CONTENT",

    /**
     * app loading
     */
    SET_LOADING: "SET_LOADING"

}

export const initialState = {
    showmenu: true,
    showdialog: false,

    temp_data: null,

    loading_progress: false,

    /**
     * quotation interval
     */
    show_quotation_dialog: false,
    show_quotation_rule_dialog: false,

    /**
     * table dialog content
     */
    show_table_dialog: false,

    /**
     * prompt to delete
     */
    show_prompt_dialog: false,
    delete_item: null,

    /**
     * snack bar message 
     * message , type
     */
    snack_bar_content: null,

    /**
     * alert box 
     * message, severity
     */
    alert_box_content: null,

    /**
     * loading
     */
    loading: false

}

/**
 * @param
 * Reducer
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPONNET_TYPE.TOGGLE_MENU:
            return {
                ..._getCommonState(state),
                showmenu: !state.showmenu
            }
        case COMPONNET_TYPE.TOGGLE_LOADING_PROGRESS:
            return {
                ..._getCommonState(state),
                loading_progress: action.payload
            }
        case COMPONNET_TYPE.SET_OPEN_DIALOG:
            return {
                ..._getCommonState(state),
                showdialog: true
            }
        case COMPONNET_TYPE.SET_CLOSE_DIALOG:
            return {
                ..._getCommonState(state)
            }
        case COMPONNET_TYPE.OPEN_TABLE_DIALOG:
            return {
                ..._getCommonState(state),
                show_table_dialog: true,
                temp_data: action.payload
            }
        case COMPONNET_TYPE.CLOSE_TALBE_DIALOG:
            return {
                ..._getCommonState(state),
                temp_data: null
            }
        case COMPONNET_TYPE.SET_TEMP_DATA:
            if (action.showdialog)
                return {
                    ..._getCommonState(state),
                    temp_data: action.payload,
                    showdialog: action.showdialog
                }
            return {
                ..._getCommonState(state),
                temp_data: action.payload,
            }

        case COMPONNET_TYPE.CLAER_TEMP_DATA: {
            return {
                ..._getCommonState(state),
                temp_data: null
            }
        }
        case COMPONNET_TYPE.SET_OPEN_QUOTATION_DIALOG:
            return {
                ..._getCommonState(state),
                show_quotation_dialog: true
            }
        case COMPONNET_TYPE.SET_CLOSE_QUOTATION_DIALOG:
            return {
                ..._getCommonState(state),
                show_quotation_dialog: false
            }
        case COMPONNET_TYPE.OPEN_QUOTATION_RULE:
            return {
                ..._getCommonState(state),
                show_quotation_rule_dialog: true
            }
        case COMPONNET_TYPE.CLOSE_QUOTATION_RULE:
            return {
                ..._getCommonState(state),
                show_quotation_rule_dialog: false
            }
        case COMPONNET_TYPE.SET_DELETE_PROMPT:
            return {
                ..._getCommonState(state),
                show_prompt_dialog: action.payload
            }
        case COMPONNET_TYPE.SET_ITEM_TO_DELETE:
            return {
                ..._getCommonState(state),
                delete_item: action.payload
            }
        case COMPONNET_TYPE.SET_SNACK_BAR_CONTENT:
            return {
                ..._getCommonState(state),
                snack_bar_content: action.payload
            }
        case COMPONNET_TYPE.SET_ALERT_BOX_CONTENT:
            return {
                ..._getCommonState(state),
                alert_box_content: action.payload
            }
        case COMPONNET_TYPE.SET_LOADING:
            return {
                ..._getCommonState(state),
                loading: action.payload
            }
        default:
            return state;
    }
}

const _getCommonState = (state) => ({
    ...state,
    showdialog: false,
    show_table_dialog: false
})

/**
 * action
 */

export const Toggle_Menu = () => ({
    type: COMPONNET_TYPE.TOGGLE_MENU
})

export const start_progress_loading = () => ({
    type: COMPONNET_TYPE.TOGGLE_LOADING_PROGRESS,
    payload: true
})

export const stop_progress_loading = () => ({
    type: COMPONNET_TYPE.TOGGLE_LOADING_PROGRESS,
    payload: false
})

export const open_dialog = () => ({
    type: COMPONNET_TYPE.SET_OPEN_DIALOG
})

export const close_dialog = () => ({
    type: COMPONNET_TYPE.SET_CLOSE_DIALOG
})

export const open_table_dialog = (data = {}) => ({
    type: COMPONNET_TYPE.OPEN_TABLE_DIALOG,
    payload: data
})

export const close_table_dialog = () => ({
    type: COMPONNET_TYPE.CLOSE_TALBE_DIALOG
})

export const set_temp_data = (data, showdialog = false) => ({
    type: COMPONNET_TYPE.SET_TEMP_DATA,
    payload: data,
    showdialog
})

export const clear_temp_data = () => ({
    type: COMPONNET_TYPE.CLAER_TEMP_DATA
})

export const open_quotation_dialog = () => ({
    type: COMPONNET_TYPE.SET_OPEN_QUOTATION_DIALOG
})

export const close_quotation_dialog = () => ({
    type: COMPONNET_TYPE.SET_CLOSE_QUOTATION_DIALOG
})

export const open_quotation_rule = () => ({
    type: COMPONNET_TYPE.OPEN_QUOTATION_RULE,
})

export const close_quotation_rule = () => ({
    type: COMPONNET_TYPE.CLOSE_QUOTATION_RULE
})

export const open_prompt_dialog = () => ({
    type: COMPONNET_TYPE.SET_DELETE_PROMPT,
    payload: true
})

export const close_prompt_dialog = () => ({
    type: COMPONNET_TYPE.SET_DELETE_PROMPT,
    payload: false
})

export const set_delete_item = (data = {}) => ({
    type: COMPONNET_TYPE.SET_ITEM_TO_DELETE,
    payload: data
})

/**
 * 
 * @param {*} content 
 * {
 *  message,
 *  type
 * }
 */
export const set_snack_bar_content = (content = null) => ({
    type: COMPONNET_TYPE.SET_SNACK_BAR_CONTENT,
    payload: content
})

/**
 * 
 * @param {*} content 
 * {severity,message}
 */
export const set_alert_box_content = (content = null) => ({
    type: COMPONNET_TYPE.SET_ALERT_BOX_CONTENT,
    payload: content
})

/**
 * loading
 */
export const start_component_loading = () => ({
    type: COMPONNET_TYPE.SET_LOADING,
    payload: true
})

export const stop_component_loading = () => ({
    type: COMPONNET_TYPE.SET_LOADING,
    payload: false
});

export default Reducer;