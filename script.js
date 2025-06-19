function startTalking() {
  const text = document.getElementById("textInput").value;
  const imageInput = document.getElementById("imageInput").files[0];
  const canvas = document.getElementById("avatarCanvas");
  const ctx = canvas.getContext("2d");

  if (!text || !imageInput) {
    alert("Upload a photo and enter some text.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // Draw avatar/photo on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Speak the text
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);

      // Fake "lip sync" animation (just blinking for now)
      let blink = true;
      const interval = setInterval(() => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (blink) {
          ctx.fillStyle = "rgba(0,0,0,0.2)";
          ctx.fillRect(canvas.width / 3, canvas.height / 3, 50, 10); // fake mouth
        }
        blink = !blink;
      }, 300);

      utterance.onend = () => clearInterval(interval);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(imageInput);
}
