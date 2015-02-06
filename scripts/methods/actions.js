//TODO add support for constants to THORN and make them easy to access
//Untested!!
þ.extend('CONSTANTS', {
    ACTIONS: (function () {
        var o = Object.create({ DONE: true, FINISHED: true, ABORT: true, CONTINUE: false});
        return o;//Object.freeze(o);
    }())
});
/* THORN actions extension */
/*
þ.extend('CHAINABLEMETHODS', {
    actions: function (eventtype, overload, callBack) {
        return this.bind(eventtype, function () {
            this.each(function () {
                var elem = this.nodes[0];
                var þtarget = þ(elem);
                var result = [];
                var overLoadCommands = "";
                var callBackFunction = null;
                if (typeof overload == "function") {
                    callBackFunction = overload;
                }
                else if (overload) {
                    overLoadCommands = " " + overload + " ";
                    callBackFunction = callBack;
                }
                var attrvalue = þtarget.attr("data-action");
                var actions = attrvalue ? attrvalue.split(');') : [];
                for (var i = 0; i < actions.length - 1; i++) {
                    var parts = actions[i].split("(");
                    var command = parts[0];
                    var params = parts[1] == "" ? [] : parts[1].substring(1).split('","');
                    var action = {
                        þtarget: þtarget,
                        command: command,
                        params: [],
                        data: null,
                        overLoadCommands: overLoadCommands,
                        callBackFunction: callBackFunction,
                        executeAction: executeAction,
                        executeWait: false,
                        abort: false
                    };
                    for (var j = 0; j < params.length; j++) {
                        action.params.push((j + 1 == params.length) ? params[j].slice(0, -1) : params[j]);
                    }
                    action.data = null;
                    for (var k = 0; k < elem.attributes.length; k++) {
                        var attr = elem.attributes[k];
                        if (attr.name.indexOf("data-") >= 0 && attr.name != "data-action") {
                            if (action.data == null)
                                action.data = {};
                            action.data[attr.name.substring(5)] = attr.value;
                        }
                    }
                    result.push(action);
                }

                //If there are some actions queued
                //place these new actions in front of the queue
                //to make sure that actions that are started through actions
                //get processed first to ensure the right sequence of execution
                //of actions
                if (window._actions) {
                    var r = result.pop();
                    while (r) {
                        window._actions.unshift(r);
                        r = result.pop();
                    }
                }
                else {
                    window._actions = result;
                }

                window.setTimeout(executeAction, 10);
            });
        });

        function executeAction() {
            var action = null;
            if (window._actions) {
                action = window._actions.shift();
            }
            if (!action) {
                delete window._actions;
                return;
            }
            var actionResult = þ.ACTIONS.CONTINUE;
            var overloaded = action.overLoadCommands.indexOf(" " + action.command + " ") >= 0;
            if (action) {
                if (overloaded && action.callBackFunction)
                    actionResult = action.callBackFunction("before", action) || þ.ACTIONS.CONTINUE;
                if (actionResult == þ.ACTIONS.CONTINUE) {
                    if (overloaded && action.callBackFunction)
                        actionResult = action.callBackFunction("execute", action) || þ.ACTIONS.CONTINUE;
                    if (actionResult == þ.ACTIONS.CONTINUE) {
                        switch (action.command) {
                            case "CONFIRM":
                                var answer = window.confirm(action.params[0]);
                                if (!answer) {
                                    actionResult = þ.ACTIONS.FINISHED;
                                    action.abort = þ.ACTIONS.ABORT;
                                }
                                break;
                            case "SHOW":
                                þ(action.params[0]).show();
                                break;
                            case "HIDE":
                                þ(action.params[0]).hide();
                                break;
                        }
                    }
                }
                if (actionResult == þ.ACTIONS.CONTINUE) {
                    if (overloaded && action.callBackFunction) {
                        action.callBackFunction("after", action);
                    }
                }

            }

            if (window._actions) {
                if (window._actions.length > 0) {
                    if (action.abort == þ.ACTIONS.ABORT) {
                        delete window._actions;
                    }
                    else if (!action.executeWait) {
                        window.setTimeout(executeAction, 10);
                    }
                }
                else {
                    delete window._actions;
                }
            }
        }
    }

});
*/