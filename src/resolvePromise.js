function resolvePromise(promiseToResolve, promiseState){
    if (!promiseToResolve) return;
	promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;

    function saveDataACB(result){ 
        if(promiseState.promise !== promiseToResolve) return;
        promiseState.data=result;
    } 
    function saveErrorACB(err)  { 
        if(promiseState.promise !== promiseToResolve) return;
        promiseState.error=err;
    }
    if (promiseToResolve !== null) {
        promiseToResolve.then(saveDataACB).catch(saveErrorACB);
        // console.log(promiseState.data)
    }
    
}

export default resolvePromise;