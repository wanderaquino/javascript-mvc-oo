class Bind {
    constructor(model, view, parameters) {
        const proxy = ProxyFactory.createProxy(model, parameters, model => view.update(model));

        view.update(model);
        
        return proxy;
    }
}