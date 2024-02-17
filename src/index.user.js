// ==UserScript==
// @name         CMS Messages/Settings Template Generator
// @namespace    http://tampermonkey.net/
// @version      2024-02-15
// @description  try to take over the world!
// @author       Łukasz Brzózko
// @match        https://dev-control-panel-orbico.nd0.pl/*
// @match        https://uat-control-panel-orbico.nd0.pl/*
// @match        https://preprod-control-panel-orbico.nd0.pl/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function () {
  "use strict";

  const SELECTORS = {
    rowCheckbox: ".js-jira-checkbox",
    keyInput: "input[ng-reflect-name='key']",
    valueInput: "input[ng-reflect-name='value']",
    messagesRow: ".input-container > div[formarrayname='messages']",
    settingsRow: ".input-container > div[formarrayname='settings']",
    inputRow: ".input-container > div[formarrayname] > .input-row",
    inputRowContainer: "input-container custom-fields ng-star-inserted",
    componentName: "span.mat-select-value-text > span",
    buttonContainer: "scp-clipboard > .alignRight",
  };

  const CLASSNAMES = {
    rowCheckbox: "mat-checkbox-inner-container mat-checkbox js-jira-checkbox",
    generateButton: "btn-black btn-small ico-btn",
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

  const createMessage = (configsEls, name) => {
    let string = "";
    let content = "";

    if (!configsEls?.length) return string;

    configsEls.forEach((configsEl) => {
      const checkbox = configsEl.querySelector(SELECTORS.rowCheckbox);

      if (!checkbox.checked) return content;

      const key = configsEl.querySelector(SELECTORS.keyInput)?.value;
      const value = configsEl.querySelector(SELECTORS.valueInput)?.value;

      content += `<li><strong>${key}</strong>: ${value}</li>`;
    });

    if (content) {
      string = `<ul><li>Add ${name}:<ul>${content}</ul></li></ul>`;
    }

    return string;
  };

  const prepareHtmlTemplate = ({ componentName }) => {
    const messages = modal.querySelectorAll(SELECTORS.messagesRow);
    const settings = modal.querySelectorAll(SELECTORS.settingsRow);

    let messageText = `<span><strong>${componentName}</strong> box:</span>`;

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

  const addCheckboxesDebounced = debounce(() => {
    console.log("addCheckboxesDebounced");
    addCheckboxes();
  }, 1000);

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

  const handleBtnClick = async (target) => {
    const componentName = target.querySelector(SELECTORS.componentName)?.textContent;

    const htmlTemplate = prepareHtmlTemplate({
      componentName,
    });

    await setClipboard(htmlTemplate);
  };

  const addButton = ({ target }) => {
    const button = document.createElement("button");

    button.textContent = "Generate Jira manual";
    button.type = "button";
    button.className = CLASSNAMES.generateButton;
    button.style.backgroundColor = COLOR_PRIMARY;

    target.querySelector(SELECTORS.buttonContainer)?.appendChild(button);

    button.addEventListener("click", () => handleBtnClick(target));
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

  const init = () => addBodyObserver();

  init();
})();
