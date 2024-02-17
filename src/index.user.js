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

  const createMessage = (configsEls) => {
    let string = "";

    if (!configsEls?.length) return "";

    configsEls.forEach((configsEl) => {
      const checkbox = configsEl.querySelector(".js-jira-checkbox");

      if (!checkbox.checked) return string;

      const key = configsEl.querySelector(
        "input[ng-reflect-name='key']"
      )?.value;
      const value = configsEl.querySelector(
        "input[ng-reflect-name='value']"
      )?.value;
      string += `<li><strong>${key}</strong>: ${value}</li>`;
    });

    return string;
  };

  const prepareJiraTemplate = ({ componentName }) => {
    const messages = modal.querySelectorAll(
      ".input-container > div[formarrayname='messages']"
    );
    const settings = modal.querySelectorAll(
      ".input-container > div[formarrayname='settings']"
    );

    let messageText = `<span><strong>${componentName}</strong> box:</span>`;
    messageText += `<ul><li>Add messages:<ul>`;
    messageText += createMessage(messages, "messages");
    messageText += `</ul></li></ul>`;
    messageText += `<ul><li>Add settings:<ul>`;
    messageText += createMessage(settings, "settings");
    messageText += `</ul></li></ul>`;

    return messageText;
  };

  const addCheckboxes = () => {
    if (!modal) return;

    const rows = modal.querySelectorAll(
      ".input-container > div[formarrayname] > .input-row"
    );

    rows.forEach((row) => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = true;
      input.className =
        "mat-checkbox-inner-container mat-checkbox js-jira-checkbox";
      input.style.accentColor = "#0747a6";
      row.prepend(input);
    });
  };

  const addCheckboxesDebounced = debounce(() => {
    console.log("addCheckboxesDebounced");
    addCheckboxes();
  }, 1000);

  const handleBtnClick = async (target) => {
    const componentName = target.querySelector(
      "span.mat-select-value-text>span"
    ).textContent;

    const jiraTemplate = prepareJiraTemplate({ componentName });

    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([jiraTemplate], {
        type: "text/plain",
      }),
      "text/html": new Blob([jiraTemplate], {
        type: "text/html",
      }),
    });

    await navigator.clipboard.write([clipboardItem]);
  };

  const addButton = ({ target }) => {
    const button = document.createElement("button");
    button.textContent = "Generate Jira manual";
    button.type = "button";
    button.className = "btn-black btn-small ico-btn";
    button.style.backgroundColor = "#0747a6";
    target.querySelector("scp-clipboard > .alignRight")?.appendChild(button);

    button.addEventListener("click", () => handleBtnClick(target));
  };

  const addBodyObserver = () => {
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (
          entry.target.nodeName !== "MAT-DIALOG-CONTAINER" &&
          entry.target.className !==
            "input-container custom-fields ng-star-inserted"
        ) {
          return;
        }
        // console.log(entry.target);
        if (entry.target.nodeName === "MAT-DIALOG-CONTAINER") {
          modal = entry.target;
          addButton(entry);
        } else if (
          entry.target.className ===
          "input-container custom-fields ng-star-inserted"
        ) {
          console.log(entry);
          addCheckboxesDebounced(entry.target);
        }
      });
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
  };

  const init = () => {
    addBodyObserver();
  };

  init();
})();
