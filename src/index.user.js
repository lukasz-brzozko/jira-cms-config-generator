(function () {
  "use strict";

  const SELECTORS = {
    rowCheckbox: ".js-generate-html-checkbox",
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
