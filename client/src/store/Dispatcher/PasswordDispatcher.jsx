export const setAuthDispatcher =({dispatch,auth})=>{
        return (
            dispatch({
                type:'SET_AUTH',
                payload:auth
            })
        )
}
export const setNameDispatcher =({dispatch,name})=>{
    return (
        dispatch({
            type:'SET_NAME',
            payload:name
        })
    )
}

export const setEmailDispatcher =({dispatch,email})=>{
    return (
        dispatch({
            type:'SET_EMAIL',
            payload:email
        })
    )
}
export const setPasswordsDispatcher =({dispatch,passwords})=>{
    // console.log("in dipsa password ",passwords);
    
    return (
        dispatch({
            type:'SET_PASSWORDS',
            payload:passwords
        })
    )
}
export const deleteAPasswordDispatcher =({dispatch,id})=>{
    return (
        dispatch({
            type:'DEL_PASS',
            payload:id
        })
    )
}
