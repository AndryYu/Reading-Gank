import * as types from '../constants/ActionTypes'

export function requestGankdayList(
    isRefreshing,
    loading,
    typeId,
    isLoadMore,
    page = 1
) {
    return {
        type:types.REQUEST_GANKDAY_LIST,
        isRefreshing,
        isLoading,
        isLoadMore,
        typeId,
        page
    };
}

export function fetchGankdayList(
    isRefreshing,
    loading,
    isLoadMore = false
) {
    return {
        type:types.FETCH_GANKDAY_LIST,
        isRefreshing,
        loading,
        isLoadMore
    }
}

export function receiveGankdayList(
    articleList,
    typeId
) {
    return{
        type:types.RECEIVE_GANKDAY_LIST,
        articleList,
        typeId
    }
}