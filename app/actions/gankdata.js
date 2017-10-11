import * as types from '../constants/ActionTypes'

export function requestGankdataList(
    isRefreshing,
    loading,
    typeId,
    isLoadMore,
    page = 1
) {
    return {
        type:types.REQUEST_GANKDATA_LIST,
        isRefreshing,
        loading,
        isLoadMore,
        typeId,
        page
    };
}

export function fetchGankdataList(
    isRefreshing,
    loading,
    isLoadMore = false
) {
    return {
        type:types.FETCH_GANKDATA_LIST,
        isRefreshing,
        loading,
        isLoadMore
    }
}

export function receiveGankdataList(
    articleList,
    typeId
) {
    return{
        type:types.RECEIVE_GANKDATA_LIST,
        articleList,
        typeId
    }
}