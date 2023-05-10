export default promiseNoData;

function promiseNoData(promiseState) {
    if(!promiseState.promise || promiseState.promise===undefined) {
        return (
            <div>No Data</div>
        );
    }
    if(promiseState.promise && !promiseState.data && !promiseState.error) {
        return (
            <img src="https://cdn.shopify.com/s/files/1/0611/9509/2191/t/2/assets/loading.gif?v=157493769327766696621636595199" class="promiseStateLoading"/>
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