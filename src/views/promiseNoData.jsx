export default promiseNoData;

function promiseNoData(promiseState) {
    if(!promiseState.promise || promiseState.promise===undefined) {
        return (
            <div>No Data</div>
        );
    }
    if(promiseState.promise && !promiseState.data && !promiseState.error) {
        return (
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" class="promiseStateLoading"/>
        );
    }
    if(promiseState.promise && !promiseState.data && promiseState.error) {
        return (
            <div class="promiseStateError">{promiseState.error.toString()}</div>
        );
    }
    if(promiseState.promise && promiseState.data && !promiseState.error) {
        return false;
    }
}