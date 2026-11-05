/*
  作者：孙绍词
  建立时间：2026-11-02
  使用模型：GLM-5.3-Flash
  功能名称：可复用 Tab 选项卡组件（js/ssc_tab.js）
  功能简介：以外部引用方式为任意页面提供选项卡切换能力。
            通过 ssc_initTabs(config) 初始化：为选项卡按钮添加
            click 事件监听，点击时先调用 ssc_clearActive 清除
            所有选项卡的选中状态，再为当前元素及对应内容面板
            添加选中类。同一页面可传入不同 config 复用多组选项卡。
*/

/**
 * 作者：孙绍词
 * 建立时间：2026-11-02
 * 使用模型：GLM-5.3-Flash
 * 函数名称：ssc_clearActive
 * 功能简介：清除一组元素的选中状态——遍历元素列表，
 *           逐个移除指定的激活类名（ssc_className）
 */
function ssc_clearActive(ssc_elements, ssc_className) {
    for (var ssc_i = 0; ssc_i < ssc_elements.length; ssc_i++) {
        ssc_elements[ssc_i].classList.remove(ssc_className);
    }
}

/**
 * 作者：孙绍词
 * 建立时间：2026-11-02
 * 使用模型：GLM-5.3-Flash
 * 函数名称：ssc_initTabs
 * 功能简介：可复用选项卡初始化函数。config 可配置项：
 *           root（查找范围选择器，默认 body）、tabSelector（选项卡按钮，
 *           默认 .ssc_tab）、panelSelector（内容面板，默认 .ssc_panel）、
 *           activeClass（按钮激活类，默认 ssc_active）、
 *           showClass（面板显示类，默认 ssc_show）。
 *           为每个按钮添加 click 事件监听：先清除所有选项卡的
 *           选中状态，再设置当前元素的选中状态并联动对应面板。
 */
function ssc_initTabs(ssc_config) {
    var ssc_root = document.querySelector(ssc_config.root || 'body');
    var ssc_tabs = ssc_root.querySelectorAll(ssc_config.tabSelector || '.ssc_tab');
    var ssc_panels = ssc_root.querySelectorAll(ssc_config.panelSelector || '.ssc_panel');
    var ssc_tabClass = ssc_config.activeClass || 'ssc_active';
    var ssc_panelClass = ssc_config.showClass || 'ssc_show';

    /**
     * 作者：孙绍词
     * 建立时间：2026-11-02
     * 使用模型：GLM-5.3-Flash
     * 函数名称：ssc_onTabClick（事件监听回调）
     * 功能简介：选项卡点击事件处理——第一步调用 ssc_clearActive
     *           清除所有选项卡按钮与内容面板的选中状态；
     *           第二步为当前点击的元素（currentTarget）添加激活类，
     *           并按索引联动显示对应内容面板。
     */
    var ssc_onTabClick = function (ssc_event) {
        // 第一步：清除所有选项卡的选中状态
        ssc_clearActive(ssc_tabs, ssc_tabClass);
        ssc_clearActive(ssc_panels, ssc_panelClass);

        // 第二步：设置当前元素的选中状态
        var ssc_current = ssc_event.currentTarget;
        ssc_current.classList.add(ssc_tabClass);
        var ssc_index = Array.prototype.indexOf.call(ssc_tabs, ssc_current);
        if (ssc_panels[ssc_index]) {
            ssc_panels[ssc_index].classList.add(ssc_panelClass);
        }
    };

    // 为所有选项卡按钮绑定 click 事件监听
    for (var ssc_i = 0; ssc_i < ssc_tabs.length; ssc_i++) {
        ssc_tabs[ssc_i].addEventListener('click', ssc_onTabClick);
    }
}
