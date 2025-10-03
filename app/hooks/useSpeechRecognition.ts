await ExpoSpeechRecognitionModule.start({
  lang: "fr-FR", // ← Assurez-vous que c'est bien "fr-FR" et pas "en-US"
  interimResults: true,
  maxAlternatives: 1,
  continuous: false,
  requiresOnDeviceRecognition: false,
});
