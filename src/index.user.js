// ==UserScript==
// @name         CMS Messages/Settings Template Generator
// @namespace    https://github.com/lukasz-brzozko/jira-cms-config-generator
// @version      2024-06-06
// @description  Generates HTML template from the CMS messages/settings and copies it into the clipboard
// @author       Łukasz Brzózko
// @match        https://dev-control-panel-orbico.nd0.pl/*
// @match        https://uat-control-panel-orbico.nd0.pl/*
// @match        https://preprod-control-panel-orbico.nd0.pl/*
// @updateURL    https://raw.githubusercontent.com/lukasz-brzozko/jira-cms-config-generator/main/dist/index.meta.js
// @downloadURL  https://raw.githubusercontent.com/lukasz-brzozko/jira-cms-config-generator/main/dist/index.user.js
// @icon         data:image/x-icon;base64,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ZP+QkJD/+vr6///////29vb/S0pJ/1w2HP+OUyz/jlMs/45TLP+OUyz/jlMs/4xSK/87IhL8AAAAeAUDAcJjOh7/jlMs/45TLP+OUyz/jlMs/45TLP+ITyr/KhwS/7Ozs/////////////39/f/7+/v/+/v7//v7+//7+/v/+/v7//z8/P///////////9LS0v8iGhb/g0wo/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/2E4Hv8FAwG+CAQC6npHJv+OUyz/jlMs/45TLP+OUyz/jlMs/41SLP9NLRf/ZWRk//r6+v////////////z8/P/7+/v/+/v7//v7+//8/Pz////////////9/f3/g4OD/z8lFf+MUiv/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/eEYl/wgEAucIBQL+hE0p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/3hGJf8nIh//4+Pj///////+/v7/tra2/2VlZP9lZGT/ZGRj/6Kiov/9/f3///////Ly8v82NDL/az4h/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+ETSn/CAUC/ggFAv+FTSn/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/ilAq/zAeEf+bm5v///////////++vr7/FxIN/04tGP8aEQv/oaGh////////////urq6/ycaEv+HTyr/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4VNKf8IBQL/CAUC/4VNKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/XjYc/09NTP/29vb///////Hx8f80MS//YTge/yEdGv/g4OD///////r6+v9oZ2f/TS0Y/41TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/hU0p/wgFAv8IBQL/hU0p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+BSyj/HxgT/9HR0f///////Pz8/3V1dP8YDgj/VFNT//j4+P//////5OTk/ygkIf92RST/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+FTSn/CAUC/wgFAv+FTSn/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4xSK/8/JRX/hoaG//39/f//////urq6/w0NDf+bm5v///////////+enp7/Mh8T/4pQKv+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4VNKf8IBQL/CAUC/4VNKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/2k9IP82NDL/8vLy///////w8PD/PT09/+Dg4P//////9/f3/1FQT/9aNBz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/hU0p/wgFAv8IBQL/hU0p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/h08q/ycaEv+8vLz///////z8/P/AwMD/+fn5///////S0tL/IxsW/4NMKP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+FTSn/CAUC/wgFAv+FTSn/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+NUiz/SywX/2hoaP/7+/v///////39/f///////f39/4aGhv8+JBT/jFIr/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4VNKf8IBQL/CAUC/4VNKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP92RST/JyQh/+fn5//////////////////y8vL/NjQy/2s+If+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/hU0p/wgFAv8IBQL/hU0p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4pQKv8xHhL/oqKi/////////////////729vf8lGRL/hk8q/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+FTSn/CAUC/wgFAv+FTSn/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/1gzG/9QT07/6urq//Hx8f/t7e3/ZmZl/00tGP+NUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4VNKf8IBQL/CAUC/4VNKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/gUso/xoRC/8jIB7/JSIf/yQhH/8YEg3/dUQk/45T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ABMAAAABAAAAAAAAAAAAAAAKAAAAYwsGA+VDJxT+gEso/45TLP+OUyz/jlMs/4JMKP86IxP/NDMx/9vb2//9/f3////////////y8vL/cHBw/x4UDv9pPSD/jVIr/45TLP+OUyz/jlMs/45TLP+OUyz/i1Er/102Hf8oJCH/ubm5//z8/P////////////v7+/+srKz/JiMg/1AvGf+JUCr/jlMs/45TLP+OUyz/jlMs/39KJ/9EJxT9CwYD4AAAAGIAAAAJAAAAAAAAAAIAAAA5AwEByCoZDf15RiX/jVIs/45TLP+OUyz/jlMs/4tRK/9YMxv/HhkV/6mpqf/5+fn////////////6+vr/srKy/x0aF/9QLxn/ilEr/45TLP+OUyz/jlMs/45TLP+OUyz/hk4p/z0lFP9JR0b/2tra/////////////////+3t7f9wcG//HRQO/3VEJP+NUiv/jlMs/45TLP+OUyz/jlMs/41SLP92RST/KRcM/AMBAcUAAAAzAAAAAgAAAA4AAACGEQoF9GQ7H/+LUSv/jlMs/45TLP+OUyz/jlMs/41TLP90RCT/IhUM/1VVVf/r6+v/////////////////5OTk/zo4OP8xHhH/aj4g/3JDI/9yQyP/ckMj/3JDI/9yQyP/Zzwg/xwUDv95eHj/8vLy/////////////////9bW1v9CQD//PSQU/4ZOKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+KUSv/YDgd/w4IBPEAAAB6AAAACgAAACkFAwHAOSER/YRNKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+GTin/PCIS/y0rKv/BwcH//f39////////////8/Pz/3p6ev8bGBb/IRgS/yQZE/8kGRP/JBkT/yQZE/8kGRP/IhgT/ygnJv+qqqr/+/v7////////////+/v7/6ioqP8iHBj/YTge/4tSK/+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/g0wo/zMdD/wEAwG8AAAAJgAAAFQNCATpYTge/4xSK/+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+LUSv/ZTsf/xwXE/+Pj4//+Pj4/////////////f39/9nZ2f+bm5v/lpaW/5aWlv+Wlpb/lpaW/5aWlv+Wlpb/lpaW/6ampv/l5eX//v7+////////////7Ozs/1ZWVf8rGxH/eUcl/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jFIr/2A3Hf8NCATpAAAAUgICAJciFAr2dkUk/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/gUwo/ywaD/9UU1L/4ODg//////////////////39/f/5+fn/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//r6+v/+/v7////////////8/Pz/zMzM/yYkIv9GKRb/iFAq/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/3REJP8fEgn2AgIAjwMBAcc0Hg/6gEso/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/ilAr/1MxGf8qJiT/vLy8//z8/P/////////////////////////////////////////////////////////////////////////////////09PT/g4OD/x4WEf9jOh//jFIr/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/39KJ/8yHQ/6AwEBwQIBAeU+JBP9hk4p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/3BBIv8kGRL/hoWF//X19f/////////////////+/v7/+vr6//j4+P/4+Pj/+Pj4//j4+P/5+fn//Pz8//////////////////7+/v/d3d3/QkJC/ykYDv9+SSf/jVMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4VOKf89JBP9AgEB4wMCAfxGKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4BLKP84IhP/Ozk4/+Dg4P/+/v7////////////09PT/s7Oz/5aWlv+Wlpb/lpaW/5aWlv+bm5v/1NTU//z8/P////////////v7+/+tra3/JSIg/08uGP+JUCr/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/AMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9WMhr/HRgV/6Ghof/4+Pj////////////z8/P/dHR0/xUUE/8cFRD/IhkS/xYSD/8jIyL/tLS0//z8/P////////////Hx8f91dXX/HxUO/3NDI/+MUiv/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/41SLP9wQiL/HxQN/11cXP/u7u7////////////6+vr/r6+v/xsYFf9CJxT/aD0g/ysaDv9CQUD/19fX/////////////////9XV1f9APj3/OyMT/4VOKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+FTin/OSER/zAuLv/Gxsb//f39////////////5OTk/zs5OP8+JRX/cUEj/xsSDf9sbGz/7e3t////////////+vr6/6mpqf8iHRn/ZDsf/41SK/+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+LUSv/Zjwf/x0YFf+Ojo7/9vb2////////////8/Pz/3h3d/8mGhL/QiYU/x8cGf+enp7/+vr6////////////7e3t/2BfX/8rHBL/eEYl/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/f0on/yYYD/9bWlr/5eXl/////////////f39/7i4uP8cGhn/EAkF/zEwL//Nzc3//f39///////8/Pz/ysrK/yYkI/9FKBX/hk8p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/iVAr/08uGP8wLCv/xcXF//7+/v///////////9jY2P8/Pz//BwYG/1hYWP/u7u7////////////19fX/hISE/x4WEf9kOh//jFIr/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/3BBIv8jGRP/hYWF//X19f////////////Dw8P9xcXH/GBgY/6CgoP/4+Pj///////7+/v/f39//QkFB/ygYDf98SSb/jVMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4BLJ/82IRP/PTw7/+Xl5f////////////v7+/+kpKT/Pz8//9vb2//+/v7///////z8/P+vr6//JiMh/0wsF/+IUCr/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4pRK/9SMBn/HhkX/66urv/5+fn///////7+/v/Z2dn/nJyc//Ly8v////////////Dw8P93d3b/HRUP/3hGJf+NUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/41SLP9xQSL/IBUN/2BgYP/s7Oz////////////7+/v/6urq//z8/P///////////9bW1v9CQT//OSIT/4VOKf+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+FTSn/NyAR/zEvL//Kysr//f39/////////////v7+////////////+/v7/62trf8iHBn/YDgd/4xSK/+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+LUSv/YDkd/x0ZFv+UlJT/+Pj4////////////////////////////7+/v/2FhYP8tHRL/eUYl/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+NUyz/fkkn/yYYDv9eXV3/5ubm///////////////////////8/Pz/zc3N/yQiIf9CJxX/hk8p/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/iVAq/00uGP8uKyn/x8fH//7+/v/////////////////19fX/h4eH/x0VEf9hOR7/jFIr/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/4tRK/9GKRX/AwIB/wMCAf9GKRX/i1Er/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jlMs/45TLP+OUyz/jVMs/25A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
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SELECTORS = {
    rowCheckbox: ".js-generate-html-checkbox",
    keyInput: "input[formcontrolname='key']",
    valueInput: "input[formcontrolname='value']",
    messagesRow: ".input-container > div[formarrayname='messages']",
    settingsRow: ".input-container > div[formarrayname='settings']",
    inputRow: ".input-container > div[formarrayname] > .input-row",
    inputRowContainer: "input-container custom-fields ng-star-inserted",
    componentName: "span.mat-select-value-text > span",
    buttonContainer: "scp-clipboard > .alignRight",
  };

  const CLASSNAMES = {
    rowCheckbox: "mat-checkbox-inner-container mat-checkbox js-generate-html-checkbox",
    generateButton: "btn-black btn-small ico-btn generate-html-btn",
    active: "custom-active",
  };

  const COLOR_PRIMARY = "#0747a6";
  const MAT_DIALOG_CONTAINER = "MAT-DIALOG-CONTAINER";

  let modal = null;

  const debounce = (callback, wait) => {
    let timeoutId = null;

    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  };

  const addStyles = () => {
    const styles = `
    .generate-html-btn {
      position: relative;
      overflow: hidden;
    }

    .generate-html-btn > .standard-text,
    .generate-html-btn > .active-text {
      display: inline-block;
      transition: transform 0.15s ease;
    }

    .generate-html-btn > .standard-text {
      transform: translateY(0);
    }

    .generate-html-btn > .active-text {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 100%;
      transform: translate(-50%, calc(-50% + 23.66px));
    }

    .generate-html-btn.custom-active {
      pointer-events: none;
    }
    
    .generate-html-btn.custom-active > .standard-text {
      transform: translateY(-23.66px);
    }

    .generate-html-btn.custom-active > .active-text {
      transform: translate(-50%, -50%);
    }
`;

    document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  };

  const createMessage = (configsEls, name) => {
    let string = "";
    let content = "";

    if (!configsEls?.length) return string;

    configsEls.forEach((configsEl) => {
      const checkbox = configsEl.querySelector(SELECTORS.rowCheckbox);

      if (!checkbox.checked) return content;

      const key = configsEl.querySelector(SELECTORS.keyInput)?.value;
      const value = configsEl.querySelector(SELECTORS.valueInput)?.value;

      content += `<li><strong>${key}</strong>: ${escapeHtml(value)}</li>`;
    });

    if (content) {
      string = `<ul><li>Add ${name}:<ul>${content}</ul></li></ul>`;
    }

    return string;
  };

  const prepareHtmlTemplate = ({ componentName }) => {
    const messages = modal.querySelectorAll(SELECTORS.messagesRow);
    const settings = modal.querySelectorAll(SELECTORS.settingsRow);

    let messageText = `<span>Add <strong>${componentName}</strong> system box:</span>`;

    messageText += createMessage(messages, "messages");
    messageText += createMessage(settings, "settings");

    return messageText;
  };

  const addCheckboxes = () => {
    if (!modal) return;

    const rows = modal.querySelectorAll(SELECTORS.inputRow);

    rows.forEach((row) => {
      const existingCheckbox = row.querySelector(SELECTORS.rowCheckbox);

      if (existingCheckbox) return;

      const input = document.createElement("input");

      input.type = "checkbox";
      input.checked = true;
      input.className = CLASSNAMES.rowCheckbox;
      input.style.accentColor = COLOR_PRIMARY;

      row.prepend(input);
    });
  };

  const addCheckboxesDebounced = debounce(addCheckboxes, 1000);

  const setClipboard = (content) => {
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([content], {
        type: "text/plain",
      }),
      "text/html": new Blob([content], {
        type: "text/html",
      }),
    });

    return navigator.clipboard.write([clipboardItem]);
  };

  const setActiveClassname = (element) => {
    element.classList.add(CLASSNAMES.active);
    setTimeout(() => element.classList.remove(CLASSNAMES.active), 2000);
  };

  const handleBtnClick = async ({ e, target }) => {
    const { currentTarget } = e;
    const componentName = target.querySelector(SELECTORS.componentName)?.textContent;

    const htmlTemplate = prepareHtmlTemplate({
      componentName,
    });
    await setClipboard(htmlTemplate);
    setActiveClassname(currentTarget);
  };

  const addButton = ({ target }) => {
    const button = document.createElement("button");

    button.innerHTML = `<span class="standard-text">Generate Jira manual</span><span class="active-text">Copied</span>`;
    button.type = "button";
    button.className = CLASSNAMES.generateButton;
    button.style.backgroundColor = COLOR_PRIMARY;

    target.querySelector(SELECTORS.buttonContainer)?.appendChild(button);

    button.addEventListener("click", (e) => handleBtnClick({ e, target }));
  };

  const addBodyObserver = () => {
    const config = {
      attributes: false,
      childList: true,
      subtree: true,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        const { target } = entry;
        const { nodeName, className } = target;
        const isDialogContainer = nodeName === MAT_DIALOG_CONTAINER;
        const isInputRowContainer = className === SELECTORS.inputRowContainer;

        if (!isDialogContainer && !isInputRowContainer) return;

        if (isDialogContainer) {
          modal = entry.target;
          addButton(entry);
        } else if (isInputRowContainer) {
          addCheckboxesDebounced(entry.target);
        }
      });
    };

    const observer = new MutationObserver(callback);

    observer.observe(document.body, config);
  };

  const init = () => {
    addStyles();
    addBodyObserver();
  };

  init();
})();
