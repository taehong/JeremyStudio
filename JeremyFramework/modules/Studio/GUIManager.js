/**
 * @author Administrator
 */
var __GUIManager = {
    init : function() {
        console.log('Init: JeremyStudio.GUIManager');
        __GUIManager.type = 'GUIManager';
        __GUIManager.views = {};
    },
    create : function(type, argo) {
        var creator = __GUIManager['create' + type];
        return creator(argo);
    },
    createButton : function(argo) {
        var btn = J('LIB')('Button')(argo);
        __GUIManager.addView(btn);
        return btn;
    },
    addView : function(view) {
        __GUIManager.views[view.name] = view;
    },
    getView : function(aabbID) {
        var viewName, views = __GUIManager.views, view;
        for (viewName in views) {
            view = views[viewName];
            if (view.collider == aabbID) {
                return view;
            }
        }
    }
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
    if (target) {
        target.addModule('GUIManager', __GUIManager);
        target.addInterface('GUI', {
            create : __GUIManager.create,
            get : __GUIManager.getView
        });
    }
})();
