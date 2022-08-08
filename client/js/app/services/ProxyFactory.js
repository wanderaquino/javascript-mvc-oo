class ProxyFactory {
    static createProxy (targetObject, props, handleUpdateModel) {
        return new Proxy(targetObject, {
            get: function(target,prop) {
                // if([""].includes(prop)) {
                //     console.log("Intercepted by if: ", prop)
                //     return function() {
                //         return target[prop]();
                //     }
                // }

                if(props.includes(prop)) {
                    return function(handleUpdateModel, negotiation = undefined) {
                        console.log("Intercepted by: ", prop);
                        if(prop === "totalNegotiations") {
                            return target[prop]();
                        }
                        
                        if(negotiation || prop === "releaseNegotiations") {
                            target[prop](negotiation || null);
                            handleUpdateModel(target);
                            return
                        }

                        return target[prop];
                    };
                }
                console.log("Intercepted by out of if: ", prop)

                return target[prop];
            }
        });
    }
}