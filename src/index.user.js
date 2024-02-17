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

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const createMessage = (configs, name) => {
    let string = "";

    if (!configs) return "";

    configs.forEach(({ key, value }) => {
      string += `<li><strong>${key}</strong>: ${value}</li>`;
    });

    return string;
  };

  const prepareJiraTemplate = ({ componentName, json }) => {
    const { messages, settings } = json;
    let messageText = `<span><strong>${componentName}</strong> box:</span>`;
    messageText += `<ul><li>Add messages:<ul>`;
    messageText += createMessage(messages, "messages");
    messageText += `</ul></li></ul>`;
    messageText += `<ul><li>Add settings:<ul>`;
    messageText += createMessage(settings, "settings");
    messageText += `</ul></li></ul>`;

    return messageText;
  };

  const parseClipboardContent = async () => {
    const dataString = await navigator.clipboard.readText();
    const isJSON = isJsonString(dataString);

    if (!isJSON) return;

    return JSON.parse(dataString);
  };

  const handleBtnClick = async ({ target, e }) => {
    const componentName = target.querySelector(
      "span.mat-select-value-text>span"
    ).textContent;

    const json = await parseClipboardContent();

    if (!json) return alert("Click 'Copy messages/settings button first!'");

    const jiraTemplate = prepareJiraTemplate({ componentName, json });

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
    target.querySelector("scp-clipboard > .alignRight")?.appendChild(button);

    button.addEventListener("click", (e) => handleBtnClick({ target, e }));
  };

  const addBodyObserver = () => {
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target.nodeName !== "MAT-DIALOG-CONTAINER") return;
        console.log(entry.target);

        addButton(entry);
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
