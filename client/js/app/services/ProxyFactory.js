class ProxyFactory {
    static createProxy (targetObject, props, handleUpdateModel) {
        return new Proxy(targetObject, {
            get: function(target,prop) {
                if(props.includes(prop)) {
                    return function(handleUpdateModel, model = undefined) {
                        if(typeof target[prop] === typeof Function) {
                            console.log("Intercepted by method: ", prop);
                            target[prop](model || null);
                            handleUpdateModel(target);
                            return
                        }
                        return target[prop];
                    };
                }
                console.log("Intercepted by property: ", prop);

                return target[prop];
            }
        });
    }
}