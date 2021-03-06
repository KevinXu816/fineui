/**
 * 有总页数和总行数的分页控件
 * Created by Young's on 2016/10/13.
 */
BI.AllCountPager = BI.inherit(BI.Widget, {

    _defaultConfig: function () {
        return BI.extend(BI.AllCountPager.superclass._defaultConfig.apply(this, arguments), {
            extraCls: "bi-all-count-pager",
            pagerDirection: "vertical", // 翻页按钮方向，可选值：vertical/horizontal
            height: 24,
            pages: 1, // 必选项
            curr: 1, // 初始化当前页， pages为数字时可用，
            count: 1 // 总行数
        });
    },
    _init: function () {
        BI.AllCountPager.superclass._init.apply(this, arguments);
        var self = this, o = this.options, pagerIconCls = this._getPagerIconCls();
        this.editor = BI.createWidget({
            type: "bi.small_text_editor",
            cls: "pager-editor bi-border-radius",
            validationChecker: function (v) {
                return (self.rowCount.getValue() === 0 && v === "0") || BI.isPositiveInteger(v);
            },
            hgap: 4,
            vgap: 0,
            value: o.curr,
            errorText: BI.i18nText("BI-Please_Input_Positive_Integer"),
            width: 40,
            height: 24,
            invisible: o.pages <= 1
        });

        this.pager = BI.createWidget({
            type: "bi.pager",
            width: 58,
            layouts: [{
                type: "bi.horizontal",
                lgap: 5
            }],

            dynamicShow: false,
            pages: o.pages,
            curr: o.curr,
            groups: 0,

            first: false,
            last: false,
            prev: {
                type: "bi.icon_button",
                value: "prev",
                title: BI.i18nText("BI-Previous_Page"),
                warningTitle: BI.i18nText("BI-Current_Is_First_Page"),
                height: 22,
                width: 22,
                cls: "bi-border bi-border-radius all-pager-prev bi-list-item-select2 " + pagerIconCls.preCls
            },
            next: {
                type: "bi.icon_button",
                value: "next",
                title: BI.i18nText("BI-Next_Page"),
                warningTitle: BI.i18nText("BI-Current_Is_Last_Page"),
                height: 22,
                width: 22,
                cls: "bi-border bi-border-radius all-pager-next bi-list-item-select2 " + pagerIconCls.nextCls
            },

            hasPrev: o.hasPrev,
            hasNext: o.hasNext,
            firstPage: o.firstPage,
            lastPage: o.lastPage,
            invisible: o.pages <= 1
        });

        this.editor.on(BI.TextEditor.EVENT_CONFIRM, function () {
            self.pager.setValue(BI.parseInt(self.editor.getValue()));
            self.fireEvent(BI.AllCountPager.EVENT_CHANGE);
        });
        this.pager.on(BI.Pager.EVENT_CHANGE, function () {
            self.fireEvent(BI.AllCountPager.EVENT_CHANGE);
        });
        this.pager.on(BI.Pager.EVENT_AFTER_POPULATE, function () {
            self.editor.setValue(self.pager.getCurrentPage());
        });

        this.allPages = BI.createWidget({
            type: "bi.label",
            title: o.pages,
            text: "/" + o.pages,
            lgap: 5,
            invisible: o.pages <= 1
        });

        this.rowCount = BI.createWidget({
            type: "bi.label",
            cls: "row-count",
            height: o.height,
            hgap: 5,
            text: o.count,
            title: o.count
        });

        var count = BI.createWidget({
            type: "bi.left",
            height: o.height,
            scrollable: false,
            items: [{
                type: "bi.label",
                height: o.height,
                text: BI.i18nText("BI-Basic_Total"),
                width: 15
            }, this.rowCount, {
                type: "bi.label",
                height: o.height,
                text: BI.i18nText("BI-Tiao_Data"),
                width: 50,
                textAlign: "left"
            }]
        });
        BI.createWidget({
            type: "bi.left_right_vertical_adapt",
            element: this,
            items: {
                left: [count],
                right: [this.editor, this.allPages, this.pager]
            }
        });
    },

    alwaysShowPager: true,

    _getPagerIconCls: function () {
        var o = this.options;
        switch (o.pagerDirection) {
            case "horizontal":
                return {
                    preCls: "row-pre-page-h-font ",
                    nextCls: "row-next-page-h-font "
                };
            case "vertical":
            default:
                return {
                    preCls: "column-pre-page-h-font ",
                    nextCls: "column-next-page-h-font "
                };
        }
    },

    setAllPages: function (v) {
        this.allPages.setText("/" + v);
        this.allPages.setTitle(v);
        this.options.pages = v;
        this.pager.setAllPages(v);
        this.editor.setEnable(v >= 1);
        this.setPagerVisible(v > 1);
    },

    setValue: function (v) {
        this.pager.setValue(v);
    },

    setVPage: function (v) {
        this.pager.setValue(v);
    },

    setCount: function (count) {
        this.rowCount.setText(count);
        this.rowCount.setTitle(count);
    },

    getCurrentPage: function () {
        return this.pager.getCurrentPage();
    },

    hasPrev: function () {
        return this.pager.hasPrev();
    },

    hasNext: function () {
        return this.pager.hasNext();
    },

    setPagerVisible: function (b) {
        this.editor.setVisible(b);
        this.allPages.setVisible(b);
        this.pager.setVisible(b);
    },

    populate: function () {
        this.pager.populate();
        this.setPagerVisible(this.options.pages > 1);
    }
});
BI.AllCountPager.EVENT_CHANGE = "EVENT_CHANGE";
BI.shortcut("bi.all_count_pager", BI.AllCountPager);