/**
 * 简单的复选下拉树控件, 适用于数据量少的情况
 *
 * Created by GUY on 2015/10/29.
 * @class BI.TreeValueChooserCombo
 * @extends BI.Widget
 */
BI.TreeValueChooserCombo = BI.inherit(BI.AbstractTreeValueChooser, {

    _defaultConfig: function () {
        return BI.extend(BI.TreeValueChooserCombo.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-tree-value-chooser-combo",
            width: 200,
            height: 24,
            items: null,
            itemsCreator: BI.emptyFn
        });
    },

    _init: function () {
        BI.TreeValueChooserCombo.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        if (BI.isNotNull(o.items)) {
            this._initData(o.items);
        }
        this.combo = BI.createWidget({
            type: "bi.multi_tree_combo",
            text: o.text,
            allowEdit: o.allowEdit,
            value: o.value,
            watermark: o.watermark,
            element: this,
            itemsCreator: BI.bind(this._itemsCreator, this),
            valueFormatter: BI.bind(this._valueFormatter, this),
            width: o.width,
            height: o.height,
            listeners: [{
                eventName: BI.MultiTreeCombo.EVENT_FOCUS,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_FOCUS);
                }
            }, {
                eventName: BI.MultiTreeCombo.EVENT_BLUR,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_BLUR);
                }
            }, {
                eventName: BI.MultiTreeCombo.EVENT_STOP,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_STOP);
                }
            }, {
                eventName: BI.MultiTreeCombo.EVENT_CLICK_ITEM,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_CLICK_ITEM);
                }
            }, {
                eventName: BI.MultiTreeCombo.EVENT_SEARCHING,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_SEARCHING);
                }
            }, {
                eventName: BI.MultiTreeCombo.EVENT_CONFIRM,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_CONFIRM);
                }
            }, {
                eventName: BI.MultiTreeCombo.EVENT_BEFORE_POPUPVIEW,
                action: function () {
                    self.fireEvent(BI.TreeValueChooserCombo.EVENT_BEFORE_POPUPVIEW);
                }
            }]
        });
    },

    setValue: function (v) {
        this.combo.setValue(v);
    },

    getValue: function () {
        return this.combo.getValue();
    },

    populate: function (items) {
        this._initData(items);
        this.combo.populate.apply(this.combo, arguments);
    }
});

BI.TreeValueChooserCombo.EVENT_BEFORE_POPUPVIEW = "EVENT_BEFORE_POPUPVIEW";
BI.TreeValueChooserCombo.EVENT_CONFIRM = "EVENT_CONFIRM";
BI.TreeValueChooserCombo.EVENT_FOCUS = "EVENT_FOCUS";
BI.TreeValueChooserCombo.EVENT_BLUR = "EVENT_BLUR";
BI.TreeValueChooserCombo.EVENT_STOP = "EVENT_STOP";
BI.TreeValueChooserCombo.EVENT_CLICK_ITEM = "EVENT_CLICK_ITEM";
BI.TreeValueChooserCombo.EVENT_SEARCHING = "EVENT_SEARCHING";
BI.shortcut("bi.tree_value_chooser_combo", BI.TreeValueChooserCombo);