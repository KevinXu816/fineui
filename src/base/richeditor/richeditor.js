/**
 * 富文本编辑器
 *
 * Created by GUY on 2017/9/15.
 * @class BI.RichEditor
 * @extends BI.Widget
 */
BI.RichEditor = BI.inherit(BI.Widget, {
    _defaultConfig: function () {
        return BI.extend(BI.RichEditor.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-rich-editor bi-card"
        });
    },
    _init: function () {
        BI.RichEditor.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        this.editor = BI.createWidget({
            type: "bi.nic_editor",
            width: o.width,
            height: o.height
        });

        this.editor.on(BI.NicEditor.EVENT_BLUR, function () {
            self.fireEvent(BI.RichEditor.EVENT_CONFIRM);
        });

        this.toolbar = BI.createWidget({
            type: "bi.text_toolbar",
            editor: this.editor
        });

        this.toolbar.on(BI.TextToolbar.EVENT_CHANGE, function () {
            var style = this.getValue();
        });

        this.combo = BI.createWidget({
            type: "bi.combo",
            element: this,
            toggle: false,
            direction: "top",
            isNeedAdjustWidth: false,
            isNeedAdjustHeight: false,
            adjustLength: 1,
            el: this.editor,
            popup: {
                el: this.toolbar,
                height: 30,
                stopEvent: true
            }
        });

        this.combo.on(BI.Combo.EVENT_AFTER_HIDEVIEW, function () {
        });
    },

    setValue: function (v) {
        this.editor.setValue(v);
    },

    getValue: function () {
        return this.editor.getValue();
    }
});
BI.RichEditor.EVENT_CONFIRM = "EVENT_CONFIRM";
BI.shortcut('bi.rich_editor', BI.RichEditor);