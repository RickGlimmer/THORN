þ.plugin.add({
    ACTIONS: function (þelem) {
        "use strict";
        var info = {
            //Your info here! :)
            author: "TZ Advantage Ltd.",
            version: "0.1",
            date: "2015-02-04 09:00+07:00",

            //Internal data for future plugin management
            data: (function () { þelem.dataset.pluginGuid = þ.guid(); return þelem.dataset; }()),
            þelem: þelem
        };

        var CONSTANTS = Object.freeze({ FINISHED: 1, ABORT: 2, CONTINUE: 3 });

        return (function (þorn) {
            var i, j, key, eventName, eventActions, action, parts, params;
            var _Actions = [];

            function executeAction() {
                var nextAction = null;
                if (window._actions) {
                    nextAction = window._actions.shift();
                }
                if (!nextAction) {
                    delete window._actions;
                    return;
                }

                var actionResult = CONSTANTS.ACTIONS.CONTINUE;
                if (action) {
                    if (actionResult === CONSTANTS.ACTIONS.CONTINUE) {
                        switch (action.command) {
                            case "CONFIRM":
                                var answer = window.confirm(action.params[0]);
                                if (!answer) {
                                    actionResult = CONSTANTS.ACTIONS.FINISHED;
                                    action.abort = CONSTANTS.ACTIONS.ABORT;
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

                if (window._actions) {
                    if (window._actions.length > 0) {
                        if (action.abort === CONSTANTS.ACTIONS.ABORT) {
                            delete window._actions;
                        } else if (!action.executeWait) {
                            window.setTimeout(executeAction, 10);
                        }
                    } else {
                        delete window._actions;
                    }
                }
            }

            function actionEventHandler(e) {
                switch (e.type) {
                    case 'click':
                        þorn.style({ backgroundColor: 'orange' });
                        break;
                    case 'mouseenter':
                        þorn.style({ backgroundColor: 'blue' });
                        break;
                    case 'mouseleave':
                        þorn.style({ backgroundColor: 'white' });
                        break;
                }
            }

            for (key in þorn.dataset) {
                if (þorn.dataset.hasOwnProperty(key)) {
                    if (key.indexOf('ev') === 0) {
                        //Found 'event' 
                        //plugin: "ACTIONS", evClick: "hide();", evMouseover: "hide();"
                        eventName = key.slice(2).toLowerCase();
                        _Actions[eventName] = [];
                        eventActions = þorn.dataset[key].split(');');

                        for (i = 0; i < eventActions.length - 1; i++) {
                            parts = eventActions[i].split("(");
                            params = parts[1] === "" ? [] : parts[1].slice(1).split('","');
                            action = Object.create({
                                þtarget: þorn,
                                command: parts[0].toLowerCase(),
                                params: [],
                                data: þorn.dataset,
                                //overLoadCommands: overLoadCommands,
                                //callBackFunction: callBackFunction,
                                executeAction: executeAction,
                                executeWait: false,
                                abort: false
                            });
                            for (j = 0; j < params.length; j++) {
                                action.params.push((j + 1 === params.length) ? params[j].slice(0, -1) : params[j]);
                            }
                            _Actions[eventName].push(action);
                        }

                        þorn.bind(eventName, actionEventHandler);
                    }
                }
            }
            return info;
        }(þelem));
    }
});
