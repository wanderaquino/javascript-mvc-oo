class ProxyFactory {
    static createProxy (targetObject, props, handleUpdateModel) {
        return new Proxy(targetObject, {
            get: function(target,prop) {
                if(props.includes(prop)) {
                    return function(model = undefined) {
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
            },
            set: function (target, prop, value) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    handleUpdateModel(value);
                    return value;
                }
            }
        });
    }
 }