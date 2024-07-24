const install_extension_page = {

  name: "install_extension_page",
  elements: [
    {
      type: "html",
      name: "install_instructions",
      html: '<html><h1 class="text-uppercase" style="font-size:30px;">Extension Installation</h1>' +
      '<br>In order to begin this survey, you must first install our <a href ="google.com">exam proctoring browser extension.</a> This extension is required to prevent participants from cheating. It will do the following to prevent cheating:' +
      '<ul style="list-style-type: circle; margin-left: 35px; padding: 5px;">'+
      '<li>Close all open Chrome tabs/windows except for the survey tab</li>'+
      '<li>Prevent new Chrome tabs/windows from being opened</li>'+
      '<li>Monitor the participant\'s webcam during the testing time</li>'+
      '<li>Monitor the participant\'s audio during the testing time</li></ul>'+
      '<br>After installing this extension, please refresh this page and click the Confirm Installation button. The extension can be uninstalled after the survey is complete. Once the extension has been installed, please open the <a href="chrome://extensions/">Google Chrome Extensions window</a> and activate the extension as shown below.'+
      '<br><br><em> Please note: activating the extension will immediately close all open Chrome tabs/windows except for the test-taking site.</em>'+
      '<br><br>After the extension has been activated, confirm its installation by clicking the button below.<br><br>',
    },
    {
      type: "html",
      name: "confirm-exam",
    },
  ]

}

export default install_extension_page;