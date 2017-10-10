import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import ToastUtil from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_LIST} from "../constants/Urls";
import { fetchArticleList, receiveArticleList } from "../actions/read";


export function* requestArticleList (
    isRefreshing,
    loading,
    typeId,
    isLoadMore,
    page
) {
    try{
        //yield 指令可以很简单的将异步控制流以同步的写法表现出来
        /**
         * put 就是我们所说的一个调用 Effect 的例子。
         * Effect 是一些简单 Javascript 对象，对象包含了要被 middleware 执行的指令。
         * 当 middleware 拿到一个被 Saga yield 后的 Effect，它会暂停 Saga，直到 Effect 执行完成，然后 Saga 会再次被恢复。
         */
        yield put(fetchArticleList(isRefreshing, loading, isLoadMore));
        //call执行第一个参数方法， 返回一个指示 middleware 以给定参数调用给定的函数的 Effect
        const articleList = yield call(
            request,
            `${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`,
            'get'
        );
        yield put(
            receiveArticleList(
                articleList.showapi_res_body.pagebean.contentlist,
                typeId
            )
        );
        const errorMessage = articleList.showapi_res_error;
        if(errorMessage&&errorMessage!==''){
            yield ToastUtil.showShort(errorMessage);
        }
    }catch (error){
        yield put(receiveArticleList([],typeId));
        ToastUtil.showShort('网络发生错误，请重试');
    }
}

export function* watchRequestArticleList() {
    while(true){
        //take是阻塞状态，也就是实现执行take时候，无法向下继续执行
        const { isRefreshing, loading, typeId, isLoadMore, page } = yield take(
            types.REQUEST_ARTICLE_LIST
        );
        //fork是非阻塞的，同样可以使用cancel取消一个fork 任务
        yield fork(
            requestArticleList,
            isRefreshing,
            loading,
            typeId,
            isLoadMore,
            page
        );
    }
}
