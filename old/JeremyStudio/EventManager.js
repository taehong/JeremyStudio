JeremyStudio.EventManager = {
    init: function () {
        console.log('Init: JeremyStudio.EventManager');
        this.type = 'EventManager';
        this.events = {};
    },
    setEvent: function (name, sender, event, callback) {
        this.events[name] = {
            sender: sender,
            event: event,
            callback: callback
        };
    },
    getEvent: function (name) {
        var eventObj = this.events[name];
        if (eventObj) {
            return eventObj;
        } else {
            throw new Error('getEvent : Undefined Event');
        }
    },
    bindEvent: function (name) {
        var eventObj = this.getEvent(name);
        if (eventObj) {
            $(eventObj.sender).bind(eventObj.event, eventObj.callback);
        } else {
            throw new Error('bindEvent : Undefined Event');
        }
    },
    unbindEvent: function (name) {
        var eventObj = this.getEvent(name);
        if (eventObj) {
            $(eventObj.sender).unbind(eventObj.event, eventObj.callback);
        } else {
            throw new Error('unbindEvent : Undefined Event');
        }
    }
};