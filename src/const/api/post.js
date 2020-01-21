const pageroot = `${process.env.REACT_APP_HOST_URL}/posts`

export default {
    CREATE: pageroot ,
    UPDATE: id => `${pageroot}/${id}` , 
    FETCH: pageroot ,
    DETAIL: id => `${pageroot}/${id}` , 
    DELETE: id => `${pageroot}/${id}` , 
}