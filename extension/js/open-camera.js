const button = document.getElementById("request_camera_permission");

window.onload = function () {
  button.addEventListener("click", function () {
    console.log("success");
    navigator.mediaDevices.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        { audio: false, video: { width: 1280, height: 720 } },
        (stream) => {
          console.log("success");
        },
        (err) => {
          console.error(`The following error occurred: ${err.name}`);
        }
      );
    } else {
      console.log("getUserMedia not supported");
    }
  });
};
